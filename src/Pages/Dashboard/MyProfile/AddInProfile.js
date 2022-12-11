import React, { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
import PageTitle from "../../Shared/PageTitle/PageTitle";

const AddInProfile = () => {
  const [user] = useAuthState(auth);

  const {
    data: newUser,
    isLoading,
    error,
    refetch,
  } = useQuery(["newUser", user], () =>
    fetch(
      `https://computer-manufacturer-server.up.railway.app/user?email=${user?.email}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }

  const addInProfile = async (event) => {
    event.preventDefault();
    const education = event.target.education.value || newUser?.education;
    const address = event.target.address.value || newUser?.address;
    const social = event.target.social.value || newUser?.social;
    const number = event.target.number.value || newUser?.number;
    const updateInfo = {
      education,
      address,
      social,
      number,
    };

    fetch(
      `https://computer-manufacturer-server.up.railway.app/useraddinfo/${user.email}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateInfo),
      }
    )
      .then((res) => res.json())
      .then(async (data) => {
        if (data.acknowledged === true) {
          refetch();
          toast.success("Your Profile updated");
          event.target.reset();
        }
      });
  };

  return (
    <div className="grid lg:grid-cols-2 sm:grid-cols-1 gap-5">
      <div className=" mt-3">
        <div className="card  w-full max-w-sm shadow-2xl bg-base-100 ml-3">
          <div className="card-body">
            <h1 className="text-center text-xl font-bold">
              Add & Data in your Profile
            </h1>
            <form onSubmit={addInProfile} className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                value={user?.email}
                disabled
                type="text"
                placeholder="Field Name Here"
                className="input input-bordered"
                name="email"
              />
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                value={user?.displayName}
                disabled
                type="text"
                placeholder="Field Data Here"
                className="input input-bordered"
                name="name"
              />
              <label className="label">
                <span className="label-text">Education</span>
              </label>
              <input
                type="text"
                placeholder="Education Level"
                className="input input-bordered"
                name="education"
              />

              <label className="label">
                <span className="label-text">Address</span>
              </label>
              <input
                type="text"
                placeholder="Your location"
                className="input input-bordered"
                name="address"
              />
              <label className="label">
                <span className="label-text">Social Media Link</span>
              </label>
              <input
                type="text"
                placeholder="Any profile link"
                className="input input-bordered"
                name="social"
              />
              <label className="label">
                <span className="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                placeholder="Available phone number"
                className="input input-bordered"
                name="number"
              />
              <input
                className="btn bg-[#00008B] hover:bg-[#00008B] mt-5 "
                type="submit"
                value="Add & update"
              />
            </form>
          </div>
        </div>
      </div>
      <div className="card w-96 bg-base-100 shadow-xl h-96">
        <div className="py-3 px-3">
          <h2 className="text-center text-3xl font-bold">Your Profile</h2>

          <p className="py-3 px-3">Name: {newUser?.name}</p>
          <p className="py-3 px-3">Email: {newUser?.email}</p>
          <p className="py-3 px-3">
            Education: {newUser?.education ? newUser.education : "Not Added"}
          </p>
          <p className="py-3 px-3">
            {" "}
            Address: {newUser?.address ? newUser.address : "Not Added"}
          </p>
          <p className="py-3 px-3">
            {" "}
            Phone: {newUser?.number ? newUser.number : "Not Added"}
          </p>
        </div>
      </div>
      <PageTitle title={"Edit Profile"}></PageTitle>
    </div>
  );
};

export default AddInProfile;
