import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./CartItem";
import { addToCart, getCartItems, removeCartItem } from "../../actions";
import { MaterialButton } from "../../components/MaterialUI";
import { useNavigate } from "react-router-dom";
import PriceDetails from "../../components/PriceDetails";
import "./styles.css";
import Loader from "../../components/UI/Loader";

function CartPage(props) {
   const cart = useSelector((state) => state.cart);
   const auth = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
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
      const { name, price, cartItemImg } = cartItems[_id];
      dispatch(addToCart({ _id, name, price, cartItemImg }, 1));
   };

   const onQuantityDecrement = (_id, qty) => {
      const { name, price, cartItemImg } = cartItems[_id];
      dispatch(addToCart({ _id, name, price, cartItemImg }, -1));
   };

   const onRemoveCartItem = (_id) => {
      console.log(_id);
      dispatch(removeCartItem({ productId: _id }));
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
      <Layout className="cart-container">
         {cart.updatingCart && <Loader />}
         <Card
            headerLeft={`My Cart  ${
               cartItems ? "(" + Object.keys(cartItems).length + ")" : ""
            }`}
            headerRight={<div>Delivered to</div>}
            classNames={"cart-items-container"}
         >
            {cartItems &&
               Object.keys(cartItems).map((item, index) => {
                  return (
                     <CartItem
                        key={index}
                        cartItem={cartItems[item]}
                        onQuantityInc={onQuantityIncrement}
                        onQuantityDec={onQuantityDecrement}
                        onRemoveCartItem={onRemoveCartItem}
                     />
                  );
               })}

            <div className="place-order-container">
               <div style={{ width: "250px" }}>
                  <MaterialButton
                     title="PLACE ORDER"
                     onClick={() => navigate("/checkout")}
                  />
               </div>
            </div>
         </Card>
         <PriceDetails
            totalItem={
               cart.cartItems &&
               Object.keys(cart.cartItems).reduce(function (qty, key) {
                  return qty + cart.cartItems[key].quantity;
               }, 0)
            }
            totalPrice={
               cart.cartItems &&
               Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                  const { price, quantity } = cart.cartItems[key];
                  return totalPrice + price * quantity;
               }, 0)
            }
         />
      </Layout>
   );
}

export default CartPage;
