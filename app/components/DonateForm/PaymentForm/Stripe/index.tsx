import envSettings from "../../../../../envSettings";
import { EnvSettings } from "../../../../../shared/env";
import { SharedPaymentInformation } from "../types";
import { useCallback } from "react";
import {
  PaymentRequest,
  StripePaymentResponse,
} from "../../../../../shared/payment";
import s from "./index.module.scss";
import LogoSvg from "./logo.svg";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

type Props = { shared: SharedPaymentInformation; onTrackPayment: () => void };
export default function Stripe(props: Props) {
  const { shared, onTrackPayment } = props;

  const handleSubmit = useCallback(async () => {
    try {
      onTrackPayment();
      const request: PaymentRequest = {
        paymentMethod: "stripe",
        params: {
          productId: shared.product?.productId ?? "",
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
      const responseJson: StripePaymentResponse = await serverResponse.json();
      if (responseJson.location) {
        window.location.href = responseJson.location;
      }
    } catch (e) {
      console.error(e);
    }
  }, [onTrackPayment, shared]);

  return (
    <button
      disabled={shared.product == null || shared.amount == null}
      onClick={handleSubmit}
      className={s.button}
    >
      <LogoSvg alt="Stripe" title="Stripe" />
    </button>
  );
}
