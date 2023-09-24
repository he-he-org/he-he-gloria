import envSettings from "../../../../envSettings";
import { EnvSettings } from "../../../../shared/env";
import { SharedPaymentInformation } from "../types";
import { useCallback } from "react";
import { PaymentRequest } from "../../../../shared/payment";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

interface FormValue {
  subscribe: boolean;
  productId: string | null;
  amount: number;
}

export default function Stripe(props: { shared: SharedPaymentInformation }) {
  const { shared } = props;
  const stripeProduct =
    settings.stripe?.products?.[shared.product?.productId ?? ''] ?? null;

  const handleSubmit = useCallback(async () => {
    if (stripeProduct == null) {
      throw new Error(
        `Stripe product for id "${shared.product?.productId}" is not defined`
      );
    }

    const request: PaymentRequest = {
      paymentMethod: "stripe",
      params: {
        lang: "en", // todo: use env
        mode: shared.subscription ? "subscription" : "payment",
        amount: ((shared.amount ?? 0) * 100).toFixed(0),
        productKey: stripeProduct.stripeProductId,
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
  }, [shared, stripeProduct]);

  return (
    <div>
      <h1>Stripe</h1>
      <div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={stripeProduct == null}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
