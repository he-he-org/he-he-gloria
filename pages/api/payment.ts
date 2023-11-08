// import { Handler } from "@netlify/functions";
// import { Event } from "@netlify/functions/dist/function/event";
// import { Context } from "@netlify/functions/dist/function/context";
import { Stripe } from "stripe";
import {
  PaymentRequest,
  PaymentRequestCodec,
  PaypalPaymentRequest,
  PaypalPaymentResponse,
  StripePaymentRequest,
  StripePaymentResponse,
} from "../../shared/payment";
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";
import { EnvSettings } from "../../shared/env";
// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";
import envSettings from "../../envSettings";

const SUCCESS_URL = "/success";
const CANCEL_URL = "/cancel";
const LANGS = ["en"];
const DEFAULT_LANG = "en";

export default async function handler(req, res) {
  const { body } = req;
  const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const BASE_URL = process.env.BASE_URL;
  const ENV = process.env.ENV === "development" ? "development" : "production";
  const settings: EnvSettings = envSettings[ENV];

  const decoded = PaymentRequestCodec.decode(body);
  if (isLeft(decoded)) {
    res
      .status(400)
      .send(`Bad request: ${PathReporter.report(decoded).join("; ")}`);
    return;
  }
  const request: PaymentRequest = decoded.right;

  try {
    if (request.paymentMethod === "stripe") {
      res.json(await stripeFlow(request, settings));
    } else if (request.paymentMethod === "paypal") {
      res.json(await paypalFlow(request, settings));
    } else {
      res
        .status(400)
        .send(`Method is not supported: ${JSON.stringify(request)}"`);
    }
  } catch (e) {
    res.status(500).send(`Error: ${e.message ?? "unknown"}`);
  }
}

/*
  Paypal
 */

const PAYPAL_BASE_API_URL = "https://api-m.sandbox.paypal.com";

async function paypalFlow(
  request: PaypalPaymentRequest,
  settings: EnvSettings
): Promise<PaypalPaymentResponse> {
  const { params } = request;
  const { step } = params;

  if (step.step === "create_order") {
    try {
      const orderId =
        step.mode === "payment"
          ? await paypalCreateOrder(step.amount)
          : await paypalCreateSubscription(step.amount);
      return {
        paymentMethod: "paypal",
        step: {
          step: "create",
          orderId,
        },
      };
    } catch (error) {
      console.error("Failed to create order:", error);
      throw new Error("Failed to create order");
    }
  } else if (step.step === "capture_order") {
    try {
      const { orderID } = step;
      const response = await capturePayment(orderID);
      return {
        paymentMethod: "paypal",
        step: {
          step: "capture",
          orderData: response,
        },
      };
    } catch (error) {
      console.error("Failed to capture order", error);
      throw new Error(
        `Failed to capture order! Error: ${error.message ?? "unknown"}`
      );
    }
  } else {
    throw new Error(`Unknown step: ${JSON.stringify(step)}`);
  }
}

// app.use(cors({ origin: "*" }));

