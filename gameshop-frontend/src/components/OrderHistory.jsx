import "../styles/OrderHistory.css";
import React, { useReducer, useEffect, useContext } from "react";
import { Helmet } from "react-helmet-async";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import axios from "axios";
import { Store } from "../Store";
import { useNavigate } from "react-router-dom";
import { getError } from "../utils";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESSFUL":
      return { ...state, orders: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    orders: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/orders/all", {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        });
        dispatch({ type: "FETCH_SUCCESSFUL", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: getError(error) });
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <div className="orders-container">
      <Helmet title="Your Orders | GameShop" />
      {loading ? (
        <LoadingScreen />
      ) : error ? (
        <ErrorScreen message={error} />
      ) : (
        <div>
          Your Orders
          <Grid
            container
            direction="row"
            spacing={1}
            justify="center"
            align="center"
          >
            <Grid item xs={4}>
              ID
            </Grid>
            <Grid item xs={2}>
              Date
            </Grid>
            <Grid item xs={3}>
              Total
            </Grid>
            <Grid item xs={3}></Grid>
            {orders.map((order) => {
              return (
                <Grid
                  container
                  direction="row"
                  spacing={1}
                  justify="center"
                  align="center"
                >
                  <Grid item xs={4}>
                    {order._id}
                  </Grid>
                  <Grid item xs={2}>
                    {order.createdAt.substring(0, 10)}
                  </Grid>
                  <Grid item xs={3}>
                    {order.totalPrice}
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        navigate(`/order/${order._id}`);
                      }}
                    >
                      Details
                    </Button>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
