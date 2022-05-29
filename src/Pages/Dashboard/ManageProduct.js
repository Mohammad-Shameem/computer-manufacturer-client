import React, { useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";
const ManageProduct = () => {
  const [productId, setProductId] = useState(null);
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useQuery("tools", () =>
    fetch(`https://warm-cove-56009.herokuapp.com/alltools`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    }).then((res) => res.json())
  );
  const handleProductDelete = (productId) => {
    fetch(`https://warm-cove-56009.herokuapp.com/deletetool/${productId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("product Delete successfully");
          refetch();
        }
      });
  };
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5 mb-5">
        Manage product
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{product.name}</td>
                <td>{product.Available_Quantity}</td>
                <td>
                  <label
                    onClick={() => setProductId(product._id)}
                    htmlFor="delete-modal"
                    className="btn btn-warning"
                  >
                    Delete
                  </label>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <input type="checkbox" id="delete-modal" className="modal-toggle" />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Are you sure to Delete the product?
          </h3>
          <p className="py-4">
            when you once delete a product it cant be undo.so please make sure
            you are about to delete the product.
          </p>
          <div className="modal-action">
            <label
              onClick={() => handleProductDelete(productId)}
              htmlFor="delete-modal"
              className="btn btn-warning"
            >
              Delete
            </label>
            <label htmlFor="delete-modal" className="btn">
              Cancel
            </label>
          </div>
        </div>
      </div>
      <PageTitle title={"manage-products"}></PageTitle>
    </div>
  );
};

export default ManageProduct;
