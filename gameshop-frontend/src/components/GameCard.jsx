import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";
import Grid from "@mui/material/Grid";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";

function GameCard(props) {
  return (
    <div className="game-card">
      <Link to={`/game/${props.slug}`}>
        <Grid
          container
          direction="row"
          spacing={1}
          justify="center"
          align="left"
        >
          <Grid item xs={12} className="card-item-1 card-item">
            <h2>{props.name}</h2>
          </Grid>
          <Grid item xs={12} className="card-item-2 card-item">
            <h3>{props.developer}</h3>
          </Grid>

          <Grid item xs={6} className="card-item-3 card-item">
            {props.rating} ⭐ ({props.ratingCount})
          </Grid>
          <Grid item xs={6} align="right" className="card-item-3 card-item">
            <h4>[{props.downloadCount} downloads]</h4>
          </Grid>

          <Grid item xs={6} className="card-item-4 card-item">
            <img
              width={"100%"}
              height={"98%"}
              alt={props.name}
              src={props.image}
            ></img>
          </Grid>
          <Grid item xs={6} className="card-item-4 card-item">
            <h4>{props.description}</h4>
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
            <h3>Price: {props.price}</h3>
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
