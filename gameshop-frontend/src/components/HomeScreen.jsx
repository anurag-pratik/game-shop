import React, { useReducer, useEffect } from "react";
import "../styles/HomeScreen.css";
import GameCard from "./GameCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import logger from "use-reducer-logger";
import LoadingScreen from "./LoadingScreen";
import ErrorScreen from "./ErrorScreen";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESSFUL":
      return { ...state, games: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, games }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    error: "",
    games: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const res = await axios.get("/api/games");
        dispatch({ type: "FETCH_SUCCESSFUL", payload: res.data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL", payload: error.message });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="games-container">
      <Helmet title={"GameShop - The Best Store For Gamers"} />
      <h1 className="games-header">GAMES</h1>
      <Grid
        container
        direction="row"
        spacing={5}
        justify="center"
        align="center"
      >
        {loading ? (
          <LoadingScreen />
        ) : error ? (
          <ErrorScreen message={error} />
        ) : (
          games.map((game) => {
            return (
              <Grid item sm={12} md={6} lg={4} key={game.slug}>
                <GameCard key={game.slug} game={game} />
              </Grid>
            );
          })
        )}
      </Grid>
    </div>
  );
}

export default HomeScreen;
