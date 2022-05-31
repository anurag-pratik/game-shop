import React, { useContext } from "react";
import "../styles/CartScreen.css";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Grid from "@mui/material/Grid";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";

function CartScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const updateCartHandler = async (item, quantity) => {
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity: quantity },
    });
  };

  const removeItemHandler = async (item) => {
    ctxDispatch({
      type: "CART_REMOVE_ITEM",
      payload: item,
    });
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/address");
  };

  return (
    <Fade cascade>
      <div className="cart-main-container">
        <Helmet title={"Your Cart | GameShop"} />
        <h1>Your Cart</h1>
        <br />
        {cartItems.length === 0 ? (
          <h2>
            Your cart is empty.{" "}
            <Link to="/">
              <u>Go Shopping</u>
            </Link>
          </h2>
        ) : (
          <Grid
            container
            direction="row"
            spacing={4}
            justify="center"
            align="left"
            className="cart-inner-container"
          >
            <Grid item lg={8} md={12}>
              {cartItems.map((item) => (
                <Fade left key={item._id}>
                  <Grid
                    className="cart-item-container"
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    align="left"
                  >
                    <Grid item md={1.5} xs={3.5}>
                      <img
                        className="cart-item-image"
                        alt={item.slug}
                        src={item.image}
                      ></img>
                    </Grid>
                    <Grid item md={5} xs={4.5}>
                      <Link to={`/game/${item.slug}`}>{item.name}</Link>
                    </Grid>
                    <Grid item md={2} xs={4}>
                      <ButtonGroup
                        variant="outlined"
                        aria-label="outlined button group"
                      >
                        <IconButton
                          disabled={item.quantity === 1}
                          color="primary"
                          onClick={() => {
                            updateCartHandler(item, item.quantity - 1);
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                        <div className="quant-container">{item.quantity}</div>
                        <IconButton
                          className="icon-button"
                          color="primary"
                          onClick={() => {
                            updateCartHandler(item, item.quantity + 1);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Grid>
                    <Grid item md={2} xs={6}>
                      <div className="cart-price-cont">₹ {item.price}</div>
                    </Grid>
                    <Grid item md={1.5} xs={6}>
                      <div className="cart-price-cont">
                        <IconButton
                          className="icon-button"
                          color="primary"
                          onClick={() => {
                            removeItemHandler(item);
                          }}
                        >
                          <DeleteIcon className="icon-button" />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                </Fade>
              ))}
            </Grid>
            <Grid item lg={4} md={12}>
              <h2 className="cart-proceed-text">
                Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                items): ₹{" "}
                {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
              </h2>

              <Button
                variant="contained"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </Grid>
          </Grid>
        )}
      </div>
    </Fade>
  );
}

export default CartScreen;
