import React, { useEffect, useState } from "react";

const ViewAllActiveCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  // Fetch Active Categories
  const fetchActiveCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories/getActiveCategories");
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setCategories(data.data);
      } else {
        setError("Failed to fetch active categories");
      }
    } catch (error) {
      setError("An error occurred while fetching active categories");
    }
  };

  useEffect(() => {
    fetchActiveCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">View Active Categories</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Categories Table */}
      {categories.length > 0 ? (
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Description</th>
              <th className="border border-gray-200 px-4 py-2">Created At</th>
              <th className="border border-gray-200 px-4 py-2">Modified At</th>
              <th className="border border-gray-200 px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id} className="text-center">
                <td className="border border-gray-200 px-4 py-2">{category.name}</td>
                <td className="border border-gray-200 px-4 py-2">{category.description || "N/A"}</td>
                <td className="border border-gray-200 px-4 py-2">
                  {new Date(category.datetime).toLocaleString()}
                </td>
                <td className="border border-gray-200 px-4 py-2">
                  {category.modified_datetime
                    ? new Date(category.modified_datetime).toLocaleString()
                    : "Not Modified"}
                </td>
                <td className="border border-gray-200 px-4 py-2">{category.status || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No active categories found.</p>
      )}
    </div>
  );
};

export default ViewAllActiveCategories;
