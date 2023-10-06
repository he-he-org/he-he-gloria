import envSettings from "../../../../../envSettings";
import { EnvSettings } from "../../../../../shared/env";
import { SharedPaymentInformation } from "../types";
import { useCallback } from "react";
import { PaymentRequest } from "../../../../../shared/payment";
import s from "./index.module.scss";
import LogoSvg from "./logo.svg";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

type Props = { shared: SharedPaymentInformation };
export default function Stripe(props: Props) {
  const { shared } = props;

  const handleSubmit = useCallback(async () => {
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
    const responseJson = await serverResponse.json();
    if (responseJson.location) {
      window.location.href = responseJson.location;
    }
  }, [shared]);

  return (
    <button
      disabled={shared.product == null}
      onClick={handleSubmit}
      className={s.button}
    >
      <LogoSvg alt="Stripe" title="Stripe" />
    </button>
  );
}
