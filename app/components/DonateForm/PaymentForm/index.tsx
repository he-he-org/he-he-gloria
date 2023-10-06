"use client";
import { useState } from "react";
import Crypto from "./Crypto";
import Venmno from "./Venmno";
import Stripe from "./Stripe";
import PayPal from "./PayPal";
import SharedForm from "./SharedForm";
import { SharedPaymentInformation } from "./types";
import s from "./index.module.scss";
import { EnvSettings } from "../../../../shared/env";
import envSettings from "../../../../envSettings";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

export default function PaymentForm() {
  const [method, setMethod] = useState("stripe");
  const [sharedPaymentInformation, setSharedPaymentInformation] =
    useState<SharedPaymentInformation>({
      subscription: false,
      amount: settings.products[1].amount ?? null,
      product: settings.products[1] ?? null,
    });
  let handleSwitchSubscription = () => {
    setSharedPaymentInformation((prevState) => ({
      ...prevState,
      subscription: !prevState.subscription,
    }));
  };
  return (
    <div className={s.root}>
      <div className={s.tabs}>
        <div
          className={[
            s.tab,
            !sharedPaymentInformation.subscription && s.isActive,
          ].join(" ")}
          onClick={handleSwitchSubscription}
        >
          Donate
        </div>
        <div
          className={[
            s.tab,
            sharedPaymentInformation.subscription && s.isActive,
          ].join(" ")}
          onClick={handleSwitchSubscription}
        >
          Subscribe
        </div>
      </div>
      <div className={s.body}>
        <SharedForm
          sharedPaymentInformation={sharedPaymentInformation}
          onChangeSharedPaymentInformation={setSharedPaymentInformation}
        />
        {/*<div>*/}
        {/*  <button type="button" onClick={() => setMethod("stripe")}>*/}
        {/*    Stripe*/}
        {/*  </button>*/}
        {/*  <button type="button" onClick={() => setMethod("venmno")}>*/}
        {/*    Venmno*/}
        {/*  </button>*/}
        {/*  <button type="button" onClick={() => setMethod("payPal")}>*/}
        {/*    PayPal*/}
        {/*  </button>*/}
        {/*  <button type="button" onClick={() => setMethod("crypto")}>*/}
        {/*    Crypto*/}
        {/*  </button>*/}
        {/*</div>*/}
        <div className={s.buttons}>
          <div className={s.description}>
            {sharedPaymentInformation.product?.description}
          </div>
          <Stripe shared={sharedPaymentInformation} />
          {!sharedPaymentInformation.subscription && (
            <PayPal shared={sharedPaymentInformation} />
          )}
          {/*{method === "venmno" && <Venmno />}*/}
          {/*{method === "payPal" && <PayPal />}*/}
          {/*{method === "crypto" && <Crypto />}*/}
        </div>
      </div>
    </div>
  );
}
