import { useQuery } from "react-query";
import Cookies from "js-cookie";

import { CART_REDUCER_CONSTANTS } from "./CartConstants";

export const useCartItems = (cartDispatch) =>
  useQuery({
    queryKey: ["cart-items"],
    queryFn: async function () {
      const userId = Cookies.get("ID");
      if (!userId) {
        throw new Error("User ID not found in cookies");
      }
      try {
        const response = await fetch(
          `http://localhost:5000/cart/getCartItemsByUserID/${userId}`
        );
        const data = await response.json();

        if (data.status === "SUCCESS" && Array.isArray(data.data)) {
          return data.data;
        } else {
          return [];
        }
      } catch (error) {
        alert("Error fetching cart items");
        throw new Error(error);
      }
    },
    onSuccess: (data) => {
      cartDispatch({
        type: "SET_SUB_VALUE",
        payload: {
          parent: CART_REDUCER_CONSTANTS.CART_INFO,
          key: "cartItems",
          value: data,
        },
      });
      if (data.length > 0) {
        cartDispatch({
          type: "SET_VALUE",
          payload: {
            key: "USER_ID",
            value: data[0]?.user_id,
          },
        });
      }
    },
  });
