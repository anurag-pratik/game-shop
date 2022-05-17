import React, { useContext } from "react";
import "./App.css";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./components/HomeScreen";
import GameScreen from "./components/GameScreen";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Badge from "@mui/material/Badge";
import { Store } from "./Store";
import CartScreen from "./components/CartScreen";
import Flip from "react-reveal/Flip";

function App() {
  const { state } = useContext(Store);
  const { cart } = state;

  return (
    <div className="App">
      <BrowserRouter>
        <div className="header-container">
          <Link to="/">
            <h1 className="header-text">
              <Flip left cascade>
                GAMESHOP
              </Flip>
            </h1>
          </Link>
          <Link to="/cart">
            <div className="header-cart-icon">
              <Badge
                badgeContent={cart.cartItems.reduce(
                  (a, c) => a + c.quantity,
                  0
                )}
              >
                <ShoppingCartIcon />
              </Badge>
            </div>
          </Link>
        </div>

        <div className="main-container">
          <Routes>
            <Route path="/game/:slug" element={<GameScreen />} />
            <Route path="/" element={<HomeScreen />} />
            <Route path="/cart" element={<CartScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
