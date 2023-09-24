import envSettings from "../../../../envSettings";
import { EnvSettings } from "../../../../shared/env";
import { SharedPaymentInformation } from "../types";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

interface FormValue {
  subscribe: boolean;
  productKey: string | null;
  amount: number;
}

type Props = {
  sharedPaymentInformation: SharedPaymentInformation;
  onChangeSharedPaymentInformation: (value: SharedPaymentInformation) => void;
};

export default function SharedForm(props: Props) {
  const { sharedPaymentInformation, onChangeSharedPaymentInformation } = props;
  console.log("settings.products", settings.products);
  return (
    <div>
      <div>
        <label>
          Product:
          <select
            value={sharedPaymentInformation.product?.productId ?? ""}
            onChange={(e) => {
              const productInfo = settings.products.find(
                (x) => x.productId === e.target.value ?? null
              );

              onChangeSharedPaymentInformation({
                ...sharedPaymentInformation,
                amount: productInfo?.amount ?? null,
                product: productInfo ?? null,
              });
            }}
          >
            {settings.products.map((product) => (
              <option key={product.productId}>{product.productId}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Amount:
          <input
            type="number"
            min="0"
            value={sharedPaymentInformation.amount ?? 0}
            onChange={(e) =>
              onChangeSharedPaymentInformation({
                ...sharedPaymentInformation,
                amount: parseInt(e.target.value) ?? 0,
              })
            }
          />
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            min="0"
            checked={sharedPaymentInformation.subscription}
            onChange={(e) =>
              onChangeSharedPaymentInformation({
                ...sharedPaymentInformation,
                subscription: e.target.checked,
              })
            }
          />
          subscribe
        </label>
      </div>
    </div>
  );
}
