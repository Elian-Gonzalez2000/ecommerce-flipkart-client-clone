import fkLogo from "../../images/fk-logo.png";
import fk404 from "../../images/error-404-flipkart.png";
import { MaterialButton } from "../../components/MaterialUI";
import "./styles.css";

const Error404 = () => {
   return (
      <div>
         <div className="logo-container">
            <picture>
               <img src={fkLogo} alt="Logo de Flipkart" />
            </picture>
         </div>
         <section className="info-container">
            <img src={fk404} alt="Error 404 image" />
            <p style={{ marginBottom: "1rem" }}>
               Unfortunately the page you are looking for has been moved or
               deleted
            </p>
            <MaterialButton title="GO TO HOMEPAGE" />
         </section>
      </div>
   );
};

export default Error404;
