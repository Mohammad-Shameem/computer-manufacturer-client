import React, { useState, useEffect } from "react";

const useToken = (user) => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const email = user?.user?.email;
    const name = user?.user?.displayName;
    console.log(user?.user);
    const currentUser = { email: email, name: name };
    if (email && name) {
      fetch(`https://warm-cove-56009.herokuapp.com/adduser/${email}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(currentUser),
      })
        .then((res) => res.json())
        .then((data) => {
          const accessToken = data.token;
          localStorage.setItem("accesstoken", accessToken);
          setToken(accessToken);
        });
    }
  }, [user, user?.user?.email, user?.user?.displayName]);
  return [token, setToken];
};

export default useToken;
