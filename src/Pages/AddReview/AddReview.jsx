import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { IoCloudDone } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../Authentication/useAuth/useAuth";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";

const AddReview = ({ userInfo, setUserInfo }) => {
  const { register, handleSubmit, reset } = useForm();
  const [rating, setRating] = useState(null);
  const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [axiosSecure] = useAxiosSecure();

  // load single user by email
  useEffect(() => {
    if (user && user?.email) {
      axiosSecure
        .get(`/users?email=${user?.email}`)
        .then((response) => {
          if (response.data.length > 0) {
            setUserInfo(response.data[0]); // user data is in the first index
          }
        })
        .catch((err) => {
          console.error("Failed to fetch user data:", err);
          setUserInfo({}); // If there's an error, keep userInfo as an empty object
        })
        .finally(() => {
          setLoading(false); // Set loading to false after fetching
        });
    }
  }, [user, setUserInfo]);

  // add review
  const onSubmit = (data) => {
    const formData = new FormData();
    const { name, email, comments, rating } = data;
    axios
      .post(
        "https://bangladesh-complaint-portal-server.onrender.com/reviews",
        data
      )
      .then((data) => {
        if (data.data.insertedId) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "রিভিউ দেওয়ার জন্য ধন্যবাদ",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <Helmet>
        <title> Post Review </title>
      </Helmet>
      <br />

      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg">
            {" "}
            আপনার রিভিউ দিন যাতে আমরা আমাদের সেবার মান আরও উন্নত করতে পারি{" "}
          </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">নাম</span>
              </label>
              <input
                type="text"
                placeholder="নাম"
                className="input input-bordered"
                name="name"
                defaultValue={userInfo?.name}
                readOnly
                {...register("name", { required: true })}
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="ইমেইল"
                className="input input-bordered"
                name="email"
                defaultValue={userInfo?.email}
                readOnly
                {...register("email", { required: true })}
              />
            </div>

            {/* review */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার রিভিউ </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="রিভিউ"
                name="comments"
                {...register("comments", { required: true })}
                required
              ></textarea>
            </div>

            {/* rating */}
            <div className="form-control rating ">
              <label className="label">
                <span className="label-text">আপনার রেটিং</span>
              </label>
              {/* Radio buttons for 5-star rating */}
              <div className="flex">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                />
              </div>
            </div>

            {/* sign up button */}
            <div className="form-control mt-6">
              <button
                className="btn "
                style={{
                  backgroundColor: "#016A4E",
                  color: "white",
                  fontStyle: "bold",
                }}
              >
                <span className="flex gap-4">
                  {" "}
                  <IoCloudDone /> সাবমিট করুন{" "}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
    </div>
  );
};

export default AddReview;
