import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";
import { useDispatch } from "react-redux";
import { getOrders } from "../../actions";

const OrderPage = (props) => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(getOrders());
   }, []);
   return (
      <Layout>
         <Card style={{ maxWidth: "1200px", margin: "5px auto" }}>
            <div className="orderItemContainer">
               <div>img</div>
               <div>name</div>
               <div>price</div>
               <div>order Status</div>
            </div>
         </Card>
      </Layout>
   );
};

export default OrderPage;
