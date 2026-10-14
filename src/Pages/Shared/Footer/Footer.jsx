import React from "react";
import pics1 from "../../../assets/logo/cabinet.png";
import pics3 from "../../../assets/logo/gov.png";
import pics2 from "../../../assets/logo/ict.png";
import "./Footer.css";
import useAuth from "../../../Authentication/useAuth/useAuth";

const Footer = () => {
  const { user } = useAuth();

  return (
    <div style={{ backgroundColor: "#FFFFFF" }}>
      <hr style={{ borderWidth: "5px" }} />
      <div className="footer-center">
        {/* 1st part */}
        <footer className="footer p-8 text-left">
          <aside>
            <p style={{ fontSize: "16px" }}> অন্যান্য সরকারি ওয়েবসাইট </p>
            <div className="grid grid-flow-col gap-4">
              {/* 1 ict */}
              <a href="https://ictd.gov.bd/" target="_blank">
                <img src={pics2} className="imgSize" alt="" />
              </a>
              {/* 2 cabinet */}
              <a href="https://cabinet.gov.bd/" target="_blank">
                <img src={pics1} className="imgSize" alt="" />
              </a>
              {/* 3 mygov */}
              <a href="https://www.mygov.bd/" target="_blank">
                <img src={pics3} className="imgSize" alt="" />
              </a>
            </div>
            <p style={{ color: "#05694E", fontWeight: "bold" }}>
              ইমেইল: {user?.email && user.email}
            </p>
          </aside>
          {/* logos */}
          <nav>
            <h6 style={{ fontWeight: "bold" }}>
              যোগাযোগ <br /> support@demo.com
            </h6>
            <h6 className="footer-title " style={{ fontWeight: "bold" }}>
              সাথে থাকুন
            </h6>
            <div className="grid grid-flow-col gap-4">
              {/* twitter */}
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                </svg>
              </a>
              {/* youtube */}
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                </svg>
              </a>
              {/* facebook */}
              <a>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
        </footer>

        {/* 2nd part */}
        <aside className="mb-2 px-4">
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by
            Abdur Rashid Sawom
          </p>
        </aside>
      </div>
    </div>
  );
};

export default Footer;
