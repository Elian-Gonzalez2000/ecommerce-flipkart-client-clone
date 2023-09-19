import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addToCart, getCartItems } from "../../actions";
import { MaterialButton } from "../../components/MaterialUI";
import { useNavigate } from "react-router-dom";
import PriceDetails from "../../components/PriceDetails";
import "./styles.css";

function CartPage(props) {
   const cart = useSelector((state) => state.cart);
   const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   //const cartItems = cart.cartItems;
   const [cartItems, setCartItems] = useState(cart.cartItems);

   useEffect(() => {
      setCartItems(cart.cartItems);
   }, [cart.cartItems]);

   useEffect(() => {
      if (auth.authenticate) {
         dispatch(getCartItems());
      }
   }, [auth.authenticate]);

   const onQuantityIncrement = (_id, qty) => {
      const { name, price, img } = cartItems[_id];
      dispatch(addToCart({ _id, name, price, img }, 1));
   };

   const onQuantityDecrement = (_id, qty) => {
      const { name, price, img } = cartItems[_id];
      dispatch(addToCart({ _id, name, price, img }, -1));
   };

   if (props.onlyCartItems) {
      return (
         <>
            {cartItems &&
               Object.keys(cartItems).map((item, index) => {
                  return (
                     <CartItem
                        key={index}
                        cartItem={cartItems[item]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                     />
                  );
               })}
         </>
      );
   }

   return (
      <Layout>
         <div className="cart-container">
            <Card
               headerLeft={"My Cart"}
               headerRight={<div>Delivered to</div>}
               style={{ width: "calc(100% - 400px)", overflow: "hidden" }}
            >
               {cartItems &&
                  Object.keys(cartItems).map((item, index) => {
                     return (
                        <CartItem
                           key={index}
                           cartItem={cartItems[item]}
                           onQuantityInc={onQuantityIncrement}
                           onQuantityDec={onQuantityDecrement}
                        />
                     );
                  })}

               <div
                  style={{
                     width: "100%",
                     display: "flex",
                     background: "#ffffff",
                     justifyContent: "flex-end",
                     boxShadow: "0 0 10px 10px #eee",
                     padding: "10px 0",
                  }}
               >
                  <div style={{ width: "250px" }}>
                     <MaterialButton
                        title="PLACE ORDER"
                        onClick={() => navigate("/checkout")}
                     />
                  </div>
               </div>
            </Card>
            <PriceDetails
               totalItem={Object.keys(cart.cartItems).reduce(function (
                  qty,
                  key
               ) {
                  return qty + cart.cartItems[key].quantity;
               },
               0)}
               totalPrice={Object.keys(cart.cartItems).reduce(
                  (totalPrice, key) => {
                     const { price, quantity } = cart.cartItems[key];
                     return totalPrice + price * quantity;
                  },
                  0
               )}
            />
         </div>
      </Layout>
   );
}

export default CartPage;
