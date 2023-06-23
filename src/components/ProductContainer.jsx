/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import "../styles/productContainer.scss";

const DeviceContainer = ({ id, name, detail, image }) => {
  return (
    <div className="product-container">
      <div key={id} className="product">
        <Link className="product-link" to={`/detail/${id}`}>
          <div className="product-info">
            <h1>{name}</h1>
            <p>{detail}</p>
            <img className="product-img" src={image} alt="" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DeviceContainer;
