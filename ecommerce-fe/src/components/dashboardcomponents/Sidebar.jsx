import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <>
    Test
    {/* <aside className="bg-gray-800 text-white w-64 h-screen fixed">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <nav className="mt-6">
          <NavLink
            to="/dashboard/dashboard-products"
            className="block px-4 py-2 mb-2 rounded hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/dashboard-categories"
            className="block px-4 py-2 mb-2 rounded hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            Categories
          </NavLink>

          <NavLink
            to="/dashboard/dashboard-users"
            className="block px-4 py-2 mb-2 rounded hover:bg-gray-700"
            activeClassName="bg-gray-700"
          >
            Users
          </NavLink>

        </nav>
      </div>
    </aside> */}
    </>
  );
};

export default Sidebar;
