import React, { useEffect, useState } from "react";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline"; // Import icons from Heroicons
import { toast } from "react-toastify";

const ViewAllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [categoryToEdit, setCategoryToEdit] = useState({ id: "", name: "", description: "" });

  // Fetch Categories
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/categories/getAllCategories");
      const data = await response.json();
      if (data.status === "SUCCESS") {
        setCategories(data.data); 
      } else {
        setError("Failed to fetch categories");
      }
    } catch (error) {
      setError("An error occurred while fetching categories");
    }
  };

  // Handle Edit: Open Modal with Category Data
  const handleEdit = (category) => {
    setCategoryToEdit({
      id: category.id,
      name: category.name,
      description: category.description || "",
    });
    setModalOpen(true);
  };

  // Handle Delete Category
  const handleDelete = async (categoryId) => {

    const { name, description } = categoryToEdit;
    
    const updatedCategory = { name, description };
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:5000/categories/deleteCategory/${categoryId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedCategory),
          });
        const result = await response.json();
        if (result.status === "SUCCESS") {
         // setCategories(categories.filter((category) => category.id !== categoryId));
          return toast.success("Category deleted successfully!");
        } else {
          return toast.error("Failed to delete category.");
        }
      } catch (error) {
        console.error("Error deleting category:", error);
        alert("An error occurred while deleting the category.");
      }
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, description } = categoryToEdit;
    
    const updatedCategory = { name, description };
    
    try {
      const response = await fetch(`http://localhost:5000/categories/updateCategory/${categoryToEdit.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedCategory),
      });
      const result = await response.json();
      if (result.status === "SUCCESS") {
       
        setCategories(categories.map(category =>
          category.id === categoryToEdit.id ? { ...category, name, description } : category
        ));
        setModalOpen(false); 
        return toast.success("Category updated successfully!");
      } else {
        return toast.error("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">View All Categories</h2>

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
              <th className="border border-gray-200 px-4 py-2">Actions</th>
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
                <td className="border border-gray-200 px-4 py-2 flex justify-center items-center space-x-2">
                  {/* Edit Icon */}
                  <PencilIcon
                    className="w-5 h-5 text-blue-500 cursor-pointer hover:text-blue-600"
                    onClick={() => handleEdit(category)}
                  />
                  {/* Delete Icon */}
                  <TrashIcon
                    className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-600"
                    onClick={() => handleDelete(category.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-700">No categories found.</p>
      )}

      {/* Modal for Editing Category */}
      {modalOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Edit Category</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={categoryToEdit.name}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, name: e.target.value })}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  value={categoryToEdit.description}
                  onChange={(e) => setCategoryToEdit({ ...categoryToEdit, description: e.target.value })}
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="px-4 py-2 text-white bg-gray-500 rounded"
                  onClick={() => setModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-white bg-blue-500 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAllCategories;
