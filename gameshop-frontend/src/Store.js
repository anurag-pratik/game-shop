import { createContext } from "react";
import { useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    address: localStorage.getItem("address")
      ? JSON.parse(localStorage.getItem("address"))
      : {},
  },
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "CART_ADD_ITEM":
      const newItem = action.payload;

      const existingItem = state.cart.cartItems.find(
        (ele) => ele._id === newItem._id
      );

      const updatedCartItems = existingItem
        ? state.cart.cartItems.map((item) =>
            item._id === existingItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];

      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };

    case "CART_REMOVE_ITEM": {
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );

      localStorage.setItem("cartItems", JSON.stringify(cartItems));

      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: cartItems,
        },
      };
    }

    case "CART_CLEAR":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
        },
      };

    case "USER_SIGNIN": {
      return { ...state, userInfo: action.payload };
    }

    case "USER_SIGNOUT": {
      return {
        ...state,
        cart: {
          cartItems: [],
          address: {},
        },
        userInfo: null,
      };
    }

    case "SAVE_ADDRESS": {
      return {
        ...state,
        cart: {
          ...state.cart,
          address: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
