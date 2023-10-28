import React from "react";
import "./style.css";

function Card({ headerLeft, headerRight, ...props }) {
   return (
      <article className={`card ${props.className}`} {...props}>
         {
            <div className="card-header">
               {headerLeft && <div className="header-left">{headerLeft}</div>}
               {headerRight && headerRight}
            </div>
         }

         {props.children}
      </article>
   );
}

export default Card;
