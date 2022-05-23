import React, { useContext, useState } from "react";
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
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddressScreen from "./components/AddressScreen";
import SignUpScreen from "./components/SignUpScreen";

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOutHandler = () => {
    ctxDispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("address");
  };

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
              <Button
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                variant="contained"
              >
                <PersonIcon />
                {userInfo.name}
                <ArrowDropDownIcon />
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <Link to="/profile">
                  <MenuItem onClick={handleClose}>Profile</MenuItem>
                </Link>
                <Link to="/orders">
                  <MenuItem onClick={handleClose}>Orders</MenuItem>
                </Link>
                <Link to="/" onClick={signOutHandler}>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Link>
              </Menu>
            </div>
          ) : (
            <div className="nav-signin">
              <Link to="/signin">
                <Button variant="contained">Sign In</Button>
              </Link>
            </div>
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
            <Route path="/signup" element={<SignUpScreen />} />
            <Route path="/address" element={<AddressScreen />} />
          </Routes>
        </div>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
