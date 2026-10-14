import { Accordion } from "flowbite-react";
import React from "react";
import faqs from "../../../assets/others/faqs.png";

const Faqs = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-7 ">সচরাচর জিজ্ঞাসা</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 md:grid-cols-12 gap-4" >
        {/* 1st column */}
        <div className="lg:col-span-4 md:col-span-4 col-span-12">
            <img src={faqs} alt=""  className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg" />
        </div>

        {/* 2nd column */}
        <div className="lg:col-span-8 md:col-span-8 col-span-12 px-2">
          <Accordion>
            {/* 1 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >অভিযোগ জমা দেওয়ার পর কতক্ষণ সময় লাগবে সমাধান পেতে? </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  প্রতিটি অভিযোগের ধরণ ও জটিলতার উপর নির্ভর করে সমাধানের সময় ভিন্ন হতে পারে। আমরা সংশ্লিষ্ট কর্তৃপক্ষের সাথে সমন্বয় করি এবং যত দ্রুত সম্ভব আপনার অভিযোগ সমাধান করার চেষ্টা করি। অভিযোগের অবস্থা আপনি আপনার ড্যাশবোর্ড থেকে দেখতে পারবেন।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 2 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >আমি কীভাবে আমার অভিযোগের অগ্রগতি দেখতে পারি? </Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  আপনার অভিযোগ জমা দেওয়ার পর, আপনার প্রোফাইলে আপনার অভিযোগের স্ট্যাটাস দেখতে পারবেন। এখানে সমাধানের সব আপডেট পাবেন।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 3 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >আমি কি একাধিক অভিযোগ দায়ের করতে পারি?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                   হ্যাঁ, আপনি একাধিক অভিযোগ দায়ের করতে পারবেন। প্রতিটি সমস্যা বা ইস্যুর জন্য আলাদা আলাদা অভিযোগ ফর্ম পূরণ করতে হবে। প্রতিটি অভিযোগের জন্য আপনি আলাদা ট্র্যাকিং নম্বর পাবেন, যা দিয়ে প্রতিটি অভিযোগের অগ্রগতি ট্র্যাক করা যাবে।
                </p> 
              </Accordion.Content>
            </Accordion.Panel>

            {/* 4 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" > অভিযোগের প্রমাণপত্র (ছবি, ভিডিও) কীভাবে যোগ করবো?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  অভিযোগ ফর্ম পূরণের সময়, আপনি ‘প্রমাণপত্র যুক্ত করুন’ অপশনে ক্লিক করে ছবি, ভিডিও বা অন্যান্য প্রমাণপত্র আপলোড করতে পারবেন। এটি আপনার অভিযোগের দ্রুত সমাধানে সহায়ক হবে।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 5 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >আমি কীভাবে জানবো যে আমার অভিযোগ গ্রহণ করা হয়েছে?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  অভিযোগ দায়ের করার পর, আপনি একটি নিশ্চিতকরণ মেসেজ পাবেন। এছাড়াও, আপনার প্রোফাইলে অভিযোগের ট্র্যাকিং নম্বর সহ অভিযোগের বিস্তারিত তথ্য দেখতে পারবেন।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 6 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >আমার অভিযোগ সরাসরি সংশ্লিষ্ট কর্তৃপক্ষের কাছে যাবে কি?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  হ্যাঁ, আপনার অভিযোগ যাচাইয়ের পর, এটি সংশ্লিষ্ট কর্তৃপক্ষের কাছে পাঠানো হবে। প্রতিটি অভিযোগ সুনির্দিষ্ট বিভাগে প্রেরণ করা হয়, যাতে আপনার সমস্যার দ্রুত সমাধান সম্ভব হয়।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 7 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >অভিযোগ জমা দেওয়ার জন্য কি কোনো ফি দিতে হবে?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  না, আমাদের প্ল্যাটফর্মে অভিযোগ জমা দেওয়ার জন্য কোনো ফি প্রয়োজন নেই। এটি সম্পূর্ণ বিনামূল্যে এবং সকল নাগরিকের জন্য উন্মুক্ত।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

            {/* 8 */}
            <Accordion.Panel>
              <Accordion.Title className="font-bold lg:text-lg md:text-lg text-sm text-black" >আমি যদি আমার পাসওয়ার্ড ভুলে যাই, তাহলে কী করবো?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 ">
                  পাসওয়ার্ড ভুলে গেলে, লগইন পৃষ্ঠায় 'পাসওয়ার্ড ভুলে গেছেন?' লিঙ্কে ক্লিক করুন। এরপর আপনার ইমেইল ঠিকানা প্রদান করুন এবং আপনার ইমেইলে পাসওয়ার্ড রিসেট করার নির্দেশাবলী পাঠানো হবে। সেটি অনুসরণ করে আপনি একটি নতুন পাসওয়ার্ড তৈরি করতে পারবেন।
                </p>
              </Accordion.Content>
            </Accordion.Panel>

          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faqs;