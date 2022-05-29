import "../styles/OrderSummary.css";
import React, { useContext, useReducer } from "react";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet-async";
import { Store } from "../Store";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
import { getError } from "../utils";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

const reducer = (state, action) => {
  switch (action.type) {
    case "CREATE_REQUEST":
      return { ...state, loading: true };
    case "CREATE_SUCCESS":
      return { ...state, loading: false };
    case "CREATE_FAIL":
      return { ...state, loading: false };
    default:
      return state;
  }
};

function OrderSummary() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round_to_two = (num) => Math.round((num + Number.EPSILON) * 100) / 100;

  cart.itemQuantity = round_to_two(
    cart.cartItems.reduce((a, c) => a + c.quantity, 0)
  );

  cart.itemsPrice = round_to_two(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.tax = round_to_two((8 / 100) * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.tax;

  const address = `Name: ${cart.address.name} 
  Address: ${cart.address.address}, ${cart.address.city},
  ${cart.address.country} - ${cart.address.pincode} `;

  const loadRazorPay = (scr) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = scr;
      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  const showRazorPay = async (amount, id) => {
    return new Promise(async (resolve) => {
      const res = await loadRazorPay(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        alert("You are offline! Failed to load RazorPay SDK. :-(");
        return;
      }

      const { data: clientId } = await axios.get("/api/keys/razorpay", {
        headers: {
          authorization: `Bearer ${userInfo.token}`,
        },
      });

      var options = {
        key: clientId,
        amount: amount * 100,
        currency: "INR",
        name: "GameShop",
        description: "Thank You for purchasing from GameShop.",
        handler: function (response) {
          resolve(true);
          navigate(`/order/${id}`);
        },
        prefill: {
          name: "Example Kumar",
          email: "example.kumar@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#4b0082",
        },
      };

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();

      paymentObject.on("payment.failed", function (response) {
        alert(response.error.description);
      });
    });
  };

  const submitOrderHandler = async () => {
    try {
      dispatch({ type: "CREATE_REQUEST" });
      const { data } = await axios.post(
        "/api/orders",
        {
          items: cart.cartItems,
          address: cart.address,
          itemsPrice: cart.itemsPrice,
          tax: cart.tax,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      await showRazorPay(cart.totalPrice, data.order._id);

      ctxDispatch({ type: "CART_CLEAR" });
      dispatch({ type: "CREATE_SUCCESS" });
      localStorage.removeItem("cartItems");
    } catch (err) {
      dispatch({ type: "CREATE_FAIL" });
      alert(getError(err));
    }
  };

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
                      ₹ {cart.itemsPrice}
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
                      ₹ {cart.totalPrice}
                    </Grid>
                  </Grid>
                </div>
              </div>
            </Fade>
            <Fade right>
              <div>
                <Button onClick={submitOrderHandler} variant="contained">
                  Proceed to payment
                </Button>
                {loading && <CircularProgress color="secondary" />}
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
