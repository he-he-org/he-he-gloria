import { useCallback, useState } from "react";
import envSettings from "../../../../envSettings.json";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings = envSettings[ENV];

interface FormValue {
  subscribe: boolean;
  productKey: string | null;
}

export default function Stripe() {
  const [formValues, setFormValues] = useState<FormValue>({
    subscribe: false,
    productKey: "25_DOLLARS_EN",
  });

  const productInfo = settings.products.find(
    (x) => x.key === formValues.productKey
  );

  const handleSubmit = useCallback(async () => {
    const serverResponse = await fetch("/api/user", {
      method: "GET",
    });
    const responseJson = await serverResponse.text();
    console.log("serverResponse", responseJson);

    // const serverResponse = await fetch(".netlify/functions/payment_stripe", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     lang: "en",
    //     mode: formValues.subscribe ? "subscription" : "payment",
    //     amount: productInfo.amount,
    //     productKey: productInfo.productKey,
    //   }),
    // });
    // const responseJson = await serverResponse.json();
    console.log("serverResponse", responseJson);
    // if (!serverResponse.ok) {
    //   const message = await serverResponse.text();
    //   throw new Error(message);
    // }
    // const responseJson = await serverResponse.json();
    // if (responseJson.location == null) {
    //   throw new Error(
    //     `Bad response, expected to have "location" property for redirect`
    //   );
    // }
    // window.location.href = responseJson.location;
  }, [formValues]);
  console.log("env!", ENV);
  console.log("settings", settings);
  return (
    <div>
      <h1>Stripe</h1>
      <div>
        <label>
          Product:
          <select
            value={formValues.productKey ?? ""}
            onChange={(e) => {
              setFormValues((prevState) => ({
                ...prevState,
                productKey: e.target.value ?? null,
              }));
            }}
          >
            {settings.products.map((product) => (
              <option key={product.key}>{product.key}</option>
            ))}
          </select>
          {/*<input*/}
          {/*  type="number"*/}
          {/*  min="0"*/}
          {/*  value={formValues.amount}*/}
          {/*  onChange={(e) =>*/}
          {/*    setFormValues((prevState) => ({*/}
          {/*      ...prevState,*/}
          {/*      amount: parseInt(e.target.value) ?? 0,*/}
          {/*    }))*/}
          {/*  }*/}
          {/*/>*/}
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            min="0"
            checked={formValues.subscribe}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                subscribe: e.target.checked,
              }))
            }
          />
          subscribe
        </label>
      </div>
      <div>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={productInfo == null}
        >
          Pay
        </button>
      </div>
    </div>
  );
}
