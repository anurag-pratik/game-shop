import React from "react";
import "../styles/HomeScreen.css";
import Trending from "./Trending";
import GamesContainer from "./GamesContainer";

function HomeScreen() {
  return (
    <div>
      <Trending />
      <GamesContainer />
    </div>
  );
}

export default HomeScreen;
