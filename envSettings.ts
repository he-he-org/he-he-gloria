import { EnvSettings } from "./shared/env";

const ENV: { [env in "development" | "production"]: EnvSettings } = {
  production: {
    products: [
      { productId: "25_DOLLARS", amount: 25 },
      { productId: "50_DOLLARS", amount: 50 },
    ],
  },
  development: {
    products: [
      {
        productId: "25_DOLLARS",
        amount: 25,
      },
      {
        productId: "50_DOLLARS",
        amount: 50,
      },
    ],
    stripe: {
      products: {
        "25_DOLLARS": {
          stripeId: "prod_OEQONs5h2V2h1b",
        },
        "50_DOLLARS": {
          stripeId: "prod_IbKROvifqeNrBt",
        },
      },
    },
  },
};

export default ENV;
