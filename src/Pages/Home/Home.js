import React from "react";
import PageTitle from "../Shared/PageTitle/PageTitle";
import Banner from "./Banner";
import Business from "./Business";
import Footer from "./Footer";
import MoreTools from "./MoreTools";
import Reviews from "./Reviews";
import Tools from "./Tools";

const Home = () => {
  return (
    <div>
      <PageTitle title={"Home"}></PageTitle>
      <Banner></Banner>
      <Tools></Tools>
      <MoreTools></MoreTools>
      <Business></Business>
      <Reviews></Reviews>
      <Footer></Footer>
    </div>
  );
};

export default Home;
