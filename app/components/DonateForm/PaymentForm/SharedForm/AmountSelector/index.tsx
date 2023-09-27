import envSettings from "../../../../../../envSettings";
import { EnvSettings, Product } from "../../../../../../shared/env";
import s from "./index.module.scss";

const ENV =
  process.env.NODE_ENV === "development" ? "development" : "production";

const settings: EnvSettings = envSettings[ENV];

interface Props {
  selectedId: string | null;
  onChange: (product: Product) => void;
}

export default function AmountSelector(props: Props) {
  const { selectedId, onChange } = props;
  return (
    <div className={s.root}>
      {settings.products.map((product) => (
        <button
          className={[
            s.item,
            product.productId === selectedId && s.isActive,
          ].join(" ")}
          key={product.productId}
          onClick={() => {
            onChange(product);
          }}
        >
          ${product.amount}
        </button>
      ))}
    </div>
  );
}
