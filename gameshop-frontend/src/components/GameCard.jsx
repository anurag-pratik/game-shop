import React from "react";
import { Link } from "react-router-dom";
import "../styles/GameCard.css";

function GameCard(props) {
  return (
    <div className="game-card">
      <Link to={`/game/${props.slug}`}>
        <div>
          <span className="right-float-container">{props.rating} ⭐</span>
          <h2>{props.name}</h2>
        </div>
        <div>
          <h4 className="right-float-container">[{props.category}]</h4>
          <h3>{props.developer}</h3>
        </div>
        <img
          width={"150px"}
          height={"150px"}
          alt={props.name}
          src={props.image}
        ></img>
      </Link>
      <div>
        <button className="right-float-container">Add To Cart</button>
        <h3>Price: {props.price}</h3>
      </div>
    </div>
  );
}

export default GameCard;
