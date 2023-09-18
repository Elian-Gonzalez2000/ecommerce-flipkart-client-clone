import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getAddress } from "../../actions";
import {
   Anchor,
   MaterialButton,
   MaterialInput,
} from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import Card from "../../components/UI/Card";
import "./style.css";
import PriceDetails from "../../components/PriceDetails";

const CheckoutStep = (props) => {
   return (
      <div className="checkout-step">
         <div
            onClick={props.onClick}
            className={`checkout-header ${props.active && "active"}`}
         >
            <div>
               <span className="step-number">{props.stepNumber}</span>
               <span className="step-title">{props.title}</span>
            </div>
         </div>
         {props.body && props.body}
      </div>
   );
};

const CheckoutPage = (props) => {
   const user = useSelector((state) => state.user);
   const auth = useSelector((state) => state.auth);
   const cart = useSelector((state) => state.cart);
   const [address, setAddress] = useState([]);
   const [newAddress, setNewAddress] = useState(false);
   const [confirmAddress, setConfirmAddress] = useState(false);
   const [selectedAddress, setSelectedAddress] = useState(null);

   const dispatch = useDispatch();
   const onAddressSubmit = (addr) => {
      setSelectedAddress(addr);
      setConfirmAddress(true);
   };

   const confirmDeliveryAddress = (addr) => {
      setSelectedAddress(addr);
      setConfirmAddress(true);
   };

   const selectAddress = (addr) => {
      console.log("addr", addr);

      const updatedAddress = address.map((adr) =>
         adr._id === addr._id
            ? { ...adr, selected: true }
            : { ...adr, selected: false }
      );
      setAddress(updatedAddress);
      console.log("adr", address);
   };

   useEffect(() => {
      auth.authenticate && dispatch(getAddress());
   }, [auth.authenticate]);

   useEffect(() => {
      const address = user.address.map((adr) => ({
         ...adr,
         selected: false,
         edit: false,
      }));
      setAddress(address);
      //user.address.length === 0 && setNewAddress(true);
   }, [user.address]);

   return (
      <Layout>
         {
            <div
               className="cart-container"
               style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  marginTop: "1rem",
               }}
            >
               <div className="checkout-container">
                  <CheckoutStep
                     stepNumber={"1"}
                     title={"LOGIN"}
                     active={!auth.authenticate}
                     body={
                        auth.authenticate ? (
                           <div className="logged-in-id">
                              <span style={{ fontWeight: "500" }}>
                                 {auth.user.fullName}
                              </span>
                              <span style={{ margin: "0 5px" }}>
                                 {auth.user.email}
                              </span>
                           </div>
                        ) : (
                           <div>
                              {" "}
                              <MaterialInput label="Email" />
                           </div>
                        )
                     }
                  />

                  <CheckoutStep
                     stepNumber={"2"}
                     title={"DELIVERY ADDRESS"}
                     active={!confirmAddress && auth.authenticate}
                     body={
                        <>
                           {confirmAddress ? (
                              <div>{`${selectedAddress.address} - ${selectedAddress.pinCode}`}</div>
                           ) : (
                              address.map((adr) => (
                                 <div
                                    className="flexRow address-container"
                                    key={`${adr.id}`}
                                 >
                                    <div>
                                       <input
                                          name="address"
                                          type="radio"
                                          onClick={() => selectAddress(adr)}
                                       />
                                    </div>
                                    <div className="flexRow sb address-info">
                                       {!adr.edit ? (
                                          <div className="address-detail">
                                             <div>
                                                <div
                                                   style={{
                                                      marginBottom: "1rem",
                                                   }}
                                                >
                                                   <span className="address-name">
                                                      {adr.name}
                                                   </span>
                                                   <span className="address-type">
                                                      {adr.addressType}
                                                   </span>
                                                   <span className="address-mobile-number">
                                                      {adr.mobileNumber}
                                                   </span>
                                                </div>

                                                <div className="full-address">
                                                   {adr.address} <br />
                                                   {`${adr.state} - ${adr.pinCode}`}
                                                </div>
                                                {adr.selected && (
                                                   <MaterialButton
                                                      title="DELIVERY HERE"
                                                      onClick={() =>
                                                         confirmDeliveryAddress(
                                                            adr
                                                         )
                                                      }
                                                      style={{
                                                         width: "250px",
                                                         margin: "10px 0",
                                                      }}
                                                   />
                                                )}
                                             </div>
                                             {adr.selected && (
                                                <Anchor
                                                   name="EDIT"
                                                   onClick={() =>
                                                      enableAddressEditForm(adr)
                                                   }
                                                   style={{
                                                      fontWeight: "500",
                                                      color: "#2874f0",
                                                   }}
                                                />
                                             )}
                                          </div>
                                       ) : (
                                          <AddressForm
                                             withoutLayout={true}
                                             onSubmitForm={onAddressSubmit}
                                             onCancel={() => {}}
                                          />
                                       )}
                                    </div>
                                 </div>
                              ))
                           )}
                        </>
                     }
                  />

                  {/* Address Form */}

                  {confirmAddress ? null : newAddress ? (
                     <AddressForm
                        onSubmitForm={onAddressSubmit}
                        onCancel={() => {}}
                     />
                  ) : (
                     <CheckoutStep
                        stepNumber={"+"}
                        title={"ADD NEW ADDRESS"}
                        active={false}
                        onClick={() => setNewAddress(true)}
                     />
                  )}

                  <CheckoutStep stepNumber={"3"} title={"ORDER SUMMARY"} />
               </div>
               {/* Price Component */}
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
         }
      </Layout>
   );
};

export default CheckoutPage;
