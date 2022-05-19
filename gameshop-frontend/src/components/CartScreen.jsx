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
    navigate("/signin?redirect=/shipping");
  };

  return (
    <Fade cascade>
      <div className="cart-main-container">
        <Helmet title={"Your Cart | GameShop"} />
        <h1>Your Cart</h1>
        {cartItems.length === 0 ? (
          <h2>
            Your cart is empty. <Link to="/">Go Shopping</Link>
          </h2>
        ) : (
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            align="left"
          >
            <Grid item lg={8} md={12}>
              {cartItems.map((item) => (
                <Fade left>
                  <Grid
                    key={item._id}
                    className="cart-item-container"
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    align="left"
                  >
                    <Grid item xs={1.5}>
                      <img
                        className="cart-item-image"
                        alt={item.slug}
                        src={item.image}
                      ></img>
                    </Grid>
                    <Grid item xs={5}>
                      <Link to={`/game/${item.slug}`}>{item.name}</Link>
                    </Grid>
                    <Grid item xs={2}>
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
                        <div>{item.quantity}</div>
                        <IconButton
                          color="primary"
                          onClick={() => {
                            updateCartHandler(item, item.quantity + 1);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </ButtonGroup>
                    </Grid>
                    <Grid item xs={2}>
                      ₹ {item.price}
                    </Grid>
                    <Grid item xs={1.5}>
                      <IconButton
                        color="primary"
                        onClick={() => {
                          removeItemHandler(item);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Fade>
              ))}
            </Grid>
            <Grid item lg={4} md={12}>
              <h2>
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
