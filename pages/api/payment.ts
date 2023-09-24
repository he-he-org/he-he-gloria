// import { Handler } from "@netlify/functions";
// import { Event } from "@netlify/functions/dist/function/event";
// import { Context } from "@netlify/functions/dist/function/context";
import { Stripe } from "stripe";
import { PaymentRequest, PaymentRequestCodec } from "../../shared/payment";
import { isLeft } from "fp-ts/Either";
import { PathReporter } from "io-ts/PathReporter";
import { EnvSettings } from "../../shared/env";

//
// const envSettings = require("../../envSettings.json");
//
const SUCCESS_URL = "/success";
const CANCEL_URL = "/";
// const LANGS = process.env.LANGS.split(",");
// const DEFAULT_LANG = process.env.DEFAULT_LANG;
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

const envSettings = require("../../envSettings");

export default async function handler(req, res) {
  const { body } = req;
  const SECRET_KEY = process.env.STRIPE_SECRET_KEY;
  const BASE_URL = process.env.BASE_URL;
  const ENV = process.env.ENV === "development" ? "development" : "production";
  const settings: EnvSettings = envSettings[ENV];

  console.log("body", body)
  const decoded = PaymentRequestCodec.decode(body);
  if (isLeft(decoded)) {
    res
      .status(400)
      .send(`Bad request: ${PathReporter.report(decoded).join("; ")}`);
    return;
  }
  const request: PaymentRequest = decoded.right;

  const { params, paymentMethod } = request;

  if (paymentMethod !== "stripe") {
    return {
      tag: "FAILED",
      code: 400,
      message: `Method is not supported: ${paymentMethod}"`,
    };
  }

  const { mode, amount, productKey } = params;

  const product = settings.products.find((x) => x.key === productKey);
  if (product == null) {
    return {
      tag: "FAILED",
      code: 400,
      message: `Unable to find product by key "${productKey}"`,
    };
  }

  try {
    const lang = LANGS.indexOf(params.lang) !== -1 ? params.lang : DEFAULT_LANG;
    const stripeInstance = new Stripe(SECRET_KEY, {
      apiVersion: "2022-11-15",
    });
    const baseUrl = lang === DEFAULT_LANG ? BASE_URL : `${BASE_URL}/${lang}`;
    if (baseUrl == null) {
      throw new Error(`Empty base url`)
    }
    const sessionParams: Stripe.Checkout.SessionCreateParams =
      mode === "subscription"
        ? subscription(parseInt(amount), product.stripeId, baseUrl, lang)
        : oneTimePayment(parseInt(amount), product.stripeId, baseUrl, lang);
    const session = await stripeInstance.checkout.sessions.create(
      sessionParams
    );
    res.status(200).send(
      JSON.stringify({
        location: session.url,
      })
    );
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send(e.message ?? "Something has gone wrong on our side, sorry :(");
  }
}
