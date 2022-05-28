import React from "react";
import { useQuery } from "react-query";
import Loading from "../Shared/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import wallbackground from "../../images/background/wallbackground.avif";
const MoreTools = () => {
  const {
    data: tools,
    isLoading,
    error,
    refetch,
  } = useQuery("/moretools", () =>
    fetch("http://localhost:5000/tools").then((res) => res.json())
  );
  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <>
      <section
        style={{
          background: `url(${wallbackground})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
        className="min-h-screen grid grid-cols-1 items-center "
      >
        <h1 className="text-4xl font-bold text-center">More To Watch</h1>
        <div className="w-[90%] mx-auto">
          {
            <Swiper
              navigation={true}
              spaceBetween={50}
              slidesPerView={3}
              onSlideChange={() => console.log("slide change")}
              onSwiper={(swiper) => console.log(swiper)}
              modules={[Navigation]}
              className="mySwiper"
            >
              {tools.map((tool) => (
                <SwiperSlide>
                  <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure>
                      <img className="h-60" src={tool.img} alt="Shoes" />
                    </figure>
                    <div className="card-body">
                      <h2 className="card-title">{tool.name}</h2>
                      <p>{tool.Description.slice(0, 150)}</p>
                      <div className="card-actions justify-end"></div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          }
        </div>
      </section>
    </>
  );
};

export default MoreTools;
