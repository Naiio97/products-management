import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import axios from "axios";

import "../styles/login.scss";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const [isLogged, setIsLogged] = useState(false); //

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", user);
    formData.append("pass", pass);

    axios
      .post("http://localhost/php/login.php", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        let result = response.data["message"];
        if (result === "Invalid username!" || result === "Invalid password!") {
          setError({ message: result });
        } else {
          const token = generateToken();
          localStorage.setItem("token", token);
          localStorage.setItem("user", user);
          setIsLogged(true);
          navigate("/");
        }
      });
  };

  const generateToken = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let token = "";
    for (let i = 0; i < 32; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  };

  return (
    <>
      <NavBar isLogged={isLogged} setIsLogged={setIsLogged} />
      <div className="form-login">
        <h1>Příhlášení</h1>
        <p>Po přihlášení si budeš moct pujčit telefon, případně vložit nový.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="user"
            id="user"
            placeholder="Přihlašovací jméno"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            name="pass"
            id="pass"
            placeholder="Heslo"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            required
          />
          <br />
          <p className="error">{error.message}</p>
          <button className="btn" type="submit">
            Přihlásit se
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
