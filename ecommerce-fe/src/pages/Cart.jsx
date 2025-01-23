import React from "react";
import CartItem from "../components/CartItemComponent";
import { cartReducer, CartReducer } from "../constants/CartReducer/CartReducer";
import { CART_REDUCER_CONSTANTS } from "../constants/CartReducer/CartConstants";
import { useCartItems } from "../constants/CartReducer/ReactQuery";

const Cart = () => {
  const [cartReducerState, cartDispatch] = React.useReducer(CartReducer, cartReducer);

 
  const { data: cartItems, isLoading, isError } = useCartItems(cartDispatch);

  const handleProceedToOrder = () => {
    window.location.href = "/placeorder";
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-gray-600">Loading your cart...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-xl font-semibold text-red-600">
          Failed to load cart items. Please try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {cartReducerState.cartInfo.cartItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-2xl font-semibold text-gray-600 mb-4">
            Your cart is empty
          </p>
          <a
            href="/collection"
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Start Shopping
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          <CartItem cartRed={cartReducerState} cartDispatch={cartDispatch} />
        </div>
      )}

      {cartReducerState.cartInfo.cartItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center border-t pt-4">
          <div className="text-xl font-semibold text-gray-800">
            Total: $
            {cartReducerState.cartInfo.cartItems
              .reduce(
                (acc, item) => acc + item.ecmProducts.price * item.quantity,
                0
              )
              .toFixed(2)}
          </div>
          <button
            onClick={handleProceedToOrder}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700"
          >
            Proceed to Order
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
