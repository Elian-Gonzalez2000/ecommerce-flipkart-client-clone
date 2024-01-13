import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Carousel } from "react-responsive-carousel";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions";
import banner1 from "./banners/banner-principal-1.webp";
import banner2 from "./banners/banner-principal-2.webp";
import banner3 from "./banners/banner-principal-3.webp";
import "./styles.css";
import Card from "../../components/UI/Card";
import { genericPublicUrl } from "../../urlConfig";
import { Link } from "react-router-dom";

const HomePage = (props) => {
   const product = useSelector((state) => state.product);
   const categories = useSelector((state) => state.category.categories);
   const dispatch = useDispatch();
   const [productSamsung, setProductSamsung] = useState({});

   useEffect(() => {
      dispatch(getAllProducts());
   }, []);

   const bestProduct = (category) => {
      const principalProduct = product.products.find(
         (item) => item.category.name === category
      );
      if (!principalProduct) return;
      console.log(principalProduct);
      return (
         <Link
            to={`/${principalProduct.slug}/${principalProduct._id}/p`}
            className="best-mobile"
         >
            <picture>
               <img
                  src={genericPublicUrl(
                     principalProduct.productPictures[0].img
                  )}
                  alt={principalProduct.name}
               />
            </picture>
            <p>{principalProduct.name}</p>
            <p style={{ fontWeight: "500" }}>Incl of offers</p>
         </Link>
      );
   };

   return (
      <Layout className={"home-container"}>
         <section>
            <Carousel
               infiniteLoop={true}
               autoPlay={true}
               interval={4000}
               showThumbs={false}
            >
               <div>
                  <img src={banner1} />
               </div>
               <div>
                  <img src={banner2} />
               </div>
               <div>
                  <img src={banner3} />
               </div>
            </Carousel>
         </section>

         <Card
            classNames={"best-articles-container"}
            headerLeft={"Best Mobiles"}
         >
            {product.products.length > 0 && bestProduct("Samsung")}
         </Card>
         <Card classNames={"best-articles-container"} headerLeft={"Top Jeans"}>
            {product.products.length > 0 && bestProduct("Jeans")}
         </Card>
      </Layout>
   );
};

export default HomePage;
