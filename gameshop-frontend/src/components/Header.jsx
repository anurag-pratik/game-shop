import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

function Header() {
  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="header-text">GAMESHOP</h1>
      </Link>

      <div className="header-cart-icon">
        <ShoppingCartIcon />
      </div>
    </div>
  );
}

export default Header;
