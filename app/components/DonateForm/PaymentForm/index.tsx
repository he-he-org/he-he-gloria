"use client";
import { useCallback, useState } from "react";
import envSettings from "../../../../envSettings";
import { EnvSettings } from "../../../../shared/env";
import s from "./index.module.scss";
import PayPal from "./PayPal";
import SharedForm from "./SharedForm";
import Stripe from "./Stripe";
import { SharedPaymentInformation } from "./types";
import InitiateCheckoutParameters = facebook.Pixel.InitiateCheckoutParameters;

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
  const handleTrackPayment = useCallback(() => {
    const parameters: InitiateCheckoutParameters = {
      value: sharedPaymentInformation.amount ?? 0,
      currency: "USD",
    };
    fbq("track", "InitiateCheckout", {
      ...parameters,
      type: sharedPaymentInformation.subscription ? "subscription" : "one_time",
    });
  }, [sharedPaymentInformation]);

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
        <div className={s.buttons}>
          <div className={s.description}>
            {sharedPaymentInformation.product?.description}
          </div>
          <Stripe
            shared={sharedPaymentInformation}
            onTrackPayment={handleTrackPayment}
          />
          {!sharedPaymentInformation.subscription && (
            <PayPal
              shared={sharedPaymentInformation}
              onTrackPayment={handleTrackPayment}
            />
          )}
        </div>
      </div>
    </div>
  );
}
