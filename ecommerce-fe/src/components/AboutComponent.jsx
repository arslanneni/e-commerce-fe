// src/pages/About.js

import React from 'react';
import { assets } from '../assets/assets';

const AboutComponent = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - About Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">About Us</h2>
          <p className="text-lg text-gray-600 mb-6">
            We are a team of passionate individuals committed to providing the best online shopping experience.
            Our goal is to offer a diverse selection of high-quality products, great customer service, and fast delivery.
          </p>
          <p className="text-lg text-gray-600">
            We believe in the power of technology to bring people together, and our platform is designed to make shopping
            easy, secure, and enjoyable for all our customers.
          </p>
        </div>

        {/* Right Section - About Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.about_img}
            alt="About Us"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
