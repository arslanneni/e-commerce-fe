import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const user_id = parseInt(Cookies.get("ID"));
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://localhost:5000/shipping/getShippingDetails/${user_id}`);
        const result = await response.json();

        if (result.status === "SUCCESS") {
          setOrders(result.data);
        } else {
          throw new Error(result.message || "Failed to fetch orders");
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const statusSteps = {
    Pending: 1,
    Shipped: 2,
    Delivered: 3,
  };

  if (loading) return <p className="text-center text-gray-600">Loading orders...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="border rounded-lg p-5 mb-6 bg-gray-50">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-700">Order #{order.order_id}</h3>
              <p className="text-gray-500">Placed on {new Date(order.ecmOrderr.order_date).toLocaleDateString()}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
              order.shipping_status === "Pending"
                ? "bg-yellow-100 text-yellow-600"
                : order.shipping_status === "Shipped"
                ? "bg-blue-100 text-blue-600"
                : "bg-green-100 text-green-600"
            }`}>
              {order.shipping_status}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Pending</span>
              <span>Shipped</span>
              <span>Delivered</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full mt-2 relative">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  order.shipping_status === "Pending"
                    ? "bg-yellow-500 w-1/3"
                    : order.shipping_status === "Shipped"
                    ? "bg-blue-500 w-2/3"
                    : "bg-green-500 w-full"
                }`}
              ></div>
            </div>
          </div>

          <p className="text-gray-700 font-medium mb-2">
            Total: <span className="text-gray-900 font-bold">${order.ecmOrderr.total_amount}</span>
          </p>

          <p className="text-gray-600 text-sm">
            Items: {order.ecmOrderr.ecmOrderItems.map(item => item.ecmProducts.name).join(", ")}
          </p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;