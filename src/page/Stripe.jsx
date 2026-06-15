import { useState } from "react";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "@stripe/react-stripe-js";
import PrimaryBtn from "../components/PrimaryBtn";
import { useDispatch } from "react-redux";
import { setPaymentStatus } from "../redux/action";
import Loader from "../components/loader";
import { useTranslation } from "react-i18next";

const Stripe = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const { t } = useTranslation();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "system-ui, -apple-system, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        lineHeight: "24px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const paymentUrl = `https://involved-birgit-zinter-cb767b47.koyeb.app/api/MoveRequest/CreatePaymentIntent?amount=${amount}`;

  const handleCardChange = (field) => (event) => {
    if (event.error) {
      setErrors((prev) => ({ ...prev, [field]: event.error.message }));
    } else {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  // const makePaymentIntent = async () => {
  //   const res = await fetch(paymentUrl, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const data = res.json();
  //   console.log(data);
  // };

  // const handleCheckout = async () => {
  //   if (!stripe || !elements) {
  //     return;
  //   }

  //   setIsProcessing(true);

  //   try {
  //     const response = await createPayment(amount);

  //     if (response.clientSecret) {
  //       const { error, paymentIntent } = await stripe.confirmCardPayment(
  //         response.clientSecret,
  //         {
  //           payment_method: {
  //             card: elements.getElement(CardNumberElement),
  //           },
  //         }
  //       );
  //       makePaymentIntent();
  //       if (error) {
  //         console.error("Payment failed:", error.message);
  //         setErrors({ payment: error.message });
  //       } else if (paymentIntent.status === "succeeded") {
  //         console.log("Payment successful!", paymentIntent);
  //         dispatch(setPaymentStatus());
  //       }
  //     }
  //   } catch (error) {
  //     console.log("Checkout failed:", error);
  //     setErrors({ payment: "Payment failed. Please try again." });
  //   } finally {
  //     setIsProcessing(false);
  //   }
  // };

  const handleCheckout = async () => {
    if (!stripe || !elements) return;
    setIsProcessing(true);

    try {
      // Step 1: Create the PaymentIntent
      const res = await fetch(paymentUrl, { method: "GET" });
      const data = await res.json(); // contains clientSecret
      const clientSecret = data.clientSecret;

      // Step 2: Confirm payment with clientSecret
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: { card: elements.getElement(CardNumberElement) },
        }
      );

      if (error) {
        setErrors({ payment: error.message });
      } else if (paymentIntent.status === "succeeded") {
        console.log("Payment successful!", paymentIntent);
        dispatch(setPaymentStatus());
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      {isProcessing && <Loader />}
      <div className="container_stripe">
        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Card Number
            </label>
            <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
              <CardNumberElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardChange("cardNumber")}
              />
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-sm text-red-600">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry Date and CVC in Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <CardExpiryElement
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={handleCardChange("cardExpiry")}
                />
              </div>
              {errors.cardExpiry && (
                <p className="mt-1 text-sm text-red-600">{errors.cardExpiry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                CVC
              </label>
              <div className="border border-gray-300 rounded-lg p-3 bg-white focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                <CardCvcElement
                  options={CARD_ELEMENT_OPTIONS}
                  onChange={handleCardChange("cardCvc")}
                />
              </div>
              {errors.cardCvc && (
                <p className="mt-1 text-sm text-red-600">{errors.cardCvc}</p>
              )}
            </div>
          </div>

          {/* Payment Error */}
          {errors.payment && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.payment}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="w-full">
            <PrimaryBtn
              handlePress={handleCheckout}
              className="text-[14px] w-full mt-3"
              disabled={!stripe || isProcessing}
            >
              {t("moversContainer.make")}
            </PrimaryBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stripe;
