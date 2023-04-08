import React from "react";
import Layout from "../../components/Layout";
import Card from "../../components/UI/Card";

function CartPage(props) {
   return (
      <Layout>
         <div className="cart-container">
            <Card headerLeft={"My Cart"} headerRight={<div>Delivered to</div>}>
               <div className="flexRow"></div>
            </Card>
         </div>
      </Layout>
   );
}

export default CartPage;
