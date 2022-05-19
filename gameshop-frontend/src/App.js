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
import SignInScreen from "./components/SignInScreen";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function App() {
  const { state } = useContext(Store);
  const { cart, userInfo } = state;

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
          {userInfo ? (
            <div className="user-profile-menu">
              <Button>{userInfo.name}</Button>
              <Menu open={false}>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Orders</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link to="/signin">Sign In</Link>
          )}
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
            <Route path="/signin" element={<SignInScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
