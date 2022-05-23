import React, { useReducer, useEffect, useContext } from "react";
import "../styles/GameScreen.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import Grid from "@mui/material/Grid";
import { Helmet } from "react-helmet-async";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { Store } from "../Store";
import Fade from "react-reveal/Fade";
import Button from "@mui/material/Button";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESSFUL":
      return { ...state, game: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function GameScreen() {
  const [{ loading, error, game }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    game: [],
  });

  const navigate = useNavigate();
  const params = useParams();

  const { slug } = params;

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get(
          `http://localhost:8000/api/games/slug/${slug}`
        );
        dispatch({ type: "FETCH_SUCCESSFUL", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error });
      }
    };

    fetchData();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;

  const addToCartHandler = () => {
    const existingItem = cart.cartItems.find((ele) => ele._id === game._id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...game, quantity: quantity },
    });

    navigate(`/cart`);
  };

  return (
    <Fade cascade>
      <div className="game-container">
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <ErrorScreen error={error} />
        ) : (
          <Grid
            container
            direction="row"
            justify="center"
            align="left"
            spacing={5}
          >
            <Grid item md={12} lg={4} className="game-item-main">
              <img
                width={"100%"}
                height={"100%"}
                alt={game.name}
                src={game.image}
              ></img>
            </Grid>
            <Grid item md={12} lg={8} className="game-item-main">
              <Grid
                container
                item
                direction="column"
                justify="center"
                align="left"
              >
                <Grid item className="game-name game-item">
                  <Helmet title={`${game.name} | GameShop`} />
                  <h1> {game.name}</h1>
                </Grid>
                <Grid item className="game-developer game-item">
                  <h3> {game.developer}</h3>
                </Grid>
                <Grid item className="game-rating game-item">
                  <h3>
                    {game.rating} ⭐ ({game.ratingCount} ratings) [
                    {game.downloadCount} downloads]
                  </h3>
                </Grid>
                <Grid item className="game-category game-item">
                  <h4>Category: {game.category}</h4>
                </Grid>
                <Grid item className="game-description game-item">
                  <h4>Description: {game.description}</h4>
                </Grid>
                <Grid item className="game-price game-item">
                  <h2>Price: {game.price}</h2>
                </Grid>
                <Grid item className="game-cart-button game-item">
                  <Button
                    variant="contained"
                    onClick={addToCartHandler}
                    className="gamne-add-to-cart-button"
                  >
                    ADD TO CART <ShoppingCartCheckoutIcon />
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        )}
      </div>
    </Fade>
  );
}

export default GameScreen;
