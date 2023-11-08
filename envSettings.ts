import { EnvSettings } from "./shared/env";

const products = [
  {
    productId: "PRODUCT_1",
    amount: 50,
    description:
      "Provide vital medical supplies for 1 patient's month-long treatment, including bandages, syringes, and disinfectants",
  },
  {
    productId: "PRODUCT_2",
    amount: 125,
    description:
      "Support a malnourished child for a whole month and make a lasting impact",
  },
  {
    productId: "PRODUCT_3",
    amount: 250,
    description:
      "Ensure monthly medication for 4 patients with diabetes type 2",
  },
  {
    productId: "PRODUCT_4",
    amount: 500,
    description:
      "Offer a year of dedicated care to a patient battling epilepsy, helping them live a better life.",
  },
];

const ENV: { [env in "development" | "production"]: EnvSettings } = {
  production: {
    products: products,
    stripe: {
      products: {
        PRODUCT_1: {
          stripeProductId: "prod_OiNxfYtViyXOQx",
          subscription: false,
        },
        PRODUCT_2: {
          stripeProductId: "prod_OiNxGk7ZRmQi9S",
          subscription: false,
        },
        PRODUCT_3: {
          stripeProductId: "prod_OiNy3s1qv4k4fE",
          subscription: false,
        },
        PRODUCT_4: {
          stripeProductId: "prod_OiNyhvsWczhPPf",
          subscription: false,
        },
      },
    },
  },
  development: {
    products: products,
    stripe: {
      products: {
        PRODUCT_1: {
          stripeProductId: "prod_Oy8l78HVrfI1ls",
          subscription: false,
        },
        PRODUCT_2: {
          stripeProductId: "price_1OACWwIjit1s7RiHuCvfwPI5",
          subscription: false,
        },
        PRODUCT_3: {
          stripeProductId: "prod_Oy8pbXF2yRcG0C",
          subscription: false,
        },
        PRODUCT_4: {
          stripeProductId: "prod_Oy8pMxrb2s8v1l",
          subscription: false,
        },
      },
    },
  },
};

export default ENV;
