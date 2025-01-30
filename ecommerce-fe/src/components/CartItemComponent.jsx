import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useQueryClient } from "react-query";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const CartItem = ({ cartRed, cartDispatch }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shippingDetails, setShippingDetails] = useState({
    country: "",
    city: "",
    state: "",
    postalCode: "",
    address: "",
  });

  const cartItems = cartRed.cartInfo?.cartItems || [];

  // Compute total amount only once
  const totalAmount = useMemo(() => 
    cartItems.reduce((acc, item) => acc + item.ecmProducts.price * item.quantity, 0).toFixed(2)
  , [cartItems]);

  // Precompute products payload
  const productsPayload = useMemo(() =>
    cartItems.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price_per_unit: item.ecmProducts.price,
      total_price: item.quantity * item.ecmProducts.price,
    })), 
  [cartItems]);

  // Update quantity handler
  const handleUpdateQuantity = useCallback(async (newQuantity, cartId) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`http://localhost:5000/cart/updateCartQuantity/${cartId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const data = await response.json();
      if (data.status === "SUCCESS") {
        queryClient.invalidateQueries(["cart-items"]);
      } else {
        alert("Failed to update quantity");
      }
    } catch {
      alert("Error occurred while updating cart");
    }
  }, [queryClient]);

  // Remove item handler
  const handleRemoveItem = useCallback(async (cartId) => {
    try {
      const response = await fetch(`http://localhost:5000/cart/deleteCartItem/${cartId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      if (data.status === "SUCCESS") {
        queryClient.invalidateQueries(["cart-items"]);
      } else {
        alert("Failed to remove item");
      }
    } catch {
      alert("Error occurred while removing item");
    }
  }, [queryClient]);

 
  const handleSaveShippingDetails = async () => {
    const orderPayload = {
      user_id: parseInt(Cookies.get("ID")),
      order_status: "Pending",
      total_amount: parseInt(totalAmount),
    };

    try {
      const response = await fetch("http://localhost:5000/orders/createdOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();
      if (data.status === "SUCCESS") {
        await saveOrderItems();
        navigate("/myorders");
      } else {
        alert("Error in Order Placement");
      }

      setIsModalOpen(false);
    } catch(err) {
     console.log(err);
    }
  };
  const updateStatusCart = async () => {
    const userID = parseInt(Cookies.get("ID")); // Get the user ID from cookies
    const url = `http://localhost:5000/cart/updateCartStatusByUserID/${userID}`;
  
    const response = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" }
    });
  
    // Handle the response if needed
    if (response.ok) {
      console.log("Cart status updated successfully");
    } else {
      console.error("Failed to update cart status");
    }
  };
  

  // Save order items
  const saveOrderItems = async () => {
    const orderItemsPayload = {
      user_id: parseInt(Cookies.get("ID")),
      products: productsPayload,
      address:shippingDetails.address,
      city:shippingDetails.city,
      state:shippingDetails.state,
      postalcode:shippingDetails.postalcode,
      country:shippingDetails.country,
    };

    try {
      const response = await fetch("http://localhost:5000/order-items/createdOrderItems", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderItemsPayload),
      });

      const data = await response.json();
      if(data.status==='SUCCESS'){
        toast.success(data.message)
        await updateStatusCart()
      }
      else{
        toast.error(data.message)
      }
     
    } catch {
      toast.error("Failed to save order items");
    }
  };

  return (
    <>
  =
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center border-b border-gray-300 py-4">
          <div className="w-24 h-24">
            <img src={item.ecmProducts.image_url} alt={item.ecmProducts.name} className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="flex-1 ml-4">
            <h2 className="text-lg font-semibold text-gray-800">{item.ecmProducts.name}</h2>
            <p className="text-gray-600 text-sm mb-2">${item.ecmProducts.price.toFixed(2)}</p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-gray-300 rounded-md">
                <button onClick={() => handleUpdateQuantity(item.quantity - 1, item.id)} className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200">-</button>
                <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                <button onClick={() => handleUpdateQuantity(item.quantity + 1, item.id)} className="px-4 py-2 bg-gray-100 text-gray-800 hover:bg-gray-200">+</button>
              </div>
              <button onClick={() => handleRemoveItem(item.id)} className="px-6 py-2 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700">Remove</button>
            </div>
          </div>
          <div className="text-gray-800 font-semibold">${(item.ecmProducts.price * item.quantity).toFixed(2)}</div>
        </div>
      ))}

      <button onClick={() => setIsModalOpen(true)} className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
        Proceed to Order
      </button>

      {/* Shipping Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg relative">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shipping Details</h2>
            {["Country", "City", "State", "Postal Code", "Address"].map((field, index) => (
              <div key={index} className="mb-5">
                <label className="block text-gray-600 font-medium mb-2">{field}</label>
                <input
                  type="text"
                  value={shippingDetails[field.toLowerCase().replace(" ", "")]}
                  onChange={(e) => setShippingDetails({ ...shippingDetails, [field.toLowerCase().replace(" ", "")]: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder={`Enter your ${field.toLowerCase()}`}
                />
              </div>
            ))}

            <button onClick={handleSaveShippingDetails} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition">
              Place Order
            </button>
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 focus:outline-none">
              ✖
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CartItem;
