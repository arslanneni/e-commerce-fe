import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Products', path: '/dashboard/products' },
    { name: 'Categories', path: '/dashboard/categories' },
    { name: 'Users', path: '/dashboard/users' },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4 font-bold text-lg">Dashboard</div>
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`block px-4 py-2 rounded ${
                    location.pathname === item.path
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
