import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

import "../styles/navBar.scss";

const NavBar = () => {
  const navigate = useNavigate();
  const [isLogged, setIsLogged] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLogged(false);
    navigate("/login");
  };

  const responsiveMenu = () => {
    let iconM = document.querySelector(".bar");
    let iconS = document.querySelector(".search-bar");
    if (iconM.className === "bar") {
      iconM.className += " responsive-menu";
      if (iconS.classList.contains("responsive-search")) {
        iconS.classList.remove("responsive-search");
      }
    } else {
      iconM.className = "bar";
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, []);

  return (
    <header>
      <div className="bar">
        <NavLink to="/" className="btn-nav">
          Seznam produktů
        </NavLink>
        {isLogged && (
          <NavLink to="/add-product" className="btn-nav">
            Přidat product
          </NavLink>
        )}
        {!isLogged ? (
          <NavLink to="/login" className="log">
            Přihlásit
          </NavLink>
        ) : (
          <button className="log" onClick={logout}>
            Odhlásit
          </button>
        )}
      </div>
      <button className="hamburger" onClick={responsiveMenu}>
        <GiHamburgerMenu />
      </button>
    </header>
  );
};

export default NavBar;
