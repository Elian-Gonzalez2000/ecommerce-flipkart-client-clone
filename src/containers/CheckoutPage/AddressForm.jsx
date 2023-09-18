import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress } from "../../actions";
import { MaterialButton, MaterialInput } from "../../components/MaterialUI";

const AddressForm = (props) => {
   const user = useSelector((state) => state.user);
   const [name, setName] = useState("");
   const [mobileNumber, setMobileNumber] = useState("");
   const [pinCode, setPinCode] = useState("");
   const [locality, setLocality] = useState("");
   const [address, setAddress] = useState("");
   const [cityDistrictTown, setCityDistrictTown] = useState("");
   const [state, setState] = useState("");
   const [landmark, setLandmark] = useState("");
   const [alternatePhone, setAlternatePhone] = useState("");
   const [addressType, setAddressType] = useState("");
   const [submitFlag, setSubmitFlag] = useState(false);
   const dispatch = useDispatch();

   const inputContainer = {
      width: "100%",
      marginRight: 10,
   };

   const onAddressSubmit = (e) => {
      const payload = {
         address: {
            name,
            mobileNumber,
            pinCode,
            locality,
            address,
            cityDistrictTown,
            state,
            landmark,
            alternatePhone,
            addressType,
         },
      };
      console.log(payload);
      dispatch(addAddress(payload));
      setSubmitFlag(true);
   };

   useEffect(() => {
      console.log("address count: ", user.address);
      if (submitFlag) {
         console.log("where we are ", user);
         const address = user.address.slice(user.address.length - 1)[0];
         props.onSubmitForm(address);
      }
   }, [user.address]);

   const renderAddressForm = () => {
      return (
         <>
            <div className="flexRow">
               <div style={inputContainer}>
                  <MaterialInput
                     label={"name"}
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </div>
               <div style={inputContainer}>
                  <MaterialInput
                     label={"10-digit mobile number"}
                     value={mobileNumber}
                     onChange={(e) => setMobileNumber(e.target.value)}
                  />
               </div>
            </div>
            <div className="flexRow">
               <div style={inputContainer}>
                  <MaterialInput
                     label={"Pincode"}
                     value={pinCode}
                     onChange={(e) => setPinCode(e.target.value)}
                  />
               </div>
               <div style={inputContainer}>
                  <MaterialInput
                     label={"Locality"}
                     value={locality}
                     onChange={(e) => setLocality(e.target.value)}
                  />
               </div>
            </div>
            <div className="flexRow">
               <div style={inputContainer}>
                  <MaterialInput
                     label={"Address"}
                     value={address}
                     onChange={(e) => setAddress(e.target.value)}
                  />
               </div>
            </div>
            <div className="flexRow">
               <div style={inputContainer}>
                  <MaterialInput
                     label={"City/District/Town"}
                     value={cityDistrictTown}
                     onChange={(e) => setCityDistrictTown(e.target.value)}
                  />
               </div>
               <div style={inputContainer}>
                  <MaterialInput
                     label={"State"}
                     value={state}
                     onChange={(e) => setState(e.target.value)}
                  />
               </div>
            </div>
            <div className="flexRow">
               <div style={inputContainer}>
                  <MaterialInput
                     label={"Landmark (Optional)"}
                     value={landmark}
                     onChange={(e) => setLandmark(e.target.value)}
                  />
               </div>
               <div style={inputContainer}>
                  <MaterialInput
                     label={"Alternate Phone (Optional)"}
                     value={alternatePhone}
                     onChange={(e) => setAlternatePhone(e.target.value)}
                  />
               </div>
            </div>
            <div>
               <label>Address Type</label>
               <div className="flexRow">
                  <div>
                     <input
                        type="radio"
                        onClick={() => setAddressType("home")}
                        name="addressType"
                        value="home"
                     />
                     <span>Home</span>
                  </div>
                  <div>
                     <input
                        type="radio"
                        onClick={() => setAddressType("work")}
                        name="addressType"
                        value="work"
                     />
                     <span>Work</span>
                  </div>
               </div>
            </div>
            <div className="flexRow">
               <MaterialButton
                  title="SAVE AND DELIVER HERE"
                  onClick={onAddressSubmit}
                  style={{
                     width: "250px",
                     margin: "20px 0",
                  }}
               />
            </div>
         </>
      );
   };

   if (props.withoutLayout) {
      return <div>{renderAddressForm}</div>;
   }

   return (
      <div className="checkout-step" style={{ background: "#f5faff" }}>
         <div className={"checkout-header"}>
            <div>
               <span className="step-number">+</span>
               <span className="step-title">{"ADD NEW ADDRESS"}</span>
            </div>
         </div>
         <div
            style={{
               padding: "0 60px",
               paddingBottom: "20px",
            }}
         ></div>
      </div>
   );
};

export default AddressForm;
