import { Sidebar } from "flowbite-react";
import React, { useEffect } from "react";
import { HiTable, HiUser } from "react-icons/hi";
import { FaHome } from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { SiGoogledocs } from "react-icons/si";
import { IoLogOut,IoLogIn } from "react-icons/io5";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "../../../assets/logo/logo.png";
import useAdmin from "../../../Authentication/useAdmin/useAdmin";
import useAuth from "../../../Authentication/useAuth/useAuth";

const Header = ({ userInfo, setUserInfo }) => {
  const { user, logoutUser } = useAuth();
  const [isAdmin] = useAdmin();

  // flag get from local storage so that swal can be showed
  useEffect(() => {
    const showSwal = localStorage.getItem("showSwal");

    if (showSwal === "true") {
      // Show the Swal message after page reload
      Swal.fire({
        text: "এখন আপনি নিবন্ধিত, অভিনন্দন! আপনার ইমেল যাচাই করতে আপনার ইমেল চেক করুন",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });

      // Remove the flag from localStorage to prevent showing the message again
      localStorage.removeItem("showSwal");
    }
  }, []);

  // logout function
  const logoutFunction = () => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত ?",
      text: "আপনি সাইন আউট হবেন",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "ক্যানসেল",
      confirmButtonText: "হ্যাঁ, সাইন আউট!",
    }).then((result) => {
      if (result.isConfirmed) {
        logoutUser();
        Swal.fire("সাইন আউট!", "আপনি সাইন আউট হয়ে গেছেন", "ঠিক আছে");
      }
    });
  };

  return (
    <div className="shadow-md" style={{ backgroundColor: "#FFFFFF" }}>
      {/* 1st part */}
      <div className="navbar container mx-auto">
        {/* nav start */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* responsive menu part */}
            <ul
              tabIndex={0}
              className=" menu-sm dropdown-content bg-base-100 rounded-box z-[10] mt-3 w-36 p-2 shadow"
            >
              <li className="mb-2">
                <Link to="/postcomplains">
                  <span style={{ color: "#016A4E" }} className="font-bold">
                    অভিযোগ ?
                  </span>
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/hotlines">
                  <span style={{ color: "#016A4E" }} className="font-bold">
                    হটলাইন
                  </span>
                </Link>
              </li>
              <li>
                <Link to="/reviews">
                  <span style={{ color: "#016A4E" }} className="font-bold">
                    রিভিউ
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          <Link to="/">
            <img style={{ width: "200px" }} src={logo} alt="" />
          </Link>
        </div>

        {/* nav center */}
        <div className="navbar-center hidden lg:flex">
          <ul className=" menu-horizontal gap-12">
            <li>
              <Link to="/postcomplains">
                <span style={{ color: "#016A4E" }} className="font-bold">
                  অভিযোগ ?
                </span>
              </Link>
            </li>
            <li>
              <Link to="/hotlines">
                <span style={{ color: "#016A4E" }} className="font-bold">
                  হটলাইন
                </span>
              </Link>
            </li>
            <li>
              <Link to="/reviews">
                <span style={{ color: "#016A4E" }} className="font-bold">
                  রিভিউ
                </span>
              </Link>
            </li>
          </ul>
        </div>

        {/* nav end side */}
        <div className="navbar-end gap-3">
          {user?.email ? (
            <>
              {/* start responsive sidebar for user menu */}
              <div className="dropdown dropdown-end">
                <div className="drawer drawer-end">
                  <input
                    id="my-drawer-4"
                    type="checkbox"
                    className="drawer-toggle"
                  />
                  <div className="drawer-content">
                    {/* Page content here */}
                    <div>
                      <label
                        style={{
                          background: "none",
                          border: "none",
                          padding: 0,
                          margin: 0,
                          outline: "none",
                        }}
                        htmlFor="my-drawer-4"
                        className="drawer-button btn btn-ghost"
                      >
                        {/* header user pic */}
                        <img
                          className=" w-[40px] h-[40px] rounded-full object-cover"
                          alt="Tailwind CSS Navbar component"
                          src={
                            userInfo.img || "https://via.placeholder.com/200"
                          }
                        />
                      </label>
                    </div>
                  </div>
                  <div className="drawer-side z-[10]">
                    <label
                      htmlFor="my-drawer-4"
                      aria-label="close sidebar"
                      className="drawer-overlay"
                    ></label>
                    <ul className=" bg-white  min-h-full w-auto p-3">
                      {/* Cross sign button */}
                      <div>
                        <label
                          htmlFor="my-drawer-4"
                          className="cursor-pointer  p-3"
                          aria-label="close"
                        >
                          {/* User menu */}
                          <span className=" flex justify-between px-5">
                            <p className="text-2xl "> সাইডবার </p>
                            <p className="text-3xl">&times;</p>
                          </span>
                        </label>
                      </div>

                      {/* Sidebar content here */}
                      <Sidebar
                        className=" w-auto "
                        aria-label="Default sidebar example"
                      >
                        <Sidebar.Items>
                          <Sidebar.ItemGroup>
                            {isAdmin ? (
                              <>
                                {/* admin home */}
                                <Sidebar.Item icon={FaHome}>
                                  <Link to="/adminhome">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      এডমিন হোম
                                    </span>
                                  </Link>
                                </Sidebar.Item>

                                {/* manage user */}
                                <Sidebar.Item icon={HiUser}>
                                  <Link to="/manageuser">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      সকল ইউজার
                                    </span>
                                  </Link>
                                </Sidebar.Item>

                                {/* manage review */}
                                <Sidebar.Item icon={MdRateReview}>
                                  <Link to="/managereview">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      সব রিভিউ
                                    </span>
                                  </Link>
                                </Sidebar.Item>

                                {/* manage complain */}
                                <Sidebar.Item icon={SiGoogledocs}>
                                  <Link to="/managecomplain">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      সব অভিযোগ
                                    </span>
                                  </Link>
                                </Sidebar.Item>
                              </>
                            ) : (
                              <>
                                {/* 1 user home */}
                                <Sidebar.Item icon={FaHome}>
                                  <Link to="/userhome">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      ইউজার হোম
                                    </span>
                                  </Link>
                                </Sidebar.Item>

                                {/*  add review */}
                                <Sidebar.Item icon={SiGoogledocs}>
                                  <Link to="/addreview">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      রিভিউ দিন
                                    </span>
                                  </Link>
                                </Sidebar.Item>

                                {/* post complains */}
                                <Sidebar.Item icon={SiGoogledocs}>
                                  <Link to="/postcomplains">
                                    <span
                                      style={{ color: "#016A4E" }}
                                      className="font-bold"
                                    >
                                      অভিযোগ দিন
                                    </span>
                                  </Link>
                                </Sidebar.Item>
                              </>
                            )}

                            {/* Logout */}
                            <Sidebar.Item icon={IoLogOut}>
                              <button onClick={logoutFunction}>
                                <span
                                  style={{ color: "#016A4E" }}
                                  className="font-bold"
                                >
                                  লগআউট
                                </span>
                              </button>
                            </Sidebar.Item>
                          </Sidebar.ItemGroup>
                        </Sidebar.Items>
                      </Sidebar>
                    </ul>
                  </div>
                </div>
              </div>
              {/* end sidebar */}
            </>
          ) : (
            <Link to="/login">
              <span style={{ color: "#016A4E" }} className="font-bold flex gap-3">
                <IoLogIn /> লগইন
              </span>
            </Link>
          )}
        </div>
      </div>
      <hr style={{ borderWidth: "2px" }} />
    </div>
  );
};

export default Header;