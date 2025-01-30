import React from "react";

const PlaceOrder = () => {
  const cartItems = [
    {
      id: 1,
      name: "Men Black Trouser",
      price: 20,
      quantity: 2,
      image_url: "/img/p_img17.png",
    },
    {
      id: 2,
      name: "White T-Shirt",
      price: 15,
      quantity: 1,
      image_url: "/img/p_img18.png",
    },
  ];

  const calculateTotal = () =>
    cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handlePlaceOrder = () => {
    alert("Order has been placed successfully!");
    // Add logic to handle order placement
  };

  return (
    <div className="container mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Place Your Order
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Cart Items
          </h2>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center border-b border-gray-300 py-4"
            >
              <div className="w-24 h-24">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex-1 ml-4">
                <h2 className="text-lg font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-gray-600 text-sm mb-2">
                  Price: ${item.price.toFixed(2)}
                </p>
                <p className="text-gray-600 text-sm">
                  Quantity: {item.quantity}
                </p>
              </div>
              <div className="text-gray-800 font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="mt-4 text-right text-lg font-semibold text-gray-800">
            Subtotal: ${calculateTotal().toFixed(2)}
          </div>
        </div>

        {/* Order Summary & Form */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>
          <div className="space-y-4">
            {/* Customer Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Customer Information
              </h3>
              <p className="text-gray-600 text-sm">
                Name: <span className="font-medium">John Doe</span>
              </p>
              <p className="text-gray-600 text-sm">
                Email: <span className="font-medium">johndoe@example.com</span>
              </p>
              <p className="text-gray-600 text-sm">
                Phone: <span className="font-medium">+1 123-456-7890</span>
              </p>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Shipping Address
              </h3>
              <p className="text-gray-600 text-sm">
                123 Main Street, Cityville, USA
              </p>
            </div>

            {/* Shipping Method */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Shipping Method
              </h3>
              <p className="text-gray-600 text-sm">Standard Delivery (Free)</p>
            </div>

            {/* Payment */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Payment Method
              </h3>
              <p className="text-gray-600 text-sm">
                Credit Card: <span className="font-medium">**** **** **** 1234</span>
              </p>
            </div>

            {/* Total */}
            <div className="text-lg font-bold text-gray-800">
              Total: ${calculateTotal().toFixed(2)}
            </div>
          </div>

          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
