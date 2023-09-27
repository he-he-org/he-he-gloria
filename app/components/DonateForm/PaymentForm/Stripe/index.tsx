import envSettings from "../../../../../envSettings";
import { EnvSettings } from "../../../../../shared/env";
import { SharedPaymentInformation } from "../types";
import { useCallback } from "react";
import { PaymentRequest } from "../../../../../shared/payment";
import DonateButton from "../../../DonateButton";
import * as t from "io-ts";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

export default function Stripe(props: { shared: SharedPaymentInformation }) {
  const { shared } = props;

  const handleSubmit = useCallback(async () => {
    const request: PaymentRequest = {
      paymentMethod: "stripe",
      productId: shared.product?.productId ?? "",
      params: {
        lang: "en", // todo: use env
        mode: shared.subscription ? "subscription" : "payment",
        amount: ((shared.amount ?? 0) * 100).toFixed(0),
      },
    };
    const serverResponse = await fetch("/api/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
    const responseJson = await serverResponse.json();
    if (responseJson.location) {
      window.location.href = responseJson.location;
    }
  }, [shared]);

  return (
    <DonateButton isDisabled={shared.product == null} onClick={handleSubmit}>
      Donate
    </DonateButton>
  );
}
