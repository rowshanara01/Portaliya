import axios from "axios";
import { Table } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const Hotlines = () => {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    axios
      .get("https://bangladesh-complaint-portal-server.onrender.com/hotlines")
      .then((response) => {
        setNumbers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div className="px-3" style={{ backgroundColor: "#E5E5E5" }}>
      <Helmet>
        <title> Hotlines </title>
      </Helmet>
      <br />
      {/* load hotlines in table */}
      <div
        className="mt-5 mb-5 container mx-auto rounded-box px-5"
        style={{ backgroundColor: "#FFFFFF" }}
      >
        <div className="overflow-x-auto px-2">
          <Table hoverable>
            {/* table head */}
            <Table.Head className="bg-base-content ">
              <Table.HeadCell> # </Table.HeadCell>
              <Table.HeadCell> ওয়েবসাইট লিংক </Table.HeadCell>
              <Table.HeadCell> হটলাইন নাম্বার </Table.HeadCell>
              <Table.HeadCell> বিস্তারিত </Table.HeadCell>
            </Table.Head>

            {/* table body. map operation */}
            {numbers.map((numberInfo, index) => (
              <Table.Body key={numberInfo._id}>
                <Table.Row className="bg-white text-black divide-y-2 hover dark:border-gray-800 dark:bg-gray-800">
                  <Table.Cell> {index + 1} </Table.Cell>
                  <Table.Cell>
                    <a href={numberInfo.weblink} target="_blank">
                      {numberInfo.weblink}
                    </a>
                  </Table.Cell>
                  <Table.Cell> {numberInfo.hotline} </Table.Cell>
                  <Table.Cell> {numberInfo.details} </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </div>
      </div>
      <br />
    </div>
  );
};

export default Hotlines;