async function generateAccessToken() {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_APP_SECRET = process.env.PAYPAL_APP_SECRET;
  const ENV = process.env.ENV === "development" ? "development" : "production";

  if (PAYPAL_CLIENT_ID == null) {
    throw new Error(`NEXT_PUBLIC_PAYPAL_CLIENT_ID is not defined`);
  }
  if (PAYPAL_APP_SECRET == null) {
    throw new Error(`PAYPAL_CLIENT_ID is not defined`);
  }
  try {
    const auth = Buffer.from(
      PAYPAL_CLIENT_ID + ":" + PAYPAL_APP_SECRET
    ).toString("base64");

    const response = await fetch(`${PAYPAL_BASE_API_URL}/v1/oauth2/token`, {
      method: "post",
      body: "grant_type=client_credentials",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Failed to generate Access Token:", error);
  }
}

const paypalCreateOrder = async (amount: string): Promise<string> => {
  const accessToken = await generateAccessToken();
  const url = `${PAYPAL_BASE_API_URL}/v2/checkout/orders`;
  const payload = {
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: (parseInt(amount) / 100).toFixed(2),
        },
      },
    ],
  };

  const response = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${accessToken}∫`, // todo: what is ∫
      Authorization: `Bearer ${accessToken}`,
    },
    method: "POST",
    body: JSON.stringify(payload),
  });

  const json = await handleResponse(response);
  return json.id;
};

const paypalCreateSubscription = async (amount: string): Promise<string> => {
  throw new Error(`Paypal subscription are not supported yet`);
};

const capturePayment = async (orderID) => {
  const accessToken = await generateAccessToken();

  const url = `${PAYPAL_BASE_API_URL}/v2/checkout/orders/${orderID}/capture`;

  const response = await fetch(url, {
    method: "post",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return handleResponse(response);
};

async function handleResponse(response) {
  if (response.status === 200 || response.status === 201) {
    return response.json();
  }
  const errorMessage = await response.text();
  throw new Error(errorMessage);
}

/*
  Stripe
 */
async function stripeFlow(
  request: StripePaymentRequest,
  settings: EnvSettings
): Promise<StripePaymentResponse> {
  const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const BASE_URL = process.env.BASE_URL;
  const ENV = process.env.ENV === "development" ? "development" : "production";

  if (SECRET_KEY == null) {
    throw new Error(`SECRET_KEY is not provided`);
  }

  const { params, paymentMethod } = request;

  const { mode, productId, amount } = params;

  const stripeProduct = settings.stripe?.products?.[productId];
  if (stripeProduct == null) {
    throw new Error(
      `Unable to find stripe product by product key "${productId}"`
    );
  }

  try {
    const lang = DEFAULT_LANG;
    const stripeInstance = new Stripe(SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
    const baseUrl = lang === DEFAULT_LANG ? BASE_URL : `${BASE_URL}/${lang}`;
    if (baseUrl == null) {
      throw new Error(`Empty base url`);
    }
    const sessionParams: Stripe.Checkout.SessionCreateParams =
      mode === "subscription"
        ? stripeSubscription(
            parseInt(amount),
            stripeProduct.stripeProductId,
            baseUrl,
            lang
          )
        : stripeOneTimePayment(
            parseInt(amount),
            stripeProduct.stripeProductId,
            baseUrl,
            lang
          );
    const session = await stripeInstance.checkout.sessions.create(
      sessionParams
    );
    return {
      paymentMethod: "stripe",
      location: session.url,
    };
  } catch (e) {
    console.error(e);
    throw new Error(
      e.message ?? "Something has gone wrong on our side, sorry :("
    );
  }
}

function stripeOneTimePayment(
  amount: number,
  productId: string,
  baseUrl: string,
  lang: string
): Stripe.Checkout.SessionCreateParams {
  return {
    line_items: [
      {
        price_data: {
          currency: "USD",
          product: productId,
          unit_amount: amount,
        },
        quantity: 1,
      },
      {},
    ],
    mode: "payment",
    locale: lang as Stripe.Checkout.SessionCreateParams.Locale,
    success_url: `${baseUrl}${SUCCESS_URL}`,
    cancel_url: `${baseUrl}${CANCEL_URL}`,
  };
}

function stripeSubscription(
  amount: number,
  productId: string,
  baseUrl: string,
  lang: string
): Stripe.Checkout.SessionCreateParams {
  return {
    line_items: [
      {
        price_data: {
          currency: "USD",
          product: productId,
          unit_amount: amount,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
      {},
    ],
    mode: "subscription",
    locale: lang as Stripe.Checkout.SessionCreateParams.Locale,
    success_url: `${baseUrl}${SUCCESS_URL}`,
    cancel_url: `${baseUrl}${CANCEL_URL}`,
  };
}
