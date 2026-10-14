import React from "react";
import Slides from "./HomeComponent/Slides";
import Faqs from "./HomeComponent/Faqs";
import Problems from "./HomeComponent/Problems";
import ShowReview from "./HomeComponent/ShowReview";
import { Helmet } from "react-helmet-async";

const Homepage = () => {
  return (
    <div>
      <Helmet>
        <title> BD Complaint Portal </title>
      </Helmet>
      <Slides></Slides>
      <Problems></Problems>
      <Faqs></Faqs>
      <ShowReview></ShowReview>
    </div>
  );
};

export default Homepage;
