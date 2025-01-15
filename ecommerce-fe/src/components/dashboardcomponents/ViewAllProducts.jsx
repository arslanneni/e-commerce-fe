import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"; // Import icons

const ViewAllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: 0,
    stock_quantity: 0,
    category_id: 0,
  });

  // Fetch All Products
  const fetchAllProducts = async () => {
    try {
      const response = await fetch("http://localhost:5000/products/getAllProducts");
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setProducts(data.data);
      } else {
        setError("Failed to fetch products");
      }
    } catch (error) {
      setError("An error occurred while fetching products");
    }
  };

  // Handle Modal Open
  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description || "",
      price: product.price,
      stock_quantity: product.stock_quantity,
      category_id: product.category.id,
    });
    setIsModalOpen(true);
  };

  // Handle Modal Close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle Update Product
  const handleUpdateProduct = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/products/updateProductByProductID/${selectedProduct.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        }
      );
      const data = await response.json();
      if (data.status === "SUCCESS") {
        fetchAllProducts(); // Refresh the product list
        handleModalClose(); // Close the modal
      } else {
        setError("Failed to update the product");
      }
    } catch (error) {
      setError("An error occurred while updating the product");
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const response = await fetch(`http://localhost:5000/products/deleteProductByID/${id}`, {
          method: "PUT",
        });
        const data = await response.json();
        if (data.status === "SUCCESS") {
          fetchAllProducts(); // Refresh the product list after deletion
        } else {
          setError("Failed to delete the product");
        }
      } catch (error) {
        setError("An error occurred while deleting the product");
      }
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">View All Products</h2>

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
                <th className="border border-gray-200 px-4 py-2">Action</th>
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
                  <td className="border border-gray-200 px-4 py-2 flex justify-center items-center space-x-2">
                    {/* Edit Icon */}
                    <PencilIcon
                      className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600"
                      onClick={() => handleEditClick(product)}
                    />
                    {/* Delete Icon */}
                    <TrashIcon
                      className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                      onClick={() => handleDeleteProduct(product.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-700">No products found.</p>
      )}

      {/* Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Product</h3>

            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={updatedProduct.name}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-2">Description</label>
              <textarea
                id="description"
                name="description"
                value={updatedProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium mb-2">Price</label>
              <input
                type="number"
                id="price"
                name="price"
                value={updatedProduct.price}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium mb-2">Stock Quantity</label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={updatedProduct.stock_quantity}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div>
              <label htmlFor="category_id" className="block text-sm font-medium mb-2">Category</label>
              <input
                type="number"
                id="category_id"
                name="category_id"
                value={updatedProduct.category_id}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded mb-4"
              />
            </div>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleModalClose}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateProduct}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllProducts;
