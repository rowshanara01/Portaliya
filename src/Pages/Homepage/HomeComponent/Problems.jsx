import React from "react";
import p1 from '../../../assets/problems/durniti.png';
import p2 from '../../../assets/problems/bekar.png';
import p3 from '../../../assets/problems/daridro.png';
import p4 from '../../../assets/problems/sastho.png';
import p5 from '../../../assets/problems/poribesh.png';
import p6 from '../../../assets/problems/shikkha.png';
import p7 from '../../../assets/problems/traffic.png';
import p8 from '../../../assets/problems/woman.png';
import p9 from '../../../assets/problems/electricity.png';
import p10 from '../../../assets/problems/krishi.png';
import p11 from '../../../assets/problems/water.png';
import p12 from '../../../assets/problems/durjog.png';
import p13 from '../../../assets/problems/terrorist.png';
import p14 from '../../../assets/problems/weed.png';
import p15 from '../../../assets/problems/tottho.png';
import p16 from '../../../assets/problems/cyber.png';
import p17 from '../../../assets/problems/child.png';
import p18 from '../../../assets/problems/others.png';


const Problems = () => {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-center font-bold lg:text-2xl md:text-2xl text-xl mb-7 ">এক ঠিকানায় আপনার সব অভিযোগ</h1>

      {/* problems grid */}
      <div className="grid lg:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-5 my-5 px-2">
        {/* 1 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p1} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center">দুর্নীতি </h2>
          </div>
        </div>

        {/* 2 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p2} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center">বেকারত্ব </h2>
          </div>
        </div>

        {/* 3 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p3} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> দারিদ্র্য </h2>
          </div>
        </div>

        {/* 4 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p4} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> স্বাস্থ্যসেবা </h2>
          </div>
        </div>

        {/* 5 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p5} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> পরিবেশ দূষণ </h2>
          </div>
        </div>

        {/* 6 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p6} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> শিক্ষা ব্যবস্থা </h2>
          </div>
        </div>

        {/* 7 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p7} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> সড়ক নিরাপত্তা ও যানজট </h2>
          </div>
        </div>

        {/* 8 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p8} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> নারী নির্যাতন </h2>
          </div>
        </div>

        {/* 9 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p9} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> বিদ্যুৎ </h2>
          </div>
        </div>

        {/* 10 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p10} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> কৃষি </h2>
          </div>
        </div>

        {/* 11 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p11} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> পানি সংকট  </h2>
          </div>
        </div>

        {/* 12 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p12} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> প্রাকৃতিক দুর্যোগ </h2>
          </div>
        </div>

        {/* 13 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p13} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> জঙ্গিবাদ ও নিরাপত্তা ঝুঁকি </h2>
          </div>
        </div>

        {/* 14 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p14} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> মাদক </h2>
          </div>
        </div>

        {/* 15 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p15} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> তথ্যপ্রযুক্তির সমস্যা </h2>
          </div>
        </div>

        {/* 16 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p16} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> প্রযুক্তির মাধ্যমে প্রতারণা </h2>
          </div>
        </div>

        {/* 17 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p17} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> শিশু শ্রম </h2>
          </div>
        </div>

        {/* 18 */}
        <div className="card card-compact bg-base-100 w-full h-full shadow-xl">
          <figure className="px-4">
            <img src={p18} alt="" style={{width:'80px'}} />
          </figure>
          <div className="card-body">
            <h2 className="text-sm font-bold text-center"> অন্যান্য </h2>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Problems;