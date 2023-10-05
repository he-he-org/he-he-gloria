import * as t from "io-ts";
import { LangCodec } from "./dataTypes/lang";

export const StripePaymentRequestCodec = t.type({
  paymentMethod: t.literal("stripe"),
  params: t.type({
    productId: t.string,
    mode: t.union([t.literal("subscription"), t.literal("payment")]),
    amount: t.string,
  }),
});

export type StripePaymentRequest = t.TypeOf<typeof StripePaymentRequestCodec>;

export const PaypalCreateOrderCodec = t.type({
  step: t.literal("create_order"),
  mode: t.union([t.literal("subscription"), t.literal("payment")]),
  amount: t.string,
});
export const PaypalCaptureOrderCodec = t.type({
  step: t.literal("capture_order"),
  orderID: t.string,
});

export const PaypalStepCodec = t.union([
  PaypalCreateOrderCodec,
  PaypalCaptureOrderCodec,
]);

export const PaypalPaymentRequestCodec = t.type({
  paymentMethod: t.literal("paypal"),
  params: t.type({
    step: PaypalStepCodec,
  }),
});

export type PaypalPaymentRequest = t.TypeOf<typeof PaypalPaymentRequestCodec>;

export const PaymentRequestCodec = t.union([
  StripePaymentRequestCodec,
  PaypalPaymentRequestCodec,
]);

export type PaymentRequest = t.TypeOf<typeof PaymentRequestCodec>;

/*
  Response
 */
export const StripePaymentResponseCodec = t.type({
  paymentMethod: t.literal("stripe"),
  location: t.union([t.string, t.null]),
});
export type StripePaymentResponse = t.TypeOf<typeof StripePaymentResponseCodec>;

export const PaypalPaymentCreateResponseCodec = t.type({
  step: t.literal("create"),
  orderId: t.string,
});
export const PaypalPaymentCaptureResponseCodec = t.type({
  step: t.literal("capture"),
  orderData: t.union([t.any, t.undefined]),
});
export const PaypalPaymentResponseCodec = t.type({
  paymentMethod: t.literal("paypal"),
  step: t.union([
    PaypalPaymentCreateResponseCodec,
    PaypalPaymentCaptureResponseCodec,
  ]),
});
export type PaypalPaymentResponse = t.TypeOf<typeof PaypalPaymentResponseCodec>;

export const PaymentResponseCodec = t.union([
  StripePaymentResponseCodec,
  PaypalPaymentResponseCodec,
]);

export type PaymentResponse = t.TypeOf<typeof PaymentResponseCodec>;
