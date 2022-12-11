import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../firebase.init";
import PageTitle from "./Shared/PageTitle/PageTitle";

const Purchase = () => {
  const [user] = useAuthState(auth);
  const { id } = useParams();
  const [tool, setTool] = useState([]);
  const [quantity, setQuantity] = useState(0);
  console.log(quantity);

  useEffect(() => {
    fetch(
      `https://computer-manufacturer-server.up.railway.app/newtools/${id}`,
      {
        headers: {
          authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setTool(data);
        setQuantity(parseInt(data.Minimum_Order_Quantity));
      });
  }, [id]);

  const {
    img,
    name,
    Description,
    price,
    Available_Quantity,
    Minimum_Order_Quantity,
    _id,
  } = tool;

  const purchaseProduct = (event) => {
    event.preventDefault();
    const userName = event.target.name.value;
    const userEmail = event.target.email.value;
    const userAddress = event.target.address.value;
    const userPhone = event.target.number.value;
    const orderQuantity = parseInt(event.target.quantity.value);
    const productName = event.target.productName.value;
    const productCode = event.target.productCode.value;
    const productPrice = event.target.price.value;
    const productImage = img;
    const totalPrice = parseFloat(price) * parseFloat(quantity);
    const order = {
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
    };
    fetch("https://computer-manufacturer-server.up.railway.app/orders", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your Order Request accepted");
          setQuantity(parseFloat(Minimum_Order_Quantity));
        } else {
          toast.error(data.message);
        }

        event.target.reset();
      });
  };

  return (
    <>
      <div>
        <div className="hero  bg-base-100">
          <div className="hero-content grid sm:grid-cols-1 md:gridcols-2 lg:grid-cols-2 gap-10">
            <div className="text-center lg:text-left">
              <div className="card w-96 bg-base-100 shadow-xl">
                <figure>
                  <img src={img} alt="Shoes" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    {name}
                    <div className="badge badge-secondary">{_id}</div>
                  </h2>
                  <div>
                    <p>
                      Price per unit : ${" "}
                      <span className="text-primary font-bold">{price}</span>
                    </p>
                    <p>
                      Total Price : ${" "}
                      <span className="text-primary font-bold">
                        {parseFloat(price) * parseFloat(quantity) || 0}
                      </span>
                    </p>
                    <p>
                      Availabe Quantity :{" "}
                      <span className="text-primary font-bold">
                        {Available_Quantity}
                      </span>
                    </p>
                    <p>
                      Minimum Order Quantity :{" "}
                      <span className="text-primary font-bold">
                        {Minimum_Order_Quantity}
                      </span>
                    </p>

                    <p>
                      Your Order Quantity :
                      <span className="text-primary font-bold ml-2">
                        {quantity || 0}
                      </span>{" "}
                    </p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <button
                        disabled={
                          parseFloat(quantity) >= parseFloat(Available_Quantity)
                        }
                        onClick={() => setQuantity(parseFloat(quantity) + 1)}
                        className="btn btn-primary"
                      >
                        Increase
                      </button>
                      <button
                        disabled={
                          parseFloat(quantity) <=
                          parseFloat(Minimum_Order_Quantity)
                        }
                        onClick={() => setQuantity(parseFloat(quantity) - 1)}
                        className="btn btn-warning"
                      >
                        Decrease
                      </button>
                    </div>
                  </div>
                  <div className="card-actions justify-end"></div>
                </div>
              </div>
            </div>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <form onSubmit={purchaseProduct} className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    disabled
                    value={user.displayName}
                    placeholder="email"
                    className="input input-bordered"
                    name="name"
                  />
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Email</span>
                    </label>
                    <input
                      disabled
                      value={user.email}
                      placeholder="password"
                      className="input input-bordered"
                      name="email"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product Name</span>
                    </label>
                    <input
                      disabled
                      value={name}
                      className="input input-bordered"
                      name="productName"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product Code</span>
                    </label>
                    <input
                      disabled
                      value={_id}
                      className="input input-bordered"
                      name="productCode"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Product Price</span>
                    </label>
                    <input
                      disabled
                      value={`$ ${price}`}
                      className="input input-bordered"
                      name="price"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Your current Address"
                      className="input input-bordered"
                      name="address"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Phone</span>
                    </label>
                    <input
                      required
                      type="number"
                      placeholder="Your Number"
                      className="input input-bordered"
                      name="number"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text"> Order Quantity</span>
                    </label>
                    <input
                      onChange={(e) =>
                        setQuantity(parseInt(e.target.value) || 0)
                      }
                      value={quantity}
                      required
                      type="number"
                      placeholder="Number of order quantity"
                      className="input input-bordered"
                      name="quantity"
                    />
                    <label className="label">
                      {parseFloat(quantity) < Minimum_Order_Quantity && (
                        <span className="label-text text-red-600">
                          Your order quantity should be more or equal Minimum
                          Order Quantity{" "}
                        </span>
                      )}
                      {parseFloat(quantity) > Available_Quantity && (
                        <span className="label-text text-red-600">
                          Your order quantity cant be more than Available
                          Quantity
                        </span>
                      )}
                    </label>
                  </div>
                  <input
                    disabled={
                      parseFloat(quantity) < Minimum_Order_Quantity ||
                      parseFloat(quantity) > Available_Quantity
                    }
                    className="btn btn-primary mt-3"
                    type="submit"
                    value="Purchase"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="card w-96 mx-auto bg-base-100 shadow-xl mb-10">
          <div className="card-body">
            <h2 className=" text-center text-xl font-bold text-primary">
              Description
            </h2>
            <p>{Description}</p>
          </div>
        </div>
      </div>
      <PageTitle title="purchase"></PageTitle>
    </>
  );
};

export default Purchase;
