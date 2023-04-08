import axios from "../helpers/axios";
import store from "../store";

export const addToCart = (product) => {
   return async (dispatch) => {
      const { cartItems } = store.getState().cart;
      const quantity = cartItems[product._id]
         ? parseInt(product[product._id].quantity + 1)
         : 1;

      cartItems[product._id] = {
         ...product,
         quantity,
      };

      dispatch({
         type: cartConstants.ADD_TO_CART,
         payload: { cartItems },
      });
   };
};
