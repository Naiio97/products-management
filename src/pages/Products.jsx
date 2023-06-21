import { useEffect, useState } from "react";
import axios from "axios";
import ProductContainer from "../components/ProductContainer";
import { getProducts } from "../service";
//import { GiConfirmed } from 'react-icons/gi';

import "../styles/products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    const products = await getProducts();
    setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = (id) => {
    axios
      .delete(`http://localhost/php/index.php/${id}}`)
      .then(function () {
        getProducts().then((fetchedProducts) => {
          setProducts(fetchedProducts);
        });
      });
  };

  return (
    <main>
      <div className="products-container">
        {products.map((product) => (
          <ProductContainer
            key={product.id}
            id={product.id}
            name={product.name}
            detail={product.detail}
            onDeleteProduct={handleDeleteProduct}
          />
        ))}
      </div>
    </main>
  );
};

export default Products;
