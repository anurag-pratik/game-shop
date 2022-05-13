import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";
import Grid from "@mui/material/Grid";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function GameCard(props) {
  const { game } = props;
  return (
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
            <button className="add-to-cart-button">
              ADD TO CART <ShoppingCartCheckoutIcon />
            </button>
          </Grid>
        </Grid>
      </Link>
    </div>
  );
}

export default GameCard;
