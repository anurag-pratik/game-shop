import React from "react";
import { useParams } from "react-router-dom";
import "../styles/ProductScreen.css";

function GameScreen() {
  const params = useParams();
  const { slug } = params;
  return <div>{slug}</div>;
}

export default GameScreen;
