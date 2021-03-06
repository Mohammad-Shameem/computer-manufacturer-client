import React from "react";
import "./Button .css";

const Button = ({ children }) => {
  return <button className="button btn ">{children}</button>;
};

export default Button;
