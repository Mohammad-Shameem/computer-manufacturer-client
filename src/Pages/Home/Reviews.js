import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/reviews")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      <section className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-8 px-10 gap-5 ">
        {reviews.map((review) => (
          <div key={review._id} className="card w-96 bg-base-100 shadow-xl ">
            <figure>
              {" "}
              <div className="avatar">
                <div className="w-24 mask mask-squircle">
                  {review.img && <img src={review.img} />}
                </div>
              </div>
            </figure>
            <div className="card-body">
              <h2 className="card-title justify-center">{review.name}</h2>
              <p>{review.review.slice(0, 210)}...</p>
              <div className="card-actions justify-end">
                <div className="flex items-center justify-between">
                  <p className="mr-3">Rating: {review.rating}</p>
                  <div className="rating">
                    {[...Array(Math.ceil(review.rating))].map((i, index) => (
                      <input
                        key={index}
                        type="radio"
                        name="rating-2"
                        className="mask mask-star-2 bg-orange-400"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Reviews;
