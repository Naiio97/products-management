import { useEffect, useState } from "react";
import ProductContainer from "../components/ProductContainer";
import { getProducts } from "../service";
import { MdSearch } from "react-icons/md";

import "../styles/products.scss";
import NavBar from "../components/NavBar";

const Products = () => {
  const [searchedProduct, setSearchedProduct] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      const fetchedProducts = await getProducts();
      const shortenedProducts = fetchedProducts.map((product) => {
        if (product.detail.length > 80) {
          const shortenedText = product.detail.substring(0, 80) + "...";
          return { ...product, detail: shortenedText };
        }
        return product;
      });

      let filteredProducts = shortenedProducts;
      if (search) {
        filteredProducts = shortenedProducts.filter((product) =>
          product.name.toLowerCase().includes(search)
        );
      }
      setSearchedProduct(filteredProducts);
    };

    fetchAndFilterProducts();
  }, [search]);

  return (
    <>
      <NavBar />
      <main>
        <div className="search-bar">
          <div className="search-model">
            <MdSearch />
            <input
              id="search"
              type="text"
              placeholder="Hledat model"
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            ></input>
          </div>
        </div>

        <div className="products-container">
          {searchedProduct.map((product) => (
            <ProductContainer
              key={product.id}
              id={product.id}
              name={product.name}
              detail={product.detail}
              image={product.image}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export default Products;
