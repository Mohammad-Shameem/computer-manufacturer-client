import React from "react";

const MyPortfolio = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5 mb-5">My Portfolio</h1>
      <div className=" min-h-screen flex items-center justify-center">
        <div class="card w-[550px] bg-base-100 shadow-xl">
          <div class="card-body">
            <h2 class=" text-2xl font-bold text-center">Assalamualaikum</h2>
            <p>
              My name is Mohammad Shameem.I am 21 years old. I am doing Honours
              in Noakhali University on chemistry. I am in First year of my 4
              year course. Beside my study i passionately want to be a
              good,skilled web developer. And am trying hard for achieve my goal
              and i am confident that i will achieve my goal one day INSHA
              ALLAH. As a junior web developer i know,
              html,css,javascript,bootstrap,tailwind css,React for the fontend.
              For the backend i use Node.js and for database mongodb atlas.This
              some technologys i know. And i am trying hard my best to learn
              more and more and new technologies about web development and gain
              core,deep knwoledge about web development. Keep me in your Prayer.{" "}
              <br />
              My email address:{" "}
              <span className="font-bold text-orange-600">
                mehmetsaki789@gmail.com
              </span>{" "}
              <br />
            </p>
            <p>Here is some of my projects :</p>
            <li> doctors-portal-fea8c.firebaseapp.com</li>
            <li> zoho-inventory-40590.firebaseapp.com</li>
            <li>dentist-hameem.firebaseapp.com</li>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPortfolio;
