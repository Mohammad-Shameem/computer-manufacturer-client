import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../Shared/Button/Button";

const Tool = ({ tool }) => {
  const {
    img,
    name,
    Description,
    price,
    Available_Quantity,
    Minimum_Order_Quantity,
    _id,
  } = tool;
  const buttonAnimation = {
    initial: {
      opacity: 0,
      x: 300,
    },
    whileInView: {
      x: 0,
      opacity: 1,
    },
    transition: {
      duration: 1,
    },
  };
  const Divanimation = {
    imageAnimation: {
      initial: {
        opacity: 0,
        y: 300,
      },
      whileInView: {
        opacity: 1,
        y: 0,
      },
      transition: { duration: 1 },
    },
  };
  return (
    <div className="w-[90%] mx-auto">
      <div className="hero mb-20">
        <div className=" grid md:grid-cols-2 lg:grid-cols-2 items-center sm:grid-cols-1  ">
          <motion.div {...Divanimation.imageAnimation}>
            <div>
              <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                  <figure>
                    <img className="h-[280px]" src={img} alt="" />
                  </figure>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="shadow-lg py-5 px-5 flex flex-col ">
            <div>
              <h1 className="text-3xl font-bold">{name}</h1>
              <p className="py-6">{Description.slice(0, 250)}</p>
              <p>
                Quantity :{" "}
                <span className="text-[#00008B] font-bold">
                  {" "}
                  {Available_Quantity}
                </span>
              </p>
              <p>
                Minimum Order Quantity :{" "}
                <span className="text-[#00008B] font-bold">
                  {" "}
                  {Minimum_Order_Quantity}
                </span>
              </p>
              <p>
                Price :{" "}
                <span className="text-[#00008B] font-bold"> $ {price}</span>
              </p>
              <motion.div {...buttonAnimation}>
                <div className="w-1/2 mx-auto">
                  <Link to={`/purchase/${_id}`}>
                    <Button>Buy Now</Button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tool;
