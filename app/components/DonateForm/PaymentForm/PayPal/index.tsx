import { useCallback, useState } from "react";
import envSettings from "../../../../../envSettings";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings = envSettings[ENV];

interface FormValue {
  subscribe: boolean;
  productKey: string | null;
  amount: number;
}

export default function Stripe(props: {}) {
  return <div></div>
  // const [formValues, setFormValues] = useState<FormValue>({
  //   subscribe: false,
  //   amount: 25,
  //   productKey: "25_DOLLARS_EN",
  // });
  //
  // const productInfo = settings.products.find(
  //   (x) => x.key === formValues.productKey
  // );
  //
  // const handleSubmit = useCallback(async () => {
  //   const params = {
  //     business: "mailbox@he-he.org",
  //     first_name: "Nikolai",
  //     last_name: "Mavrenkov",
  //     email: "koluch@koluch.ru",
  //     // address1: "",
  //     // address2: "",
  //     // city: "",
  //     // state: "",
  //     // zip: "",
  //     // country: "",
  //     // "invoice": "ad37648ed2521fed8f8b9e09da63c38c",
  //     amount: productInfo.amount.toFixed(2),
  //     item_name: `You can help us: $${productInfo.amount}`,
  //     currency_code: "USD",
  //     return:
  //       "https://he-he.org?give-listener=give-gateway&give-gateway-id=paypal&give-gateway-method=handleSuccessPaymentReturn&donation-id=21417&give-route-signature=2ddb2f694410cce81b86df8ed7577d9d&give-route-signature-id=21417&give-route-signature-expiration=1693739984",
  //     cancel_return:
  //       "https://he-he.org?give-listener=give-gateway&give-gateway-id=paypal&give-gateway-method=handleFailedPaymentReturn&donation-id=21417&give-route-signature=edd2230c588b6809f4e76160bd9b06cc&give-route-signature-id=21417&give-route-signature-expiration=1693739984",
  //     notify_url:
  //       "https://he-he.org?give-listener=give-gateway&give-gateway-id=paypal&give-gateway-method=handleIpnNotification",
  //     no_shipping: "1",
  //     shipping: "0",
  //     no_note: "1",
  //     charset: "UTF-8",
  //     custom: "21417",
  //     rm: "2",
  //     page_style: "PayPal",
  //     cbt: "Health & Help",
  //     bn: "givewp_SP",
  //     cmd: "_donations",
  //   };
  //
  //   const url =
  //     `https://www.paypal.com/donate/?` +
  //     Object.entries(params)
  //       .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  //       .join("&");
  //   window.location.href = url;
  // }, [formValues]);
  //
  // return (
  //   <div>
  //     <h1>Paypal</h1>
  //     <div>
  //       <label>
  //         Product:
  //         <select
  //           value={formValues.productKey ?? ""}
  //           onChange={(e) => {
  //             setFormValues((prevState) => ({
  //               ...prevState,
  //               productKey: e.target.value ?? null,
  //             }));
  //           }}
  //         >
  //           {settings.products.map((product) => (
  //             <option key={product.key}>{product.key}</option>
  //           ))}
  //         </select>
  //         {/*<input*/}
  //         {/*  type="number"*/}
  //         {/*  min="0"*/}
  //         {/*  value={formValues.amount}*/}
  //         {/*  onChange={(e) =>*/}
  //         {/*    setFormValues((prevState) => ({*/}
  //         {/*      ...prevState,*/}
  //         {/*      amount: parseInt(e.target.value) ?? 0,*/}
  //         {/*    }))*/}
  //         {/*  }*/}
  //         {/*/>*/}
  //       </label>
  //     </div>
  //     <div>
  //       <label>
  //         <input
  //           type="checkbox"
  //           min="0"
  //           checked={formValues.subscribe}
  //           onChange={(e) =>
  //             setFormValues((prevState) => ({
  //               ...prevState,
  //               subscribe: e.target.checked,
  //             }))
  //           }
  //         />
  //         subscribe
  //       </label>
  //     </div>
  //     <div>
  //       <button
  //         type="button"
  //         onClick={handleSubmit}
  //         disabled={productInfo == null}
  //       >
  //         Pay
  //       </button>
  //     </div>
  //   </div>
  // );
}
