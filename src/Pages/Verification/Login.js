import React, { useEffect } from "react";
import {
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import Loading from "../Shared/Loading";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageTitle from "../Shared/PageTitle/PageTitle";
import useToken from "../Hooks/UseToken";

const Login = () => {
  const navigate = useNavigate();
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);
  const [token] = useToken(user || gUser);
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";
  let authenticaitonError;
  useEffect(() => {
    if (token) {
      navigate(from, { replace: true });
    }
  }, [token, from, navigate]);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = async (data, event) => {
    const email = data.email;
    event.target.reset();
    const password = data.password;
    await signInWithEmailAndPassword(email, password); //react hook form e alada kore reload ney na.ebong ei function ta niye ashle se input e data gulow diye dey
  };
  if (loading || gLoading) {
    return <Loading></Loading>;
  }

  if (error || gError) {
    authenticaitonError = (
      <p className="text-red-600">{error?.message || gError?.message}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 justify-items-center items-center h-screen ">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-center text-2xl font-bold ">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@+[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a Valid Email",
                  },
                })}
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full max-w-xs"
                autoComplete="off"
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-600">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>

              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "password is Required",
                  },
                  minLength: {
                    value: 8,
                    message: "your password length must be 8",
                  },
                  pattern: {
                    value:
                      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                    message:
                      "your password should contain one special character one capital letter, one number one small letter and must be 8 length",
                  },
                })}
                type="password"
                placeholder="Your Password"
                className="input input-bordered w-full max-w-xs"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "pattern" && (
                  <span className="label-text-alt text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>

            <input
              className="btn w-full max-w-xs"
              type="submit"
              value={"Login"}
            />
          </form>
          <p className="text-xs text-center">
            New to Doctors Portal?
            <span className="text-secondary ml-1">
              <Link to={"/signup"}>Create new accounte</Link>
            </span>
          </p>
          {authenticaitonError}
          <p className="text-xs text-center">
            Forgot password?{" "}
            <span
              onClick={() => navigate("/reset")}
              className="text-primary cursor-pointer"
            >
              click her to get reset link !
            </span>
          </p>
          <div className="divider w-full">OR</div>
          <button
            onClick={() => signInWithGoogle()}
            className="btn btn-outline"
          >
            CONTINUE WITH GOOGLE
          </button>
        </div>
      </div>
      <PageTitle title="Login"></PageTitle>
    </div>
  );
};

export default Login;
