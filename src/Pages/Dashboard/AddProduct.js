import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PageTitle from "../Shared/PageTitle/PageTitle";

const AddProduct = () => {
  const [availableQuantity, setAvailableQuantity] = useState(null);
  const [minimumOrderQuantity, setMinimumOrderQuantity] = useState(null);
  console.log("minimumOrderQuantity", minimumOrderQuantity);
  console.log("availableQuantity", availableQuantity);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const IMAGE_API_KEY = "c887fd03656f0043f32bdd71e0526efa";

  const onSubmit = (data, event) => {
    event.preventDefault();
    if (parseInt(availableQuantity) < parseInt(minimumOrderQuantity)) {
      toast.error(
        "you cant add Minimum Order Quantity than Your Product Quantity"
      );
      return;
    }

    const image = data.Image[0];
    const formData = new FormData();
    formData.append("image", image); //ekhane name ta avatar thakbe setake change kore iamge kore dite hobe,nahole iamge upload hobe na.
    const url = `https://api.imgbb.com/1/upload?key=${IMAGE_API_KEY}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          const img = result.data.url;
          const newProduct = {
            img: img,
            name: data.name,
            Description: data.product_description,
            Available_Quantity: data.product_quantity,
            Minimum_Order_Quantity: data.order_quantity,
            price: data.product_Price,
          };
          fetch(
            "https://computer-manufacturer-server.up.railway.app/addproduct",
            {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newProduct),
            }
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.acknowledged) {
                toast.success("Your order added successfully");
              }
            });
          reset();
        }
      });
  };
  return (
    <div className="h-screen">
      <h1 className="text-xl font-bold ml-5">Add Product</h1>
      <div className="w-1/2 mx-auto">
        <div className=" w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                  type="text"
                  placeholder="Product Name"
                  className="input input-bordered w-full max-w-xs"
                  autoComplete="off"
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <input
                  {...register("Image", {
                    required: {
                      value: true,
                      message: "Image is Required",
                    },
                  })}
                  type="file"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  {errors?.Image?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors?.Image?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Qunatity</span>
                </label>
                <input
                  {...register("product_quantity", {
                    required: {
                      value: true,
                      message: "Product quantity is Required",
                    },
                  })}
                  placeholder="Your proudct quantity"
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setAvailableQuantity(e.target.value)}
                />
                <label className="label">
                  {errors?.product_quantity?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors?.product_quantity?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Order Qunatity</span>
                </label>
                <input
                  {...register("order_quantity", {
                    required: {
                      value: true,
                      message: "Order qunatity is Required",
                    },
                  })}
                  placeholder="product minimum order quantity"
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                  onChange={(e) => setMinimumOrderQuantity(e.target.value)}
                />
                <label className="label">
                  {errors?.order_quantity?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors?.order_quantity?.message}
                    </span>
                  )}
                </label>
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Product Price</span>
                </label>
                <input
                  {...register("product_Price", {
                    required: {
                      value: true,
                      message: "Product price is Required",
                    },
                  })}
                  step="any"
                  placeholder="product price"
                  type="number"
                  className="input input-bordered w-full max-w-xs"
                />
                <label className="label">
                  {errors?.product_Price?.type === "required" && (
                    <span className="label-text-alt text-red-600">
                      {errors?.product_Price?.message}
                    </span>
                  )}
                </label>
              </div>
              <textarea
                {...register("product_description", {
                  required: {
                    value: true,
                    message: "Product Description is Required",
                  },
                })}
                type="text"
                className="textarea textarea-bordered mx-16"
                placeholder="Description"
              ></textarea>
              <label className="label">
                {errors?.product_description?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors?.product_description?.message}
                  </span>
                )}
              </label>

              <input
                // disabled={minimumOrderQuantity >= availableQuantity}
                className="btn w-full max-w-xs"
                type="submit"
                value={"Add"}
              />
            </form>
          </div>
        </div>
      </div>
      <PageTitle title={"Add product"}></PageTitle>
    </div>
  );
};

export default AddProduct;
