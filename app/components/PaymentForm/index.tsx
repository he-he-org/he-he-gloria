"use client";
import { useState } from "react";
import Crypto from "./Crypto";
import Venmno from "./Venmno";
import Stripe from "./Stripe";
import PayPal from "./PayPal";
import SharedForm from "./SharedForm";
import { SharedPaymentInformation } from "./types";

export default function PaymentForm() {
  const [method, setMethod] = useState("stripe");
  const [sharedPaymentInformation, setSharedPaymentInformation] =
    useState<SharedPaymentInformation>({
      subscription: false,
      amount: null,
      product: null,
    });
  return (
    <>
      <h1>Payment form</h1>
      <SharedForm
        sharedPaymentInformation={sharedPaymentInformation}
        onChangeSharedPaymentInformation={setSharedPaymentInformation}
      />
      <div>
        <button type="button" onClick={() => setMethod("stripe")}>
          Stripe
        </button>
        <button type="button" onClick={() => setMethod("venmno")}>
          Venmno
        </button>
        <button type="button" onClick={() => setMethod("payPal")}>
          PayPal
        </button>
        <button type="button" onClick={() => setMethod("crypto")}>
          Crypto
        </button>
      </div>
      <div>
        {method === "stripe" && <Stripe shared={sharedPaymentInformation} />}
        {method === "venmno" && <Venmno />}
        {method === "payPal" && <PayPal />}
        {method === "crypto" && <Crypto />}
      </div>
    </>
  );
}
