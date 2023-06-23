import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProducts } from "../service";
import NavBar from "../components/NavBar";
import axios from "axios";

import "../styles/addProduct.scss";

const Create = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState("");
  const [isRequired, setIsRequired] = useState(!id);

  const addArticle = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("detail", detail);

    if (image) {
      formData.append("image", image);
    }

    if (!id) {
      axios
        .post("http://localhost/php/index.php", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);
          navigate("/");
        });
    } else {
      formData.append("id", id);
      axios
        .post(`http://localhost/php/index.php?id=${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(function (response) {
          console.log(response.data);
          navigate("/");
        });
    }
  };

  useEffect(() => {
    if (id) {
      const fetchProducts = async () => {
        const products = await getProducts(id);
        setName(products.name);
        setDetail(products.detail);
      };
      fetchProducts();
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setIsRequired(!id);
  }, [id]);

  return (
    <div>
      <NavBar />
      <main>
        <form onSubmit={addArticle} className="form-create">
          <h1>Nový produkt</h1>

          <input
            type="text"
            name="name"
            id="name"
            placeholder="Název produktu"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="text"
            name="detail"
            id="detail"
            placeholder="Popis produktu"
            value={detail}
            required
            onChange={(e) => setDetail(e.target.value)}
          />

          <input
            type="file"
            name="image"
            id="image"
            required={isRequired}
            onChange={(e) => setImage(e.target.files[0])}
          />
          <button>Přidat produkt</button>
        </form>
      </main>
    </div>
  );
};

export default Create;
