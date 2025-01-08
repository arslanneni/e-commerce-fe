// src/pages/Contact.js

import React, { useState } from 'react';
import { assets } from '../assets/assets';

const ContactComponent = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API or an email service)
    console.log('Form submitted', formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Contact Form */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-lg text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg shadow-sm"
                rows="5"
                placeholder="Write your message here"
                required
              />
            </div>

            <button type="submit" className="py-3 px-6 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Submit
            </button>
          </form>
        </div>

        {/* Right Section - Contact Image */}
        <div className="w-full md:w-1/2">
          <img
            src={assets.contact_img}
            alt="Contact Us"
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="mt-8 text-center">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h3>
        <p className="text-lg text-gray-600 mb-2">Phone: +1 234 567 890</p>
        <p className="text-lg text-gray-600 mb-2">Email: support@ecommerce.com</p>
        <p className="text-lg text-gray-600">Address: 123 E-commerce St, City, Country</p>
      </div>
    </div>
  );
};

export default ContactComponent;
