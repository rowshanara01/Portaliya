import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuth from "../../../Authentication/useAuth/useAuth";

const MyComplain = () => {
  const { user, setUser } = useAuth();
  const [complainInfo, setComplainInfo] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // complain data load
  useEffect(() => {
    if (user && user?.email) {
      axios
        .get(
          `https://bangladesh-complaint-portal-server.onrender.com/complains?email=${user.email}`
        )
        .then((response) => {
          setComplainInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [user, refresh]);

  return (
    <div className="p-3" style={{ backgroundColor: "#FFFFFF" }}>
      <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
        মোট অভিযোগ: {complainInfo?.length}
      </h3>

      {/* show complains */}
      {complainInfo.map((complains) => (
        <div
          key={complains._id}
          className="card w-full bg-base-100 shadow-lg my-4"
        >
          <div className="card-body text-left text-black">
            <h2 className="card-title "> নাম: {complains.name} </h2>
            <h2 className="card-title"> ইমেইল: {complains.email} </h2>
            <p>
              <span className="font-bold">অভিযোগ:</span> {complains.complain}
            </p>
            <p>
              <span className="font-bold">প্রমান (যদি থাকে) লিংক:</span>
              <span>
                <a
                  style={{
                    wordBreak: "break-word",
                    overflowWrap: "break-word",
                    display: "block", // Use block for the link inside flex container
                    maxWidth: "60%",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                  href={complains.provelink}
                  target="_blank"
                >
                  {complains.provelink}
                </a>
              </span>
            </p>
            <p>
              <span className="font-bold">সমস্যার ধরন: </span>
              {complains.problem}
            </p>
            <p>
              <span className="font-bold">অভিযোগ জমা দেওয়ার তারিখ: </span>
              {complains.date}
            </p>
            <p>
              <span className="font-bold">বিভাগ: </span> {complains.division}
            </p>
            <p>
              <span className="font-bold">জেলা: </span> {complains.district}
            </p>
            <p>
              <span className="font-bold">উপজেলা: </span>
              {complains.subDistrict}
            </p>
            {/* complain status */}
            <p>
              <span className="font-bold">অভিযোগ আপডেট: </span>
              <span
                className="font-bold"
                style={{ color: complains?.status ? "green" : "black" }}
              >
                {complains?.status || "Pending"}
              </span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComplain;
