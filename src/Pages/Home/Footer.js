import React from "react";
import { FaRegCopyright } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="h-72 mt-32 bg-[#00008B]">
      <h1 className=" text-4xl font-bold text-center text-white pt-10">
        Bit & Bytes
      </h1>
      <p className="text-white flex items-center mr-10 justify-center mt-44">
        copyright{" "}
        <span className="mr-2">
          <FaRegCopyright></FaRegCopyright>
        </span>
        {new Date().getFullYear()} <span className="ml-2">Bit & Bytes</span>
      </p>
    </div>
  );
};

export default Footer;
