import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Select from 'react-select';

const CreateProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    stock_quantity: 0,
    category_id: 0,
    status: '',
  });

  const [errors, setErrors] = useState({});
  const [getAllCategories, setAllCategories] = useState([]);

  // Fetch Active Categories
  useEffect(() => {
    getActiveCategories();
  }, []);

  const getActiveCategories = async () => {
    const response = await fetch('http://localhost:5000/categories/getActiveCategories');
    const data = await response.json();
    if (data.status === 'SUCCESS') {
      const options = data.data.map(category => ({
        id: category.id,
        label: category.name, // Label for display in select
      }));
      setAllCategories(options); // Set options for select
    } else {
      toast.error(data.message);
    }
  };

  // Form Validation
  const validate = () => {
    const newErrors = {};

    if (!formData.name || formData.name.length < 1 || formData.name.length > 255) {
      newErrors.name = 'Name is required and must be between 1 and 255 characters.';
    }

    if (formData.description && formData.description.length > 255) {
      newErrors.description = 'Description must not exceed 255 characters.';
    }

    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Price is required and must be a positive number.';
    }

    if (!formData.stock_quantity || formData.stock_quantity < 0) {
      newErrors.stock_quantity = 'Stock quantity is required and must be a positive number.';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Category is required.';
    }



    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock_quantity' || name === 'category_id' ? parseInt(value) : value,
    });
  };

  // Handle Select Change
  const handleSelectChange = (selectedOption) => {
    setFormData({ ...formData, category_id: selectedOption ? selectedOption.id : 0 });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch('http://localhost:5000/products/createProduct', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData), 
        });
  
        const data = await response.json();
        if (data.status === 'SUCCESS') {        
          toast.success('Product created successfully!');
          setFormData({
            name: '',
            description: '',
            price: 0,
            stock_quantity: 0,
            category_id: 0,
            status: '',
          });
        } else {
          toast.error(data.message || 'Failed to create product');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('An error occurred while creating the product.');
      }
    }
  };
  

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow rounded">
        <h2 className="text-2xl font-bold mb-4">Create New Product</h2>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded`}
            rows="3"
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Price *</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
        </div>

        {/* Stock Quantity */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Stock Quantity *</label>
          <input
            type="number"
            name="stock_quantity"
            value={formData.stock_quantity}
            onChange={handleChange}
            className={`w-full p-2 border ${errors.stock_quantity ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.stock_quantity && <p className="text-red-500 text-sm mt-1">{errors.stock_quantity}</p>}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">Category *</label>
          <Select
            name="category_id"
            value={getAllCategories.find(option => option.id === formData.category_id)}
            onChange={handleSelectChange}
            options={getAllCategories}
            className={`w-full ${errors.category_id ? 'border-red-500' : 'border-gray-300'} rounded`}
          />
          {errors.category_id && <p className="text-red-500 text-sm mt-1">{errors.category_id}</p>}
        </div>

    

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Create Product
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateProductForm;
