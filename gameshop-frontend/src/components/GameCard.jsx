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
                <h2>{game.name}</h2>
              </Grid>
              <Grid item xs={12} className="card-item-2 card-item">
                <h3>{game.developer}</h3>
              </Grid>

              <Grid item xs={6} className="card-item-3 card-item">
                {game.rating} ⭐ ({game.ratingCount})
              </Grid>
              <Grid item xs={6} align="right" className="card-item-3 card-item">
                <h4>[{game.downloadCount} downloads]</h4>
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
                <h4>{game.description}</h4>
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
            <Grid item xs={6} className="card-item-5 card-item">
              <h3>Price: {game.price}</h3>
            </Grid>
            <Grid item xs={6} align="right" className="card-item-5 card-item">
              <Button
                variant="contained"
                className="add-to-cart-button"
                onClick={() => {
                  addToCartHandler(game);
                }}
              >
                ADD TO CART <ShoppingCartCheckoutIcon />
              </Button>
            </Grid>
          </Grid>
        </div>
      </Zoom>
    </div>
  );
}

export default GameCard;
