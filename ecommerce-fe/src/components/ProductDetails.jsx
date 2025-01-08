// src/components/ProductDetails.js

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/reducers/cartReducer';

const ProductDetails = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();

  // Handler to change quantity
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  // Handler to add product to the cart
  const handleAddToCart = () => {
    // Assuming 'product' has the necessary details
    const productWithQuantity = { ...product, quantity };
    dispatch(addToCart(productWithQuantity)); // Dispatch the add to cart action
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-lg"
          />
        </div>

        {/* Right Section - Product Details */}
        <div className="w-full md:w-1/2 flex flex-col justify-between">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Price Section */}
          <p className="text-2xl font-semibold text-gray-900 mb-6">${product.price}</p>

          {/* Quantity Section */}
          <div className="flex items-center gap-4 mb-6">
            <label htmlFor="quantity" className="text-lg font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max="99"
              className="w-16 text-center border rounded-md p-2"
            />
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="mt-4 py-2 px-6 bg-blue-600 text-white text-lg rounded-lg hover:bg-blue-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
