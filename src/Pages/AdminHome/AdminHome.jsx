import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import useAdmin from "../../Authentication/useAdmin/useAdmin";
import useAuth from "../../Authentication/useAuth/useAuth";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";

const AdminHome = ({ userInfo, setUserInfo }) => {
  const { user, loading, setLoading } = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [isAdmin] = useAdmin();
  const [stats, setStats] = useState({});

  // Fetch user data by email when component mounts
  useEffect(() => {
    if (user && user?.email && isAdmin) {
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
    } else {
      // If no user or email, reset the profile data
      setUserInfo({});
    }
  }, [user, setUserInfo]);

  // stats data load
  useEffect(() => {
    axiosSecure
      .get(`/admin-stats`)
      .then((response) => {
        setStats(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <Helmet>
        <title> AdminHome </title>
      </Helmet>
      <br />
      {/* profile */}
      <div
        className="container mx-auto mt-10 mb-10"
        style={{ backgroundColor: "#FFFFFF", minHeight: "50vh" }}
      >
        <div
          className="p-4 flex justify-between"
          style={{ backgroundColor: "#016A4E" }}
        >
          <h1 className="lg:text-lg md:text-lg text-sm text-white font-bold">
            এডমিন প্রোফাইল 
          </h1>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 p-6">
          {/* Profile Image */}
          <div className="mb-6">
            <img
              className="mb-2 w-[200px] h-[200px] rounded-full object-cover"
              src={userInfo?.img || "https://via.placeholder.com/200"}
              alt="Avatar"
            />
            <Link className="text-sm" to={`/userhome/update/${userInfo?._id}`}>
              <span style={{ color: "#016A4E", fontWeight: "bold" }}>
                আপডেট প্রোফাইল
              </span>
            </Link>
          </div>

          {/* User Information */}
          <div className=" lg:text-lg md:text-lg text-sm ">
            <p className="mb-4 flex">
              <span className="font-bold pr-3">ওয়েব আইডি: </span>
              {userInfo?._id || "N/A"}
            </p>
            <p className="mb-4 flex">
              <span className="font-bold pr-3">নাম: </span>
              {userInfo?.name || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">এড্রেস: </span>
              {userInfo?.address || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">এনআইডি: </span>
              {userInfo?.nid || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">ইমেইল: </span>
              {userInfo?.email || "N/A"}
            </p>
            <p className="mb-4">
              <span className="font-bold pr-3">ইউজার রোল: </span> <span style={{color: "green"}} className="font-bold " > {userInfo?.role || 'user' } </span> 
            </p>
          </div>
        </div>
      </div>

      {/* admin stats */}
      <div className="container mx-auto mt-10">
        <div style={{ backgroundColor: "#FFFFFF" }} className="p-3">
          <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-5 mt-5">
            স্ট্যাটিস্টিক্স 
          </h1>
          <div>
            <p className="mb-3"> <span className="font-bold">মোট হটলাইন নাম্বার: </span> {stats.hotline}</p>
            <p className="mb-3"> <span className="font-bold">মোট ইউজার সংখ্যা: </span> {stats.users} </p>
            <p className="mb-3"> <span className="font-bold">মোট রিভিউ সংখ্যা: </span> {stats.reviews} </p>
            <p className="mb-3"> <span className="font-bold">মোট হোমরিভিউ সংখ্যা: </span> {stats.homereview} </p>
            <p className="mb-3"> <span className="font-bold">মোট অভিযোগ সংখ্যা: </span> {stats.complains} </p> 
          </div>

        </div>
      </div>
      <br />
    </div>
  );
};

export default AdminHome;