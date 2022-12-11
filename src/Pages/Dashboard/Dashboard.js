import React from "react";
import { Link, Outlet } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";
const Dashboard = () => {
  const [user] = useAuthState(auth);
  const {
    data: newUser,
    isLoading,
    error,
    refetch,
  } = useQuery(["newuser", user], () =>
    fetch(
      `https://computer-manufacturer-server.up.railway.app/user?email=${user?.email}`
    ).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="drawer drawer-mobile">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content  justify-center">
        <h1 className="text-3xl font-bold text-center mt-3">Dashboard</h1>
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>
      <div className="drawer-side shadow-xl ">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to="/dashboard">My Profile</Link>
          </li>
          {newUser?.role ? (
            <>
              <li>
                <Link to="/dashboard/allorders">Manage All Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addproduct">Add a Product</Link>
              </li>
              <li>
                <Link to="/dashboard/manageproduct">Manage Product</Link>
              </li>
              <li>
                <Link to="/dashboard/makeadmin">Make Admin</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/dashboard/myorder">My Orders</Link>
              </li>
              <li>
                <Link to="/dashboard/addreview">Add Review</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <PageTitle title={"Dashboard"}></PageTitle>
    </div>
  );
};

export default Dashboard;
