import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProductsBySlug } from "../../actions";
import Layout from "../../components/Layout";
import "./styles.css";

const ProductListPage = (props) => {
   const dispatch = useDispatch();

   useEffect(() => {
      const { match } = props;
      dispatch(getProductsBySlug(match.params.slug));
   }, []);
   return (
      <Layout>
         <h1>Home page</h1>
      </Layout>
   );
};

export default ProductListPage;
