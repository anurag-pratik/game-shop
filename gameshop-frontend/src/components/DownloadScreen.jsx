import "../styles/DownloadScreen.css";
import React, { useReducer, useEffect, useContext } from "react";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Store } from "../Store";
import { getError } from "../utils";
import axios from "axios";
import { Helmet } from "react-helmet-async";
import Fade from "react-reveal/Fade";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESSFUL":
      return { ...state, order: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function OrderScreen() {
  const navigate = useNavigate();

  const { state } = useContext(Store);

  const { userInfo } = state;

  const [{ loading, error, order }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    order: {},
  });

  const params = useParams();
  const { id: orderId } = params;

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: "FETCH_SUCCESSFUL", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    if (!userInfo) {
      return navigate("/login");
    }

    if (!order._id || (order._id && order._id !== orderId)) {
      fetchOrder();
    }
  }, [navigate, order._id, orderId, userInfo]);

  const downloadHandler = async () => {
    order.items.map(async (item) => {
      await axios
        .get(`/api/download/${item.slug}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        })
        .then((res) => window.open(res.data, "_blank"));
    });
  };

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen message={error} />
      ) : (
        <div className="order-screen-container">
          <Helmet>
            <title>Order - {orderId} | GameShop</title>
          </Helmet>
          <Grid
            container
            direction="row"
            justify="center"
            align="left"
            spacing={2}
          >
            <Grid item xs={12}>
              <h1 className="download-header-text">Order - {orderId}</h1>
            </Grid>
            <Grid item lg={7} xs={12}>
              {order.items.map((item) => (
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
                    <Grid item lg={2} xs={4}>
                      <img
                        className="cart-item-image"
                        alt={item.slug}
                        src={item.image}
                      ></img>
                    </Grid>
                    <Grid item lg={5} xs={5}>
                      <Link to={`/game/${item.slug}`}>{item.name}</Link>
                    </Grid>
                    <Grid item lg={1} xs={3}>
                      {item.quantity}
                    </Grid>
                    <Grid item lg={2} xs={12}>
                      ₹ {item.price}
                    </Grid>
                  </Grid>
                </Fade>
              ))}
            </Grid>

            <Grid item xs={5}>
              <Fade right>
                <div className="summary-card-3">
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
                        Total Amount :
                      </Grid>
                      <Grid item xs={4}>
                        ₹ {order.itemsPrice}
                      </Grid>
                      <Grid item xs={8}>
                        Tax (8%):
                      </Grid>
                      <Grid item xs={4}>
                        ₹ {order.tax}
                      </Grid>
                      <Grid item xs={8}>
                        Total Amount Payable:
                      </Grid>
                      <Grid item xs={4}>
                        ₹ {order.totalPrice}
                      </Grid>
                    </Grid>
                    <Button className="paid-tag" variant="contained" disabled>
                      PAID
                    </Button>
                  </div>
                </div>
              </Fade>
              <Fade right>
                <div>
                  <Button variant="contained" onClick={downloadHandler}>
                    Download
                  </Button>
                  <br />
                  <h4 className="note-text">
                    Note : Please make sure that pop-ups are not blocked on your
                    browser.
                  </h4>
                </div>
              </Fade>
              <Fade right>
                <div className="billing-summ-container summary-card">
                  <h3>Billing Address</h3>
                  <div className="download-address">
                    {order.address.name}
                    <br />
                    {order.address.address}
                    <br />
                    {order.address.city}
                    <br />
                    {order.address.pincode}
                    <br />
                    {order.address.country}
                  </div>
                </div>
              </Fade>
            </Grid>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default OrderScreen;
