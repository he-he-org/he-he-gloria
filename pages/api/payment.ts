// import { Handler } from "@netlify/functions";
// import { Event } from "@netlify/functions/dist/function/event";
// import { Context } from "@netlify/functions/dist/function/context";
import { Stripe } from "stripe";
import { PaymentRequest, PaymentRequestCodec } from "../../shared/payment";
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";
import { EnvSettings } from "../../shared/env";

import envSettings from "../../envSettings";

const SUCCESS_URL = "/";
const CANCEL_URL = "/";
const LANGS = ["en"];
const DEFAULT_LANG = "en";

function oneTimePayment(
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

function subscription(
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

export default async function handler(req, res) {
  const { body } = req;
  const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const BASE_URL = process.env.BASE_URL;
  const ENV = process.env.ENV === "development" ? "development" : "production";
  const settings: EnvSettings = envSettings[ENV];

  if (SECRET_KEY == null) {
    throw new Error(`SECRET_KEY is not provided`);
  }

  const decoded = PaymentRequestCodec.decode(body);
  if (isLeft(decoded)) {
    res
      .status(400)
      .send(`Bad request: ${PathReporter.report(decoded).join("; ")}`);
    return;
  }
  const request: PaymentRequest = decoded.right;

  const { params, productId, paymentMethod } = request;

  if (paymentMethod !== "stripe") {
    res.status(400).send(`Method is not supported: ${paymentMethod}"`);
    return;
  }

  const { mode, amount } = params;

  const stripeProduct = settings.stripe?.products?.[productId];
  if (stripeProduct == null) {
    res
      .status(400)
      .send(`Unable to find stripe product by product key "${productId}"`);
    return;
  }

  try {
    const lang = LANGS.indexOf(params.lang) !== -1 ? params.lang : DEFAULT_LANG;
    const stripeInstance = new Stripe(SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
    const baseUrl = lang === DEFAULT_LANG ? BASE_URL : `${BASE_URL}/${lang}`;
    if (baseUrl == null) {
      throw new Error(`Empty base url`);
    }
    const sessionParams: Stripe.Checkout.SessionCreateParams =
      mode === "subscription"
        ? subscription(
            parseInt(amount),
            stripeProduct.stripeProductId,
            baseUrl,
            lang
          )
        : oneTimePayment(
            parseInt(amount),
            stripeProduct.stripeProductId,
            baseUrl,
            lang
          );
    console.log("sessionParams", JSON.stringify(sessionParams, null, 4));
    const session = await stripeInstance.checkout.sessions.create(
      sessionParams
    );
    console.log("session", session);
    res.status(200);
    res.send(
      JSON.stringify({
        location: session.url,
      })
    );
  } catch (e) {
    console.error(e);
    res.status(500);
    res.send(e.message ?? "Something has gone wrong on our side, sorry :(");
  }
}
