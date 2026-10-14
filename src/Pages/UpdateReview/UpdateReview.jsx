import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateReview = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [updateReview, setUpdateReview] = useState(null);
  const [rating, setRating] = useState(null);
  const { id } = useParams();

  // Fetch existing review data by ID
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const response = await axios.get(
          `https://bangladesh-complaint-portal-server.onrender.com/reviews/${id}`
        );
        setUpdateReview(response.data);
        // Populate form with fetched data
        reset({
          comments: response.data.comments,
          rating: response.data.rating,
        });
      } catch (error) {
        console.error("Failed to fetch review data:", error);
      }
    };

    fetchReview();
  }, [id, reset]);

  // handle form submit
  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        `https://bangladesh-complaint-portal-server.onrender.com/reviews/${id}`,
        data
      );

      if (response.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "রিভিউ আপডেট করা হয়েছে!",
          showConfirmButton: false,
          timer: 2000,
        });
        // Reset the form after update
        useEffect(() => {
          if (updateReview) {
            reset({
              comments: updateReview.comments || "",
              rating: updateReview.rating || "",
            });
          }
        }, [updateReview, reset]);
        // update user info in reset function
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  if (!updateReview) return <p>Loading...</p>;

  return (
    <div
      style={{ backgroundColor: "#E5E5E5", minHeight: "70vh" }}
      className="p-3"
    >
      <Helmet>
        <title> Update Review </title>
      </Helmet>
      <br />
      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg"> রিভিউ আপডেট করুন </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার নাম </span>
              </label>
              <input
                type="text"
                placeholder="নাম"
                className="input input-bordered"
                name="name"
                defaultValue={updateReview.name}
                readOnly
              />
            </div>

            {/* email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার ইমেইল</span>
              </label>
              <input
                type="email"
                placeholder="ইমেইল"
                className="input input-bordered"
                name="email"
                readOnly
                defaultValue={updateReview.email}
              />
            </div>

            {/* review */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার রিভিউ</span>
              </label>
              <textarea
                className="textarea textarea-bordered h-32"
                placeholder="রিভিউ"
                {...register("comments", { required: true })}
                defaultValue={updateReview.comments}
              ></textarea>
            </div>

            {/* rating */}
            <div className="form-control rating ">
              <label className="label">
                <span className="label-text">রেটিং</span>
              </label>
              {/* Radio buttons for 5-star rating */}
              <div className="flex">
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                  defaultChecked={updateReview.rating === 1}
                />
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                  defaultChecked={updateReview.rating === 2}
                />
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                  defaultChecked={updateReview.rating === 3}
                />
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                  defaultChecked={updateReview.rating === 4}
                />
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  className="mask mask-star-2 bg-green-500"
                  {...register("rating", { required: true })}
                  defaultChecked={updateReview.rating === 5}
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
                সাবমিট করুন
              </button>
            </div>
          </form>
        </div>
      </div>

      <br />
    </div>
  );
};

export default UpdateReview;
