import React from 'react';
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="border border-gray-300 shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-6 flex flex-col justify-center border-r border-gray-200 shadow-sm">
          <h2 className="prata-regular text-xl md:text-2xl font-bold text-gray-800 mb-4">
            Our Best Sellers
          </h2>
          <h3 className="text-lg md:text-xl text-gray-600 mb-2">
            New Arrivals
          </h3>
          <h4 className="text-md md:text-lg text-gray-500">
            Explore exclusive collections today!
          </h4>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.hero_img}
            alt="Banner"
            className="w-full h-full object-cover shadow-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
