import { useCallback, useState } from "react";

interface FormValue {
  subscribe: boolean;
  amount: number;
}

export default function Stripe() {
  const [formValues, setFormValues] = useState<FormValue>({
    subscribe: false,
    amount: 0,
  });

  const handleSubmit = useCallback(async () => {
    const serverResponse = await fetch(".netlify/functions/payment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        lang: "en",
        mode: formValues.subscribe ? "subscription" : "payment",
        amount: `${formValues.amount}`,
        // productKey: productInfo.productKey,
      }),
    });
    const responseJson = await serverResponse.json();
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
  return (
    <div>
      <h1>Stripe</h1>
      <div>
        <label>
          Amount:
          <input
            type="number"
            min="0"
            value={formValues.amount}
            onChange={(e) =>
              setFormValues((prevState) => ({
                ...prevState,
                amount: parseInt(e.target.value) ?? 0,
              }))
            }
          />
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
        <button type="button" onClick={handleSubmit}>
          Pay
        </button>
      </div>
    </div>
  );
}
