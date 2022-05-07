import React from "react";
import { Link } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <div className="header-container">
      <Link to="/">
        <h1 className="header-text">GAMESHOP</h1>
      </Link>
    </div>
  );
}

export default Header;
