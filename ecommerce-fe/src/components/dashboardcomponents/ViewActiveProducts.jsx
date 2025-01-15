import React, { useEffect, useState } from "react";

const ViewActiveProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch Active Products
  const fetchActiveProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products/getAllActiveProducts");
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setProducts(data.data);
      } else {
        setError("Failed to fetch active products");
      }
    } catch (error) {
      setError("An error occurred while fetching active products");
    }
  };

  useEffect(() => {
    fetchActiveProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">View Active Products</h2>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Products Table */}
      {products.length > 0 ? (
        <div className="overflow-y-auto max-h-[500px] border border-gray-200 rounded">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Name</th>
                <th className="border border-gray-200 px-4 py-2">Description</th>
                <th className="border border-gray-200 px-4 py-2">Price</th>
                <th className="border border-gray-200 px-4 py-2">Category</th>
                <th className="border border-gray-200 px-4 py-2">Stock Quantity</th>
                <th className="border border-gray-200 px-4 py-2">Created At</th>
                <th className="border border-gray-200 px-4 py-2">Modified At</th>
                <th className="border border-gray-200 px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="text-center">
                  <td className="border border-gray-200 px-4 py-2">{product.name}</td>
                  <td className="border border-gray-200 px-4 py-2">{product.description || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">${product.price}</td>
                  <td className="border border-gray-200 px-4 py-2">{product.category.name || "N/A"}</td>
                  <td className="border border-gray-200 px-4 py-2">{product.stock_quantity}</td>
                  <td className="border border-gray-200 px-4 py-2">
                    {new Date(product.datetime).toLocaleString()}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {product.modified_datetime
                      ? new Date(product.modified_datetime).toLocaleString()
                      : "Not Modified"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">{product.status || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">No active products found.</p>
      )}
    </div>
  );
};

export default ViewActiveProducts;
