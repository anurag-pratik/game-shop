import "../styles/OrderSummary.css";
import React, { useContext } from "react";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function OrderSummary() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round_to_two = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  cart.itemQuantity = round_to_two(
    cart.cartItems.reduce((a, c) => a + c.quantity, 0)
  );

  cart.totalAmount = round_to_two(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.tax = round_to_two((8 / 100) * cart.totalAmount);

  cart.totalPayableAmount = cart.totalAmount + cart.tax;

  const address = `Name: ${cart.address.name} 
  Address: ${cart.address.address}, ${cart.address.city},
  ${cart.address.country} - ${cart.address.pincode} `;

  return (
    <Fade cascade>
      <Helmet title="Order Summary | GameShop" />
      <div className="summary-container">
        <Grid
          container
          direction="row"
          justify="center"
          align="left"
          spacing={2}
        >
          <Grid item xs={12}>
            Order Summary
          </Grid>
          <Grid item xs={7}>
            {cart.cartItems.map((item) => (
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
                  <Grid item xs={2}>
                    <img
                      className="cart-item-image"
                      alt={item.slug}
                      src={item.image}
                    ></img>
                  </Grid>
                  <Grid item xs={5}>
                    <Link to={`/game/${item.slug}`}>{item.name}</Link>
                  </Grid>
                  <Grid item xs={1}>
                    {item.quantity}
                  </Grid>
                  <Grid item xs={2}>
                    ₹ {item.price}
                  </Grid>
                </Grid>
              </Fade>
            ))}
            <br />
            <Link to="/cart">Edit</Link>
          </Grid>

          <Grid item xs={5}>
            <Fade right>
              <div className="summary-card">
                Payment summary
                <div>
                  <Grid
                    className="cart-item-container"
                    container
                    direction="row"
                    spacing={1}
                    justify="center"
                    align="left"
                  >
                    <Grid item xs={8}>
                      Total Amount ({cart.itemQuantity} items):
                    </Grid>
                    <Grid item xs={4}>
                      ₹ {cart.totalAmount}
                    </Grid>
                    <Grid item xs={8}>
                      Tax (8%):
                    </Grid>
                    <Grid item xs={4}>
                      ₹ {cart.tax}
                    </Grid>
                    <Grid item xs={8}>
                      Total Amount Payable:
                    </Grid>
                    <Grid item xs={4}>
                      ₹ {cart.totalPayableAmount}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div>
                <Button variant="contained">Proceed to payment</Button>
              </div>
            </Fade>
            <Fade right>
              <div className="billing-summ-container summary-card">
                Billing Address
                <div>{address}</div>
                <br />
                <Link to="/address">Edit</Link>
              </div>
            </Fade>
          </Grid>
        </Grid>
      </div>
    </Fade>
  );
}

export default OrderSummary;
