import React from 'react';
import { useQueryClient } from "react-query";

const CartItem = ({ cartRed, cartDispatch }) => {
  

  const queryClient = useQueryClient();
  const handleUpdateQuantity = async (newQuantity, cartId) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(
        `http://localhost:5000/cart/updateCartQuantity/${cartId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            quantity: newQuantity, // Send only the updated quantity
          }),
        }
      );

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        queryClient.invalidateQueries(["cart-items"]);
      } else {
        alert('Failed to update quantity');
      }
    } catch (err) {
      alert('Error occurred while updating cart');
    }
  };

  const handleRemoveItem = async (cartId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/cart/deleteCartItem/${cartId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();
      if (data.status === 'SUCCESS') {
        queryClient.invalidateQueries(["cart-items"]);
      } else {
        alert('Failed to remove item');
      }
    } catch (err) {
      alert('Error occurred while removing item');
    }
  };

  return (
    <>
      {cartRed.cartInfo.cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center border-b border-gray-300 py-4"
        >
          <div className="w-24 h-24">
            <img
              src={item.ecmProducts.image_url}
              alt={item.ecmProducts.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="flex-1 ml-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {item.ecmProducts.name}
            </h2>
            <p className="text-gray-600 text-sm mb-2">
              ${item.ecmProducts.price.toFixed(2)}
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button
                  onClick={() => handleUpdateQuantity(item.quantity - 1, item.id)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  -
                </button>
                <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => handleUpdateQuantity(item.quantity + 1, item.id)}
                  className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          </div>
          <div className="text-gray-800 font-semibold">
            ${(item.ecmProducts.price * item.quantity).toFixed(2)}
          </div>
        </div>
      ))}
    </>
  );
};

export default CartItem;
