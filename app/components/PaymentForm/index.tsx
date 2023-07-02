'use client'
import { useState } from "react";
import Crypto from "./Crypto";
import Venmno from "./Venmno";
import Stripe from "./Stripe";
import PayPal from "./PayPal";

export default function PaymentForm() {
  const [method, setMethod] = useState("stripe");
  return (
    <>
      <h1>Payment form</h1>
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
        {method === "stripe" && <Stripe />}
        {method === "venmno" && <Venmno />}
        {method === "payPal" && <PayPal />}
        {method === "crypto" && <Crypto />}
      </div>
    </>
  );
}
