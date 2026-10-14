import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";

const ManageReview = () => {
  const [reviews, setReview] = useState([]);

  // pagination
  const [totalReview, setTotalReview] = useState(0); // Total number of results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1);
  const limit = 20;

  //  load all review initially for pagination
  const fetchReviews = async (page = 1) => {
    try {
      // Include page and limit parameters and limit per page data in the request
      const response = await axios.get(
        `https://bangladesh-complaint-portal-server.onrender.com/reviews?page=${page}&limit=${limit}`
      );
      setReview(response.data.reviews); // collect user data
      // handle pagination data as well
      setTotalReview(response.data.totalReview);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // for refetch data load
  useEffect(() => {
    fetchReviews();
  }, []); // do not use dependent. if use pagination does not work.

  // Function to handle page change
  const handlePageChange = (page) => {
    fetchReviews(page); // Fetch users for the selected page
  };

  // delete review
  const handleDeleteReview = (review) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত ?",
      text: "আপনি এটিকে ফিরিয়ে আনতে পারবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ক্যানসেল",
      confirmButtonText: "হ্যাঁ, ডিলেট করুন!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform Axios delete operation
        axios
          .delete(
            `https://bangladesh-complaint-portal-server.onrender.com/reviews/${review._id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // refetch data load
              fetchReviews();
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "রিভিউ ডিলেট করা হয়েছে!",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "রিভিউ ডিলেট করা সম্ভব হয় নি|",
              showConfirmButton: false,
              timer: 1500,
            });
          });
      }
    });
  };

  // style for review star
  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <Helmet>
        <title> Manage Review </title>
      </Helmet>
      <br />
      <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
        <br />

        <div
          className=" container mx-auto p-3"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
            মোট রিভিউ: {totalReview}
          </h3>
          {/* show reviews */}
          {reviews.map((refs) => (
            <div
              key={refs._id}
              className="card w-full bg-base-100 shadow-xl my-4"
            >
              <div className="card-body text-left text-black">
                <p className="card-title "> নাম: {refs.name} </p>
                <p>
                  {" "}
                  <span className="font-bold">ইমেইল: </span> {refs.email}{" "}
                </p>
                <p>
                  {" "}
                  <span className="font-bold">রিভিউ: </span> {refs.comments}{" "}
                </p>
                <Rating
                  style={{ maxWidth: 150 }}
                  itemStyles={myStyles}
                  value={refs.rating}
                  readOnly
                />
                {/* delete btn */}
                <Button
                  className="w-16 mt-2"
                  onClick={() => handleDeleteReview(refs)}
                  color="gray"
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  <FaTrashAlt></FaTrashAlt>
                </Button>
              </div>
            </div>
          ))}

          {/* pagination control button */}
          <div className="flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`mx-1 ${
                  currentPage === index + 1
                    ? "bg-green-600 text-white"
                    : "bg-gray-500"
                }`}
              >
                {index + 1}
              </Button>
            ))}
          </div>
        </div>

        <br />
      </div>

      <br />
    </div>
  );
};

export default ManageReview;
