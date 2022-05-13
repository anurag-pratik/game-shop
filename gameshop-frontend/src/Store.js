import { createContext } from "react";
import { useReducer } from "react";

export const Store = createContext();

const initialState = {
  cart: {
    cartItems: [],
  },
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
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: updatedCartItems,
        },
      };
    default:
      return state;
  }
};

export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
};
