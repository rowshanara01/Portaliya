import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import axios from "axios";
import React, { useEffect, useState } from "react";

// import required modules for swiper js for carousel to see reviews
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles.css";

const ShowReview = () => {
  const [review, setReview] = useState([]);

  useEffect(() => {
    axios
      .get("https://bangladesh-complaint-portal-server.onrender.com/homereview")
      .then((response) => {
        setReview(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const myStyles = {
    itemShapes: ThinStar,
    activeFillColor: "#016A4E",
  };

  return (
    <div className="container mx-auto mt-10 mb-8">
      <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-1 ">
        আমাদের রিভিউ
      </h1>

      <div className=" px-2 ">
        <Swiper
          centeredSlides={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {review.map((refs) => (
            <div key={refs._id}>
              <SwiperSlide>
                <div className="card w-full bg-base-100 my-4 flex items-center ">
                  <div className="card-body text-black">
                    <h2 className="card-title "> Name: {refs.name} </h2>
                    <h2 className="card-title"> Email: {refs.email} </h2>
                    <p> {refs.comments} </p>
                    <Rating
                      style={{ maxWidth: 150 }}
                      itemStyles={myStyles}
                      value={refs.rating}
                      readOnly
                    />
                  </div>
                </div>
              </SwiperSlide>
            </div>
          ))}
        </Swiper>
      </div>

      <div className="text-center text-xl font-bold mt-5">
        <Link to="/reviews">
          <span style={{ color: "#016A4E" }}>সবগুলো দেখুন </span>
        </Link>
      </div>
    </div>
  );
};

export default ShowReview;
