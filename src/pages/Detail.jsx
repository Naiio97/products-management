import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducts } from "../service";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "../styles/detail.scss";
import NavBar from "../components/NavBar";

const Detail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const fetchProducts = async () => {
    const products = await getProducts(id);
    setName(products.name);
    setDetail(products.detail);
    setImage(products.image);
  };
  fetchProducts();

  const handleDeleteProduct = () => {
    axios.delete(`http://localhost/php/index.php/${id}}`).then(function () {
      navigate("/");
    });
  };

  const handleEditProduct = () => {
    navigate(`/edit-product/${id}`);
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <>
      <NavBar />
      <main>
        <div className="detail-container">
          <div className="info">
            <h1>{name}</h1>
            <p>{detail}</p>
            {isLogged && (
              <div className="buttons">
                <button className="btn" onClick={() => handleEditProduct()}>
                  Upravit
                </button>
                <button className="btn" onClick={() => handleDeleteProduct()}>
                  Smazat
                </button>
              </div>
            )}
          </div>
          <div className="image">
            <img src={image} alt="" />
          </div>
        </div>
      </main>
    </>
  );
};

export default Detail;
