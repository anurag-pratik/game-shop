import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";
import Grid from "@mui/material/Grid";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import Zoom from "react-reveal/Zoom";
import { Store } from "../Store";
import Button from "@mui/material/Button";

function GameCard(props) {
  const { game } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = (game) => {
    const existingItem = cartItems.find((ele) => ele._id === game._id);

    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...game, quantity: quantity },
    });
  };

  return (
    <div className="game-card-zoom-container">
      <Zoom>
        <div className="game-card">
          <Link to={`/game/${game.slug}`}>
            <Grid
              container
              direction="row"
              spacing={1}
              justify="center"
              align="left"
            >
              <Grid item xs={12} className="card-item-1 card-item">
                <h2 className="name-text">{game.name}</h2>
              </Grid>
              <Grid item xs={12} className="card-item-2 card-item">
                <h3 className="dev-text">{game.developer}</h3>
              </Grid>

              <Grid item lg={6} xs={5} className="card-item-3 card-item">
                <h4 className="rating-text">
                  {game.rating} ⭐ ({game.ratingCount})
                </h4>
              </Grid>
              <Grid
                item
                lg={6}
                xs={7}
                align="right"
                className="card-item-3 card-item"
              >
                <h4 className="dow-text">[{game.downloadCount} downloads]</h4>
              </Grid>

              <Grid item xs={6} className="card-item-4 card-item">
                <img
                  width={"100%"}
                  height={"98%"}
                  alt={game.name}
                  src={game.image}
                ></img>
              </Grid>
              <Grid item xs={6} className="card-item-4 card-item">
                <h4 className="desc-text">{game.description}</h4>
              </Grid>
            </Grid>
          </Link>

          <Grid
            container
            direction="row"
            spacing={2}
            justify="center"
            align="left"
            className="bottom-item"
          >
            <Grid item xs={4} className="card-item-5 card-item">
              <h3 className="price-text">Price: ₹ {game.price}</h3>
            </Grid>
            <Grid item xs={8} align="right" className="card-item-5 card-item">
              <Button
                variant="contained"
                className="add-to-cart-button"
                onClick={() => {
                  addToCartHandler(game);
                }}
              >
                <span className="cart-text">ADD TO CART</span>
                <ShoppingCartCheckoutIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      </Zoom>
    </div>
  );
}

export default GameCard;
