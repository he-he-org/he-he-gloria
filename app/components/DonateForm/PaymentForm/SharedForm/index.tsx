import { SharedPaymentInformation } from "../types";
import AmountSelector from "./AmountSelector";

type Props = {
  sharedPaymentInformation: SharedPaymentInformation;
  onChangeSharedPaymentInformation: (value: SharedPaymentInformation) => void;
};

export default function SharedForm(props: Props) {
  const { sharedPaymentInformation, onChangeSharedPaymentInformation } = props;

  return (
    <AmountSelector
      selectedId={sharedPaymentInformation.product?.productId ?? null}
      onChange={(product, amount) => {
        onChangeSharedPaymentInformation({
          ...sharedPaymentInformation,
          amount,
          product,
        });
      }}
    />
  );
}
