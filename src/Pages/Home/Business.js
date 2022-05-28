import React from "react";
import background from "../../images/background/footer.png";
import { AiOutlineFlag } from "react-icons/ai";
import { AiOutlineAppstore } from "react-icons/ai";
import { GiHumanPyramid } from "react-icons/gi";
import { FaThumbsUp } from "react-icons/fa";

const Business = () => {
  const style = { fontSize: "60px", color: "#19D3AE", marginBottom: "30px" };
  return (
    <>
      <section
        style={{
          background: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h1 className="text-4xl font-bold mb-5 mt-5 text-center text-[#04C8A4]">
          MILLIONS BUSINESS TRUST US
        </h1>
        <p className="text-center font-bold text-xl">
          TRY TO UNDERSTAND USERS EXPECTATION
        </p>
        <div className=" grid md:grid-cols-4 md:grid-cols-4 sm:grid-cols-1 gap-5 items-center  ml-24 py-40">
          <div>
            <AiOutlineFlag style={style}></AiOutlineFlag>
            <h1 className="text-5xl font-bold mb-2"> 80 +</h1>
            <p>
              <small className="text-[#19D3AE] font-sans text-lg">
                Countrys
              </small>
            </p>
          </div>
          <div>
            <AiOutlineAppstore style={style}></AiOutlineAppstore>
            <h1 className="text-5xl font-bold mb-2"> 600 +</h1>
            <p>
              <small className="text-[#19D3AE] font-sans text-lg">
                Complete Project
              </small>
            </p>
          </div>
          <div>
            <GiHumanPyramid style={style}></GiHumanPyramid>
            <h1 className="text-5xl font-bold mb-2"> 1000 +</h1>
            <p>
              <small className="text-[#19D3AE] font-sans text-lg">
                Happy Clients
              </small>
            </p>
          </div>
          <div>
            <FaThumbsUp style={style}></FaThumbsUp>
            <h1 className="text-5xl font-bold mb-2"> 850 +</h1>
            <p>
              <small className="text-[#19D3AE] font-sans text-lg">
                Feedbacks
              </small>
            </p>
          </div>
          <div className=" w-[70%] mx-auto mt-10 lg:block sm:hidden">
            <div
              style={{ boxShadow: "5px 5px 8px #19D3AE" }}
              className="card w-[950px] bg-base-100  mx-auto"
            >
              <div className="card-body">
                <h2 className="card-title text-[#19D3AE] text-3xl">
                  Have any question about us or get <br />a product request?
                </h2>
                <p>Dont hasitate to get in touch with us</p>
                <div className="card-actions justify-end">
                  <div className="grid grid-cols-2 gap-5">
                    <button className="btn bg-[#19D3AE] border-none hover:bg-[#19D3AE]">
                      Request For Join
                    </button>
                    <button className="btn bg-black ">Contact Us</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Business;
