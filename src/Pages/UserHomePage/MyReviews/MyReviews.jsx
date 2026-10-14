import { Rating, ThinStar } from "@smastrom/react-rating";
import axios from "axios";
import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Authentication/useAuth/useAuth";

const MyReviews = () => {
  const { user, setUser } = useAuth();
  const [reviewInfo, setReviewInfo] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a state to trigger data reload

  //  for fetch data load
  useEffect(() => {
    if (user && user.email) {
      axios
        .get(
          `https://bangladesh-complaint-portal-server.onrender.com/reviews?email=${user.email}`
        )
        .then((response) => {
          setReviewInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user, refresh]);

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
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "রিভিউ ডিলেট করা হয়েছে!",
                showConfirmButton: false,
                timer: 1500,
              });
              // Trigger a refresh by toggling the 'refresh' state
              setRefresh((prev) => !prev);
            }
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "রিভিউ ডিলেট করা সম্ভব হয় নি",
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
    <div className="p-3 " style={{ backgroundColor: "#FFFFFF" }}>
      <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
        মোট রিভিউ: {reviewInfo?.length}
      </h3>

      {/* show reviews */}
      {reviewInfo.map((refs) => (
        <div key={refs._id} className="card w-full bg-base-100 shadow-lg my-4">
          <div className="card-body text-left text-black">
            <h2 className="card-title "> নাম: {refs.name} </h2>
            <h2 className="card-title"> ইমেইল: {refs.email} </h2>
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

            <div className="flex gap-5">
              {/* delete btn */}
              <Button
                className="w-16 mt-2"
                color="gray"
                onClick={() => handleDeleteReview(refs)}
                style={{ backgroundColor: "red", color: "white" }}
              >
                <FaTrashAlt></FaTrashAlt>
              </Button>

              {/* edit */}
              <Link to={`/userhome/review/${refs._id}`}>
                <Button
                  className="w-16 mt-2"
                  color="gray"
                  style={{ backgroundColor: "#016A4E", color: "white" }}
                >
                  <FaEdit />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyReviews;
