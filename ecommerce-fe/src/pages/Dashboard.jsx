import React from 'react';
import Sidebar from '../components/dashboardcomponents/Sidebar';


const Dashboard = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 w-full bg-gray-100 min-h-screen p-6">
        <header className="bg-white shadow p-4 mb-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Dashboard;
