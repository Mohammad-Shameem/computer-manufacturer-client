import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";

const AllOrder = () => {
  const [orderId, setOrderId] = useState("");
  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery("allorder", () =>
    fetch("https://warm-cove-56009.herokuapp.com/allorders", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    }).then((res) => res.json())
  );

  if (isLoading) {
    return <Loading></Loading>;
  }

  const shipOrder = (orderId) => {
    fetch(`https://warm-cove-56009.herokuapp.com/adminorderupdate/${orderId}`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("Dear,Admin. You shipped the order successfully");
          refetch();
        }
      });
  };

  const handleDeleteOrder = (orderId) => {
    fetch(`https://warm-cove-56009.herokuapp.com/orderadmindelete/${orderId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("You delete the order successfully");
          refetch();
        }
      });
  };
  return (
    <>
      <div className="mb-20">
        <h1 className="mt-5 mb-3 text-xl font-bold text-center">
          Manage All Products
        </h1>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-14 w-[90%] mx-auto mt-5">
          {orders.map((order) => (
            <div key={order._id} className="card w-96 bg-base-100 shadow-xl">
              <figure>
                <img
                  className="w-96 h-64"
                  src={order.productImage}
                  alt="Shoes"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">
                  {order.productName}
                  {order?.shipped && (
                    <div className="badge badge-secondary">Shipped</div>
                  )}
                  {order?.paid && !order?.shipped && (
                    <div className="badge badge-warning">Pending</div>
                  )}
                  {!order?.paid && (
                    <div className="badge badge-black">Unpaid</div>
                  )}
                </h2>

                <p>Order by : {order.userName}</p>
                <p>Email : {order.userEmail}</p>
                <p>Product Code : {order.productCode}</p>
                <p>Orderd Quantity : {order.orderQuantity}</p>
                <p>Total Price : $ {order.totalPrice}</p>
                <div className="card-actions">
                  {order?.shipped && order?.paid && ""}
                  {!order?.shipped && order?.paid && (
                    <label
                      onClick={() => setOrderId(order._id)}
                      htmlFor="product-ship-modal"
                      className="btn btn-primary w-1/2 mx-auto mt-5"
                    >
                      Ship Order
                    </label>
                  )}
                  {!order?.shipped && !order?.paid && (
                    <label
                      onClick={() => setOrderId(order._id)}
                      htmlFor="product-modal"
                      className="btn btn-black w-1/2 mx-auto mt-5"
                    >
                      Cancel Order
                    </label>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <input type="checkbox" id="product-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to Delete this order?
          </h3>
          <p className="py-4">
            once you click the delete order,the order will be delete from
            database,and cant be undo.so,be careful.
          </p>
          <div className="modal-action">
            <label
              onClick={() => handleDeleteOrder(orderId)}
              htmlFor="product-modal"
              className="btn btn-warning"
            >
              Delete
            </label>
            <label htmlFor="product-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>
      <div>
        <input
          type="checkbox"
          id="product-ship-modal"
          className="modal-toggle"
        />
        <div className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Dear,Admin.</h3>
            <p className="py-4">
              The order has been paid & wait to be shipped, so you can ship this
              order to the consumer destination. press Ship to Proceed.
            </p>
            <div className="modal-action">
              <label
                onClick={() => shipOrder(orderId)}
                htmlFor="product-ship-modal"
                className="btn btn-primary"
              >
                Ship Order
              </label>
              <label htmlFor="product-ship-modal" className="btn">
                Close
              </label>
            </div>
          </div>
        </div>
      </div>
      <PageTitle title={"all-order"}></PageTitle>
    </>
  );
};

export default AllOrder;
