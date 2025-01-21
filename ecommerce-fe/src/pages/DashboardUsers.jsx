import React, { useState } from 'react';
import CreateUser from '../components/dashboardcomponents/CreateUser';
import ViewAllUsers from '../components/dashboardcomponents/ViewAllUsers';
import ViewAllActiveUsers from '../components/dashboardcomponents/ViewAllActiveUsers';

const DashboardUsers = () => {
  const [activeTab, setActiveTab] = useState('create');

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateUser />;
      case 'view':
        return <ViewAllUsers />;
      case 'active':
        return <ViewAllActiveUsers />;
      default:
        return <CreateUser />;
    }
  };

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Dashboard - Products</h2>

      {/* Mini Navbar */}
      <div className="flex space-x-4 mb-6 border-b pb-2">
        <button
          onClick={() => setActiveTab('create')}
          className={`px-4 py-2 rounded ${
            activeTab === 'create'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Create New User
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${
            activeTab === 'view'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View All Users
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded ${
            activeTab === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Active Users
        </button>
      </div>


      <div>{renderContent()}</div>
    </div>
  );
};

export default DashboardUsers;
