import React, { useState } from 'react';
import CreateProduct from '../components/dashboardcomponents/CreateProduct';

import ViewActiveProducts from '../components/dashboardcomponents/ViewActiveProducts';
import ViewAllProducts from '../components/dashboardcomponents/ViewAllProducts';

const DashboardProducts = () => {
  const [activeTab, setActiveTab] = useState('create');

  const renderContent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateProduct />;
      case 'view':
        return <ViewAllProducts />;
      case 'active':
        return <ViewActiveProducts />;
      default:
        return <CreateProduct />;
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
          Create New Product
        </button>
        <button
          onClick={() => setActiveTab('view')}
          className={`px-4 py-2 rounded ${
            activeTab === 'view'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View All Products
        </button>
        <button
          onClick={() => setActiveTab('active')}
          className={`px-4 py-2 rounded ${
            activeTab === 'active'
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          View Active Products
        </button>
      </div>


      <div>{renderContent()}</div>
    </div>
  );
};

export default DashboardProducts;
