import * as t from "io-ts";
import { LangCodec } from "./dataTypes/lang";

export const StripePaymentRequestCodec = t.type({
  paymentMethod: t.literal("stripe"),
  productId: t.string,
  params: t.type({
    lang: LangCodec,
    mode: t.union([t.literal("subscription"), t.literal("payment")]),
    amount: t.string,
  }),
});

export const PaymentRequestCodec = StripePaymentRequestCodec;

export type StripePaymentRequest = t.TypeOf<typeof StripePaymentRequestCodec>;

export type PaymentRequest = t.TypeOf<typeof PaymentRequestCodec>;
