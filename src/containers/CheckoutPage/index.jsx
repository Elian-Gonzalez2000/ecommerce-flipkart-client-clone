import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import { getAddress } from "../../actions";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";
import AddressForm from "./AddressForm";
import Card from "../../components/UI/Card";
import "./style.css";

const CheckoutStep = (props) => {
   return (
      <div className="checkout-step">
         <div className={`checkout-header ${props.active && "active"}`}>
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
   const dispatch = useDispatch();
   const onAddressSubmit = () => {};

   useEffect(() => {
      dispatch(getAddress());
   }, []);

   return (
      <Layout>
         {
            <div
               className="cart-container"
               style={{ alignItems: "flex-start" }}
            >
               <div className="checkout-container">
                  <CheckoutStep
                     stepNumber={"1"}
                     title={"LOGIN"}
                     active={!auth.authenticate}
                     body={
                        <div className="logged-in-id">
                           <span style={{ fontWeight: "500" }}>
                              {auth.user.fullName}
                           </span>
                           <span style={{ margin: "0 5px" }}>
                              {auth.user.email}
                           </span>
                        </div>
                     }
                  />

                  <CheckoutStep
                     stepNumber={"2"}
                     title={"DELIVERY ADDRESS"}
                     active={true}
                     body={
                        <>
                           {user.address.map((adr) => (
                              <div className="flexRow address-container">
                                 <div>
                                    <input name="address" type="radio" />
                                 </div>
                                 <div className="flexRow sb address-info">
                                    <div>
                                       <div>
                                          <span>{adr.name}</span>
                                          <span>{adr.addressType}</span>
                                          <span>{adr.mobileNumber}</span>
                                       </div>
                                       <div>{adr.address}</div>
                                       <MaterialButton
                                          title="DELIVERY HERE"
                                          style={{ width: "250px" }}
                                       />
                                    </div>
                                    <div>edit</div>
                                 </div>
                              </div>
                           ))}
                        </>
                     }
                  />

                  {/* Address Form */}
                  <AddressForm
                     onSubmitForm={onAddressSubmit}
                     onCancel={() => {}}
                  />
                  <CheckoutStep stepNumber={"3"} title={"ORDER SUMMARY"} />
               </div>
            </div>
         }
      </Layout>
   );
};

export default CheckoutPage;
