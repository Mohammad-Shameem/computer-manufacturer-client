import React, { useEffect, useState } from "react";

const useAdmin = (user) => {
  const [admin, setAdmin] = useState(false);
  const [adminLoading, setAdminLoading] = useState(true);
  useEffect(() => {
    const email = user?.email;
    if (email) {
      fetch(
        `https://computer-manufacturer-server.up.railway.app/admin/${email}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setAdmin(data);
          setAdminLoading(false);
        });
    }
  }, [user]);
  return [admin, adminLoading];
};

export default useAdmin;
