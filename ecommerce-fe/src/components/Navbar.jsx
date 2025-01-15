import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { Link, NavLink } from 'react-router-dom';
import Cookies from 'js-cookie'; // Import js-cookie

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userRole = Cookies.get('Roles'); 
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between py-4 px-6 font-medium relative">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={assets.logo} className="w-36" alt="Logo" />
        </Link>

        {/* Hamburger Menu for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } lg:flex lg:flex-1 lg:justify-center lg:gap-8 lg:items-center lg:static absolute top-16 left-0 w-full bg-white z-20 lg:bg-transparent transition-all`}
        >
          <li>
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition"
              activeClassName="font-semibold text-gray-900"
            >
              HOME
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collection"
              className="block px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition"
              activeClassName="font-semibold text-gray-900"
            >
              COLLECTION
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className="block px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition"
              activeClassName="font-semibold text-gray-900"
            >
              ABOUT
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="block px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition"
              activeClassName="font-semibold text-gray-900"
            >
              CONTACT
            </NavLink>
          </li>

          {/* Conditionally Render Dashboard */}
          {userRole === 'Admin' && (
            <li>
              <NavLink
                to="/dashboard"
                className="block px-4 py-2 text-sm lg:text-base text-gray-700 hover:text-gray-900 transition"
                activeClassName="font-semibold text-gray-900"
              >
                DASHBOARD
              </NavLink>
            </li>
          )}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          {/* Search Icon */}
          <img
            src={assets.search_icon}
            className="w-5 cursor-pointer hidden lg:block"
            alt="Search"
          />

          {/* Profile Icon with Dropdown */}
          <div className="relative group">
            <div className="cursor-pointer flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 transition">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
            </div>

            {/* Dropdown Menu */}
            <div className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-md z-30">
              <NavLink
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                My Profile
              </NavLink>
              <NavLink
                to="/orders"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Orders
              </NavLink>
              <button
                onClick={() => console.log('Logout clicked')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} className="w-5 min-w-5" alt="Cart" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              3
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
