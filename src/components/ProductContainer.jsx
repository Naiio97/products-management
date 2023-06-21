/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import "../styles/productContainer.scss";

import { RxCross2 } from "react-icons/rx";

const DeviceContainer = ({ id, name, detail, onDeleteProduct }) => {
  const [display, setDisplay] = useState("none");

  const deleteProduct = (id) => {
    axios.delete(`http://localhost/php/index.php/${id}`).then(function(response){
      console.log(response.data);
      onDeleteProduct(id);
    });
  };
  

  let button;

  const showButton = (e) => {
    e.preventDefault();
    setDisplay("block");
  };

  const hideButton = (e) => {
    e.preventDefault();
    setDisplay("none");
  };

  return (
    <div
      className="product-container"
      onMouseEnter={(e) => showButton(e)}
      onMouseLeave={(e) => hideButton(e)}
    >
      <div key={id} className="product-div">
        <RxCross2 className={display} onClick={() => deleteProduct(id)} />
        <div className="product-info">
          <h1>{name}</h1>
          <p>{detail}</p> <br />
        </div>
        {button}
      </div>
    </div>
  );
};

export default DeviceContainer;
