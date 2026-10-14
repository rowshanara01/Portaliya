import axios from "axios";
import { Button, Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { FaSearch, FaTrashAlt, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Authentication/useAxiosSecure/useAxiosSecure";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [axiosSecure] = useAxiosSecure();
  // State to store search input and result
  const [searchQuery, setSearchQuery] = useState("");

  // pagination
  const [totalResults, setTotalResults] = useState(0); // Total number of results
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  //step 1: Fetch users initially to search
  const fetchUsers = async (page = 1) => {
    try {
      // Include page and limit parameters and limit per page data in the request
      const response = await axiosSecure.get(
        `/users?page=${page}&limit=${limit}`
      );
      setUsers(response.data.users); // collect user data
      // handle pagination data as well
      setTotalResults(response.data.totalResults);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // for refetch data load
  useEffect(() => {
    fetchUsers();
  }, []);

  // step 2: search function
  const handleSearch = async () => {
    if (searchQuery.trim() === "") {
      return;
    } // Prevent empty search

    try {
      const response = await axios.get(
        `https://bangladesh-complaint-portal-server.onrender.com/search/${searchQuery}`
      );
      setUsers(response.data); // Update the users state with search results
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  // Function to handle page change
  const handlePageChange = (page) => {
    fetchUsers(page); // Fetch users for the selected page
  };

  // make admin
  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "আপনি কি নিশ্চিত ?",
      text: "আপনি এটিকে ফিরিয়ে আনতে পারবেন না!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "হ্যাঁ, এডমিন করা হোক",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .patch(
            `https://bangladesh-complaint-portal-server.onrender.com/users/admin/${user._id}`
          )
          .then((response) => {
            const data = response.data;
            if (data.modifiedCount) {
              fetchUsers();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${user.name} এখন থেকে এডমিন!`,
                showConfirmButton: false,
                timer: 1500,
              });
            }
          });
      }
    });
  };

  // delete user
  const handleDeleteUser = (delUser) => {
    if (delUser.email === "asawom250@gmail.com") {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "সুপার অ্যাডমিন ডিলেট করা যাবে না!",
        showConfirmButton: false,
        timer: 2000,
      });
      return;
    }

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
            `https://bangladesh-complaint-portal-server.onrender.com/users/${delUser._id}`
          )
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Show success message
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "ইউজার ডিলেট করা হয়েছে!",
                showConfirmButton: false,
                timer: 2000,
              });
              // refetch user
              fetchUsers(currentPage);
            }
          })
          .catch((error) => {
            console.error("Error deleting review:", error);
            Swal.fire({
              position: "top-end",
              icon: "error",
              title: "ইউজার ডিলেট করা সম্ভব না!",
              showConfirmButton: false,
              timer: 1500,
            });
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
        <title> Manage User </title>
      </Helmet>
      <br />
      <div
        className="container mx-auto mt-4 mb-4 p-3"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <h3 className="lg:text-3xl mb-5 md:text-2xl text-xl font-bold ml-4 ">
          মোট ইউজার: {totalResults}
        </h3>

        {/* Search Box */}
        <div className="flex justify-center mb-4">
          <input
            style={{ width: "65%" }}
            type="text"
            placeholder="এনআইডি অথবা ইমেইল দিয়ে খুঁজুন"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered border-gray-300 rounded p-2"
          />
          <Button
            onClick={handleSearch}
            className="ml-2"
            style={{ backgroundColor: "#01864C", color: "white" }}
          >
            <span className="flex gap-4">
              {" "}
              <FaSearch /> সার্চ{" "}
            </span>
          </Button>
        </div>

        {/* Display Result in table */}
        {/* table */}
        <div className="overflow-x-auto px-3">
          <Table hoverable>
            {/* table head */}
            <Table.Head className="bg-base-content ">
              <Table.HeadCell> # </Table.HeadCell>
              <Table.HeadCell> ওয়েব আইডি </Table.HeadCell>
              <Table.HeadCell> ছবি </Table.HeadCell>
              <Table.HeadCell> নাম </Table.HeadCell>
              <Table.HeadCell> এড্রেস </Table.HeadCell>
              <Table.HeadCell> এনআইডি </Table.HeadCell>
              <Table.HeadCell> ইমেইল </Table.HeadCell>
              <Table.HeadCell> ইউজার রোল </Table.HeadCell>
              <Table.HeadCell> ডিলেট </Table.HeadCell>
            </Table.Head>

            {/* table body. map operation */}
            {users.map((usersInfo, index) => (
              <Table.Body key={usersInfo._id}>
                <Table.Row className="bg-white text-black divide-y-2 hover dark:border-gray-800 dark:bg-gray-800">
                  {/* continuous indexing */}
                  <Table.Cell>
                    {(currentPage - 1) * limit + index + 1}
                  </Table.Cell>
                  <Table.Cell> {usersInfo._id} </Table.Cell>
                  <Table.Cell>
                    <div className="avatar">
                      <div className="w-12 rounded-xl ">
                        <img src={usersInfo.img} />
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell> {usersInfo.name} </Table.Cell>
                  <Table.Cell> {usersInfo.address} </Table.Cell>
                  <Table.Cell> {usersInfo.nid} </Table.Cell>
                  <Table.Cell> {usersInfo.email} </Table.Cell>
                  {/* role */}
                  <Table.Cell>
                    {usersInfo.role === "admin" ? (
                      "admin"
                    ) : (
                      <Button
                        color="gray"
                        onClick={() => handleMakeAdmin(usersInfo)}
                        style={{ backgroundColor: "#01864C", color: "white" }}
                      >
                        <FaUserShield></FaUserShield>
                      </Button>
                    )}
                  </Table.Cell>
                  {/* delete button */}
                  <Table.Cell>
                    <Button
                      onClick={() => handleDeleteUser(usersInfo)}
                      color="gray"
                      style={{ backgroundColor: "red", color: "white" }}
                    >
                      <FaTrashAlt></FaTrashAlt>
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>

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

export default ManageUsers;
