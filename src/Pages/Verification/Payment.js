import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import auth from "../../firebase.init";
import paymentBackground from "../../images/background/paymentbackground.jpg";
import CheckoutForm from "../CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51L2IPEKlxr2eiMDBtfIU1jiyQOJ6TysJ5vqdl3dQUBbIvfBsxm6IwiUHWgXYgmylUuocppNFTDsgZPv8U4svJw0Y00lINZcRYf"
);

const Payment = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    fetch(`https://warm-cove-56009.herokuapp.com/payorder/${id}`)
      .then((res) => res.json())
      .then((data) => setOrder(data));
  }, []);
  const {
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
  return (
    <div
      style={{
        background: `url(${paymentBackground})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="hero min-h-screen ">
        <div className="hero-content  grid sm:grid-cols-1  lg:grid-cols-2 md:grid-cols-2 lg:w-[80%] gap-20 mx-auto ">
          <div>
            <div className="card bg-slate-500 shadow-xl h-auto">
              <figure>
                <img src={productImage} alt="" />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-white font-bold">
                  Wellcome,{userName}
                </h2>
                <p className="text-white">
                  You`re in the payment page, and you are going to pay for{" "}
                  <span className="text-[#00008B] font-bold">
                    {" "}
                    {productName}
                  </span>
                </p>
                <p className="text-white">
                  Your order quantity is{" "}
                  <span className="text-[#00008B] font-bold">
                    {orderQuantity}
                  </span>
                </p>
                <p className="text-white">
                  Your orderd product per unit price is{" "}
                  <span className="text-[#00008B] font-bold">
                    {productPrice}
                  </span>
                  usd
                </p>
                <p className="text-white">
                  Your Total coast will be{" "}
                  <span className="text-[#00008B] font-bold">
                    {" "}
                    $ {totalPrice}
                  </span>
                  usd
                </p>
              </div>
            </div>
          </div>
          <div>
            <div className="card w-96 bg-base-100 shadow-xl">
              <div className="card-body">
                <Elements stripe={stripePromise}>
                  <CheckoutForm order={order} />
                </Elements>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
