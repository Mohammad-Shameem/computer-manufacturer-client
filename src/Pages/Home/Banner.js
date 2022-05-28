import React from "react";
import { Link } from "react-router-dom";
import banner from "../../images/banner/banner.jpg";
import Button from "../Shared/Button/Button";

const Banner = () => {
  return (
    <div
      className="hero min-h-screen min-w-screen"
      style={{
        background: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-40"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold  ">Bit & Bytes</h1>
          <p className="mb-5 ">
            Hello Dear,Sir/Mam, Wellcome to our business site.We Providing the
            best service that you want,we are providing computer manufacturer
            parts tools.And each and everything product making deliver the
            product to you is done by Bit & Bytes.There is no third party so
            that you can feel insecure,and product quality issue.Feel free to
            join us to know more about us.
          </p>

          <Link to="/signup">
            <Button>Get Started</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
