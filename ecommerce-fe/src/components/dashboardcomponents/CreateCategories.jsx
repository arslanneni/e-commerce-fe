import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateCategories = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validate = () => {
    const newErrors = {};


    if (!formData.name || formData.name.length < 1 || formData.name.length > 255) {
      newErrors.name = "Name is required and must be less than 255 characters.";
    }


    if (formData.description && formData.description.length > 255) {
      newErrors.description = "Description must be less than 255 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccessMessage(""); 
    if (validate()) {
      try {
        const response = await fetch("http://localhost:5000/categories/createCategory", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });


        const data = await response.json();
        if(data.status==='FAILURE'){
            return toast.error(data.message);
        }
        else{
            toast.success(data.message);
            setSuccessMessage("Category created successfully!");
            setFormData({ name: "", description: "" }); 
        }
       

      } catch (error) {
        console.error("Error creating category:", error.message);
        setErrors({ api: error.message });
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Create New Category</h2>

      {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}


      {errors.api && <p className="text-red-500 text-sm mb-4">{errors.api}</p>}

  
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded`}
          placeholder="Enter category name"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
      </div>

  
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"} rounded`}
          rows="3"
          placeholder="Enter category description (optional)"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

  
      <div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Create Category
        </button>
      </div>
    </form>
  );
};

export default CreateCategories;
