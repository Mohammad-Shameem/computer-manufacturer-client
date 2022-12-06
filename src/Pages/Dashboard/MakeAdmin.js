import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../Shared/Loading";
import PageTitle from "../Shared/PageTitle/PageTitle";

const MakeAdmin = () => {
  // const [users, setUser] = useState([]);
  // useEffect(() => {
  //   fetch("http://localhost:5000/alluser")
  //     .then((res) => res.json())
  //     .then((data) => setUser(data));
  // }, []);
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("userAdmin", () =>
    fetch("http://localhost:5000/alluser", {
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    }).then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  const makeAdmin = (email) => {
    fetch(`http://localhost:5000/user/admin/${email}`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount) {
          toast.success("You have maden a new Admin");
          refetch();
        }
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {!user?.role ? (
                    <button
                      onClick={() => makeAdmin(user.email)}
                      className="btn"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <p className=" btn ">Admin</p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PageTitle title={"make-admin"}></PageTitle>
    </div>
  );
};

export default MakeAdmin;
