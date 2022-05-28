import React from "react";
import PageTitle from "./Shared/PageTitle/PageTitle";
import { useSendPasswordResetEmail } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "./Shared/Loading";
import { toast } from "react-toastify";

const ResetPass = () => {
  const [sendPasswordResetEmail, sending, error] =
    useSendPasswordResetEmail(auth);
  const handlePasswordReset = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    await sendPasswordResetEmail(email);
    await toast.success("Password reset mail has been sent");
    event.target.value = "";
  };
  if (sending) {
    return <Loading></Loading>;
  }
  if (error) {
    toast.error(error);
  }
  return (
    <>
      <div className="flex justify-center mt-20">
        <div className="card  w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form className="form-control" onSubmit={handlePasswordReset}>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                required
                type="email"
                placeholder="Email here"
                className="input input-bordered"
                name="email"
              />
              <input
                className="btn bg-[#00008B] hover:bg-[#00008B] mt-5 "
                type="submit"
                value="Reset Password"
              />
            </form>
          </div>
        </div>
      </div>
      <PageTitle title="Reset password"></PageTitle>
    </>
  );
};

export default ResetPass;
