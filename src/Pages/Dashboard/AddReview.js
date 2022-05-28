import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { toast } from "react-toastify";
import auth from "../../firebase.init";
import PageTitle from "../Shared/PageTitle/PageTitle";

const AddReview = () => {
  const [user] = useAuthState(auth);
  const [ratingsNumber, setRatingsNumber] = useState(1);
  const addReview = async (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const rating = event.target.number.value;
    const review = event.target.review.value;
    console.log(name, email, rating, review);
    const customerReview = {
      name: name,
      email: email,
      rating: rating,
      review: review,
    };
    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(customerReview),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          toast.success("Your review has been stored");
        }
      });
    event.target.reset();
  };

  return (
    <div>
      <form onSubmit={addReview} className="form-control w-1/2 mx-auto">
        <label className="label">
          <span className="label-text">Name</span>
        </label>
        <input
          value={user?.displayName}
          className="input input-bordered"
          name="name"
          disabled
        />
        <label className="label">
          <span className="label-text">Email</span>
        </label>
        <input
          value={user?.email}
          disabled
          className="input input-bordered"
          name="email"
        />
        <label className="label">
          <span className="label-text">Rating Number</span>
        </label>
        <input
          onChange={(e) => setRatingsNumber(e.target.value)}
          required
          type="number"
          placeholder="your Ratings Number"
          className="input input-bordered"
          name="number"
        />
        {ratingsNumber > 5 || ratingsNumber < 1 ? (
          <p className="font-xs text-red-600">
            your ratings number must be in 1-5
          </p>
        ) : (
          ""
        )}

        <input
          name="review"
          required
          type="text"
          placeholder="About Our Products"
          className="input input-bordered input-lg w-full h-40 max-w-xs mx-auto mt-5"
          autoComplete="off"
        />
        <input
          disabled={ratingsNumber > 5 || ratingsNumber < 1}
          className="btn bg-[#00008B] hover:bg-[#00008B] mt-5 w-1/2 mx-auto"
          type="submit"
          value="Add Review"
        />
      </form>
      <PageTitle title={"review"}></PageTitle>
    </div>
  );
};

export default AddReview;
