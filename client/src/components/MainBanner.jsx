import React from 'react';
import { assets } from "../assets/assets";
import { Link } from 'react-router-dom';

const MainBanner = () => {
  return (
    <div className="relative">
      {/* Desktop banner */}
      <img src={assets.main_banner_bg} alt="banner" className="w-full hidden md:block" />
      {/* Mobile banner */}
      <img src={assets.main_banner_bg_sm} alt="banner" className="w-full md:hidden" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-[300px] md:max-w-[420px] lg:max-w-[600px] leading-tight">
          Freshness You Can Trust, Savings You Will Love!
        </h1>

        <div className="flex items-center mt-6 font-medium gap-4">
          {/* Shop Now Button */}
          <Link to="/products" className="group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary hover:bg-primary-dull transition rounded text-white">
            Shop Now
            <img src={assets.white_arrow_icon} alt="arrow" className="md:hidden transition group-hover:translate-x-1" />
          </Link>

          {/* Explore Deals Link */}
          <Link to="/products" className="group hidden md:flex items-center gap-2 px-9 py-3">
            Explore Deals
            <img src={assets.black_arrow_icon} alt="arrow" className="transition group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
