import React, { useState } from "react";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import {
  PaymentResponse,
  PaypalPaymentRequest,
} from "../../../../../shared/payment";
import { SharedPaymentInformation } from "../types";

// Renders errors or successfull transactions on the screen.
function Message({ content }) {
  return <p>{content}</p>;
}
type Props = { shared: SharedPaymentInformation };

const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;

export default function PayPal(props: Props) {
  const { shared } = props;
  if (PAYPAL_CLIENT_ID == null) {
    throw new Error(`PAYPAL_CLIENT_ID is not defined`);
  }
  const initialOptions = {
    clientId: PAYPAL_CLIENT_ID,
    "enable-funding": "paypal",
    "data-sdk-integration-source": "integrationbuilder_sc",
    vault: shared.subscription,
  };

  const [message, setMessage] = useState("");

  return (
    <>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",
            // color: fundingSource == paypal.FUNDING.PAYLATER ? "gold" : "",
            layout: "vertical", //default value. Can be changed to horizontal
          }}
          createSubscription={
            shared.subscription
              ? async () => {
                  try {
                    const request: PaypalPaymentRequest = {
                      paymentMethod: "paypal",
                      params: {
                        step: {
                          step: "create_order",
                          mode: "subscription",
                          amount: ((shared.amount ?? 0) * 100).toFixed(0),
                        },
                      },
                    };
                    const serverResponse = await fetch("/api/payment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(request),
                    });
                    const responseJson =
                      (await serverResponse.json()) as PaymentResponse;

                    if (responseJson.paymentMethod !== "paypal") {
                      throw new Error(`Wrong response type`);
                    }
                    if (responseJson.step.step !== "create") {
                      throw new Error(`Wrong response type`);
                    }
                    return responseJson.step.orderId;
                  } catch (error) {
                    setMessage(`Could not initiate PayPal Checkout...${error}`);
                    throw error;
                  }
                }
              : undefined
          }
          createOrder={
            !shared.subscription
              ? async () => {
                  try {
                    const request: PaypalPaymentRequest = {
                      paymentMethod: "paypal",
                      params: {
                        step: {
                          step: "create_order",
                          mode: "payment",
                          amount: ((shared.amount ?? 0) * 100).toFixed(0),
                        },
                      },
                    };
                    const serverResponse = await fetch("/api/payment", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(request),
                    });
                    const responseJson =
                      (await serverResponse.json()) as PaymentResponse;

                    if (responseJson.paymentMethod !== "paypal") {
                      throw new Error(`Wrong response type`);
                    }
                    if (responseJson.step.step !== "create") {
                      throw new Error(`Wrong response type`);
                    }
                    return responseJson.step.orderId;
                  } catch (error) {
                    setMessage(`Could not initiate PayPal Checkout...${error}`);
                    throw error;
                  }
                }
              : undefined
          }
          onApprove={async (data, actions) => {
            try {
              const request: PaypalPaymentRequest = {
                paymentMethod: "paypal",
                params: {
                  step: {
                    step: "capture_order",
                    orderID: data.orderID,
                  },
                },
              };
              const serverResponse = await fetch("/api/payment", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(request),
              });

              const responseJson =
                (await serverResponse.json()) as PaymentResponse;

              if (responseJson.paymentMethod !== "paypal") {
                throw new Error(`Wrong response type`);
              }

              // Three cases to handle:
              //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
              //   (2) Other non-recoverable errors -> Show a failure message
              //   (3) Successful transaction -> Show confirmation or thank you message

              const { step } = responseJson;
              if (step.step !== "capture") {
                throw new Error(`Wrong response type`);
              }
              const { orderData } = step;
              const errorDetail = orderData?.details?.[0];

              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message
                // Or go to another URL:  actions.redirect('thank_you.html');
                const transaction =
                  orderData.purchase_units[0].payments.captures[0];
                setMessage(
                  `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                );
                console.log(
                  "Capture result",
                  orderData,
                  JSON.stringify(orderData, null, 2)
                );
              }
            } catch (error) {
              setMessage(`Could not initiate PayPal Checkout...${error}`);
              throw error;
            }
          }}
        />
      </PayPalScriptProvider>
      <Message content={message} />
    </>
  );
}
