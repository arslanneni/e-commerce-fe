import React, { useState } from 'react'
import CreateCategories from '../components/dashboardcomponents/CreateCategories';
import ViewAllCategories from '../components/dashboardcomponents/ViewAllCategories';
import ViewAllActiveCategories from '../components/dashboardcomponents/ViewAllActiveCategories';

const DashboardCategories = () => {
    const [activeTab, setActiveTab] = useState('create');

    const renderContent = () => {
      switch (activeTab) {
        case 'create':
          return <CreateCategories />;
        case 'view':
          return <ViewAllCategories />;
        case 'active':
          return <ViewAllActiveCategories />;
        default:
          return <CreateCategories />;
      }
    };
  return (
<>
<div className="bg-white shadow p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Categories</h2>

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
          Create New Category
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${
            activeTab === 'view'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View All Categories
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded ${
            activeTab === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Active Categories
        </button>
      </div>


      <div>{renderContent()}</div>
    </div>
</>
  )
}

export default DashboardCategories