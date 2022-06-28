import axios from "../helpers/axios";
import { productConstants } from "./constants";

export const getProductsBySlug = (slug) => {
   return async (dispatch) => {
      try {
         const res = await axios.get(`/product/${slug}`);
         //console.log(res);
         if (res.status === 200) {
            dispatch({
               type: productConstants.GET_PRODUCTS_BY_SLUG,
               paylaod: res.data,
            });
         }
      } catch (err) {
         console.log(err);
      }
   };
};
