import React from 'react';
import logo from '../assets/logo.png'; // Replace with your actual logo file path

const Footer = () => {
  return (
    <footer className="bg-black text-gray-100 py-8">
      <div className="container mx-auto px-4">
        {/* Footer Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          {/* Logo Section */}
          <div className="mb-4 md:mb-0">
            <img src={logo} alt="Logo" className="w-32 h-auto" />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col md:flex-row gap-4 text-sm">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </a>
            <a href="/products" className="text-gray-300 hover:text-white transition-colors">
              Products
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </a>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-t border-gray-600 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Contact Details */}
            <div className="text-sm text-gray-400 mb-4 md:mb-0 text-center md:text-left">
              <p>© {new Date().getFullYear()} YourCompany. All rights reserved.</p>
              <p>
                Contact us at:{" "}
                <a
                  href="mailto:info@yourcompany.com"
                  className="text-gray-300 hover:text-white"
                >
                  info@yourcompany.com
                </a>
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
