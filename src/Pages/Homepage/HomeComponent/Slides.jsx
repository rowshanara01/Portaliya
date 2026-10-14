import React from "react";
import { Carousel } from "react-responsive-carousel";
import { List } from "flowbite-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import pic1 from "../../../assets/banner/banner1.jpg";
import img2 from "../../../assets/banner/banner2.jpg";
import img3 from "../../../assets/banner/banner3.jpg";
import img4 from "../../../assets/banner/banner4.jpg";
import img5 from "../../../assets/banner/banner5.jpg";

const Slides = () => {
  return (
    <div className="container mx-auto">

      <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-4" >
        {/* 1st column */}
        {/* Carousel (Full width on small screens, 7 columns on large screens) */}
        <div className="lg:col-span-7 md:col-span-7 col-span-12">
          <Carousel infiniteLoop autoPlay={true} loop={true}>
            <div>
              <img src={pic1} />
            </div>
            <div>
              <img src={img2} />
            </div>
            <div>
              <img src={img3} />
            </div>
            <div>
              <img src={img4} />
            </div>
            <div>
              <img src={img5} />
            </div>
          </Carousel>
        </div>

        {/* 2nd column */}
        {/* User Guide (Full width on small screens, 5 columns on large screens) */}
        <div className="lg:col-span-5 md:col-span-5 col-span-12">
          <div className="p-4 ">
            <h2 className="text-lg font-bold mb-4">যেভাবে ওয়েবসাইট ব্যবহার করবেন:</h2>
            <List className="text-black" >
              <List.Item>একাউন্ট না থাকলে প্রথমে লগইন পেজে গিয়ে রেজিষ্ট্রেশন করুন। </List.Item>
              <List.Item>যেই ইমেল আইডি দিয়ে একাউন্ট করেছেন সেই ইমেইল এবং পাসওয়ার্ড পরবর্তীতে ব্যবহারের জন্য সংরক্ষণ করুন।</List.Item>
              <List.Item>একাউন্ট হয়ে গেলে ওয়েবসাইটের সবার ওপরে ডান দিকে আপনার ছবি সহ বাটন দেখবেন। সেখানে ক্লিক করুন। এখন "অভিযোগ জানান" অপসনে ক্লিক করুন। </List.Item>
              <List.Item>এরপর আপনি অভিযোগ জানানোর জন্য একটা ফর্ম পাবেন। সেটি ফিলাপ করে সাবমিট করুন।</List.Item>
              <List.Item>পরবর্তীতে আপনি আপডেট জানার জন্য আপনার প্রোফাইলের "এক্টিভিটি" অপসনে এসে অভিযোগের আপডেট সম্পর্কে জানতে পারবেন। এছাড়া আপনাকে ইমেইলের মাধ্যমে আপডেট জানানো হবে।</List.Item>
            </List>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Slides;
