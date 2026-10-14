import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Reviews = () => {
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
  }, []);

  // Function to handle page change
  const handlePageChange = (page) => {
    fetchReviews(page); // Fetch users for the selected page
  };

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div style={{ backgroundColor: "#E5E5E5" }} className="p-3">
      <Helmet>
        <title> Reviews </title>
      </Helmet>
      <br />

      <div
        className="container mx-auto p-3"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          মোট রিভিউ: {totalReview}
        </h3>
        {/* show reviews */}
        {reviews.map((refs) => (
          <div
            key={reviews._id}
            className="card w-full bg-base-100 shadow-xl my-4"
          >
            <div className="card-body text-left text-black">
              <h2 className="card-title "> নাম: {refs.name} </h2>
              <h2 className="card-title"> ইমেইল: {refs.email} </h2>
              <p> {refs.comments} </p>
              <Rating
                style={{ maxWidth: 150 }}
                itemStyles={myStyles}
                value={refs.rating}
                readOnly
              />
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
  );
};

export default Reviews;
