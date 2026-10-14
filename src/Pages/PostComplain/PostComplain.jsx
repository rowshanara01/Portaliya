import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Controller, useForm } from "react-hook-form";
import { IoCloudDone } from "react-icons/io5";
import Swal from "sweetalert2";
import useAuth from "../../Authentication/useAuth/useAuth";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";
import { divisionsData, problemCategory } from "./bdData";

const PostComplain = ({ userInfo, setUserInfo }) => {
  const { handleSubmit, control, watch, register, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();

  // Watch for the changes in division and district fields
  const watchDivision = watch("division");
  const watchDistrict = watch("district");

  // watch problem category
  const watchProblem = watch("category");

  const { user } = useAuth();
  // const [userInfo, setUserInfo] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Get the selected division and district data dynamically
  const selectedDivisionData = divisionsData.find(
    (div) => div.division === watchDivision
  );
  const selectedDistrictData = selectedDivisionData?.district.find(
    (dist) => dist.districtname === watchDistrict
  );

  // get problem category
  const probCategory = problemCategory.find(
    (problems) => problems.category === watchProblem
  );

  // form submit
  // before submit I show a message because in future user can not delete this.
  const onSubmit = (data) => {
    console.log("Selected Data:", data);

    Swal.fire({
      title: "আপনি কি নিশ্চিত ?",
      text: "আপনি অভিযোগটি ডিলেট অথবা ইডিট করতে পারবেন না। পুনরায় চেক করুন",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ক্যানসেল",
      confirmButtonText: "হ্যাঁ, নিশ্চিত!",
    }).then((result) => {
      if (result.isConfirmed) {
        const formData = new FormData();
        const {
          name,
          email,
          problem,
          division,
          district,
          subDistrict,
          complain,
          provelink,
          date,
        } = data;
        axios
          .post(
            "https://bangladesh-complaint-portal-server.onrender.com/complains",
            data
          )
          .then((data) => {
            if (data.data.insertedId) {
              reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                text: "ধন্যবাদ! আপনার অভিযোগ গ্রহণ করা হলো",
                showConfirmButton: false,
                timer: 2000,
              });
            }
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
        <title> Your Complain? </title>
      </Helmet>
      <br />
      <div className="container mx-auto mt-4 mb-4 flex justify-center items-center">
        {/* update form */}
        <div
          className="card w-full max-w-lg shrink-0 p-5 "
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h2 className="text-lg"> আপনার অভিযোগ কি? আমাদের জানান </h2>
          <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
            {/* name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার নাম*</span>
              </label>
              <input
                type="text"
                placeholder="name"
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
                <span className="label-text">আপনার ইমেইল*</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                name="email"
                defaultValue={userInfo?.email}
                readOnly
                {...register("email", { required: true })}
              />
            </div>

            {/* problem category input */}
            <div>
              <label>সমস্যার ধরন* </label>
              <div>
                <Controller
                  name="problem"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">সমস্যার ধরন সিলেক্ট করুন</option>
                      {problemCategory.map((problems, idx) => (
                        <option key={idx} value={problems.category}>
                          {problems.category}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>

            {/* Division Input */}
            <div>
              <label>বিভাগ* </label>
              <div>
                <Controller
                  name="division"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <select
                      {...field}
                      style={{
                        outline: "none",
                        border: "2px solid #7E7E7E",
                        padding: "10px",
                        borderRadius: "4px",
                        width: "100%",
                        backgroundColor: "white",
                        color: "black",
                        transition: "border-color 0.5s ease",
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = "grey";
                        e.target.style.boxShadow = "none";
                      }}
                    >
                      <option value="">বিভাগ নির্বাচন করুন</option>
                      {divisionsData.map((division, idx) => (
                        <option key={idx} value={division.division}>
                          {division.division}
                        </option>
                      ))}
                    </select>
                  )}
                />
              </div>
            </div>

            {/* District Input */}
            <div>
              <label>জেলা* (প্রথমে বিভাগ নির্বাচন করুন) </label>
              {watchDivision && (
                <div>
                  <Controller
                    name="district"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          outline: "none",
                          border: "2px solid #7E7E7E",
                          padding: "10px",
                          borderRadius: "4px",
                          width: "100%",
                          backgroundColor: "white",
                          color: "black",
                          transition: "border-color 0.5s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">জেলা নির্বাচন করুন</option>
                        {selectedDivisionData?.district.map((district, idx) => (
                          <option key={idx} value={district.districtname}>
                            {district.districtname}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* sub district */}
            <div>
              <label>উপজেলা* (প্রথমে জেলা নির্বাচন করুন) </label>
              {watchDistrict && (
                <div>
                  <Controller
                    name="subDistrict"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        style={{
                          outline: "none",
                          border: "2px solid #7E7E7E",
                          padding: "10px",
                          borderRadius: "4px",
                          width: "100%",
                          backgroundColor: "white",
                          color: "black",
                          transition: "border-color 0.5s ease",
                        }}
                        onFocus={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                        onBlur={(e) => {
                          e.target.style.borderColor = "grey";
                          e.target.style.boxShadow = "none";
                        }}
                      >
                        <option value="">উপজেলা নির্বাচন করুন</option>
                        {selectedDistrictData?.subdistrict.map(
                          (subDistrict, idx) => (
                            <option key={idx} value={subDistrict}>
                              {subDistrict}
                            </option>
                          )
                        )}
                      </select>
                    )}
                  />
                </div>
              )}
            </div>

            {/* complain */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">আপনার অভিযোগ জানান* </span>
              </label>
              <textarea
                className="textarea textarea-bordered h-36"
                name="complain"
                placeholder="আপনার সমস্যা বাংলায় অথবা ইংরেজিতে লিখুন। বাংলিশ গ্রহনযোগ্য নয়। "
                required
                {...register("complain", { required: true })}
              ></textarea>
            </div>

            {/* prove */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">
                  প্রমান (যদি থাকে) লিংক* <br />
                  প্রমান হতে পারে কোন ছবি, ভিডিও। আপনার গুগল ড্রাইভে আপলোড করে
                  সেই লিংক বক্সে শেয়ার করুন।
                </span>
              </label>
              <input
                type="text"
                placeholder="গুগল ড্রাইভ লিংক"
                className="input input-bordered"
                name="provelink"
                required
                {...register("provelink", { required: true })}
              />
            </div>

            {/* date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">তারিখ* </span>
              </label>
              {/* Controller for Date Input */}
              <Controller
                name="date" // The name of the form field
                control={control} // React Hook Form's control
                defaultValue="" // Default value for the date
                render={({ field }) => (
                  <input
                    type="date"
                    className="input input-bordered"
                    {...field} // This links the input with the form control
                    placeholder="Select a date"
                  />
                )}
              />
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

export default PostComplain;
