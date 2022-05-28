import React from "react";
// import "./Loading.css";
import loading from "../../images/loader/bird-loading.gif";
const Loading = () => {
  return (
    <div className="loading flex items-center justify-center h-screen">
      <img src={loading} alt="" />
    </div>
  );
};

export default Loading;
