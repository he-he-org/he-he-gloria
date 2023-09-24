export type Product = {
  productId: string;
  amount: number;
};

export type StripeProduct = {
  stripeProductId: string;
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
