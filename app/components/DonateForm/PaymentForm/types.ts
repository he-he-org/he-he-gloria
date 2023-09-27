import { Product } from "../../../../shared/env";

export type SharedPaymentInformation = {
  amount: number | null;
  subscription: boolean;
  product: Product | null;
};
