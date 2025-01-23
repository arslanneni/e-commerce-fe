export const cartReducer = {
  cartInfo: {
    cartItems: [],
  },
  USER_ID: "",
};

/**
 * Reducer Function related to Cart Component
 * @param {*} state
 * @param {*} action
 * @returns
 */
export function CartReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE": {
      return {
        ...state,
        [action.payload.key]: action.payload.value,
      };
    }
    case "SET_SUB_VALUE": {
      return {
        ...state,
        [action.payload.parent]: {
          ...state[action.payload.parent],
          [action.payload.key]: action.payload.value,
        },
      };
    }
    case "SET_CUSTOMER_VALUES": {
      return {
        ...state,
        [action.payload.parent]: {
          ...state[action.payload.parent],
          ...action.payload.value,
        },
      };
    }
    case "APPEND_VALUE_ARRAY": {
      return {
        ...state,
        [action.payload.name]: [
          ...state[action.payload.name],
          action.payload.value,
        ],
      };
    }

    // New case: Update the quantity of a cart item
    case "UPDATE_QUANTITY": {
      const updatedCartItems = state.cartInfo.cartItems.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          cartItems: updatedCartItems,
        },
      };
    }

    // New case: Remove an item from the cart
    case "REMOVE_ITEM": {
      const filteredCartItems = state.cartInfo.cartItems.filter(
        (item) => item.id !== action.payload
      );
      return {
        ...state,
        cartInfo: {
          ...state.cartInfo,
          cartItems: filteredCartItems,
        },
      };
    }

    default:
      return state;
  }
}
