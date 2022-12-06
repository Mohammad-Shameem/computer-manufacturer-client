import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";

const MyOrder = () => {
  const [user] = useAuthState(auth);
  const [id, setId] = useState(null);
  const [transId, setTransId] = useState("");
  const navigate = useNavigate();

  const {
    data: orders,
    isLoading,
    refetch,
  } = useQuery(["myOrders", user], () =>
    fetch(`http://localhost:5000/order?email=${user?.email}`).then((res) =>
      res.json()
    )
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/order/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.acknowledged) {
          toast.success("Your order is successfully canceled");
        }
        refetch();
      });
  };
  return (
    <>
      <h1 className="text-2xl mt-5 mb-5 text-center font-bold">My Orders</h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th></th>
                <th>Product</th>
                <th>Product Name</th>
                <th>Ordered Qunatity</th>
                <th>Product Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr>
                  <th>{index + 1}</th>
                  <td>
                    <div
                      className={`avatar ${order?.paid ? "online" : "offline"}`}
                    >
                      <div className="w-24 rounded-full">
                        <img src={order.productImage} alt="" />
                      </div>
                    </div>
                  </td>
                  <td>{order.productName}</td>
                  <td>{order.orderQuantity}</td>
                  <td>{order.productPrice}</td>
                  <td>
                    {
                      <>
                        {order.paid ? (
                          <div className="flex items-center">
                            <p className="text-xl font-bold bg-orange-500 py-3 px-3 rounded-full mr-5 text-white">
                              {" "}
                              Paid
                            </p>
                            <label
                              onClick={() => setTransId(order.transactionId)}
                              htmlFor="trans-modal"
                              className="btn modal-button py-3 px-3 rounded-full"
                            >
                              Trans Id
                            </label>
                          </div>
                        ) : (
                          <>
                            {" "}
                            <label
                              onClick={() => setId(order._id)}
                              htmlFor="cancel-modal"
                              className="btn btn-warning mr-8"
                            >
                              Cancel
                            </label>
                            <button
                              onClick={() => navigate(`/pay/${order._id}`)}
                              className="btn btn-primary"
                            >
                              Pay
                            </button>
                          </>
                        )}
                      </>
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <input type="checkbox" id="cancel-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are You sure to Delete the order!
          </h3>
          <p className="py-4">
            when you once delete a product it cant be undo.so please make sure
            you are about to delete the pending order
          </p>
          <div className="modal-action">
            <label
              onClick={() => handleDelete(id)}
              htmlFor="cancel-modal"
              className="btn btn-warning"
            >
              Delete
            </label>
            <label htmlFor="cancel-modal" className="btn">
              Close
            </label>
          </div>
        </div>
      </div>

      <input type="checkbox" id="trans-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="trans-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">Your Transaction Id</h3>
          <p className="py-4 text-orange-600 font-bold">{transId}</p>
        </div>
      </div>
      <PageTitle title={"Your-orders"}></PageTitle>
    </>
  );
};

export default MyOrder;
