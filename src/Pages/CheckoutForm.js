import React, { useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PageTitle from "./Shared/PageTitle/PageTitle";

const CheckoutForm = ({ order }) => {
  const {
    _id,
    userName,
    userEmail,
    productName,
    productCode,
    productPrice,
    userAddress,
    userPhone,
    orderQuantity,
    productImage,
    totalPrice,
  } = order;

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  useEffect(() => {
    if (totalPrice) {
      fetch(
        "https://computer-manufacturer-server.up.railway.app/create-payment-intent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          body: JSON.stringify({ totalPrice }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
      setSuccess("");
    } else {
      setCardError("");
      setProcessing(true);
    }
    const { paymentIntent, error: IntentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: userName,
            email: userEmail,
          },
        },
      });
    if (IntentError) {
      setProcessing(false);
      setCardError(IntentError?.message);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("Congrats! Your payment is completed");
      //update data to the database
      const payment = {
        transactionId: paymentIntent.id,
        order,
      };
      fetch(
        `https://computer-manufacturer-server.up.railway.app/order/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
          body: JSON.stringify(payment),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn  bg-[#00008B] mt-10"
          type="submit"
          disabled={!stripe || !clientSecret || success}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-600 font-bold">{cardError}</p>}
      {success && <p className="text-green-600 font-bold">{success}</p>}
      {transactionId && (
        <p className="text-green-600 font-bold">
          {" "}
          Your Transaction id is : {transactionId}
        </p>
      )}
      <PageTitle title={"payorder"}></PageTitle>
    </>
  );
};

export default CheckoutForm;
