export type Product = {
  productId: string;
  amount: number | null;
  description: string;
};

export type StripeProduct = {
  stripeProductId: string;
  subscription: boolean;
};

type StripeConfig = {
  products?: {
    [productId: string]: StripeProduct | undefined;
  };
};

export type EnvSettings = {
  products: Product[];
  stripe?: StripeConfig;
};
