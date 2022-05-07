import React, { useEffect, useState } from "react";
import "../styles/Trending.css";
import GameCard from "./GameCard";
import Grid from "@mui/material/Grid";
import axios from "axios";

function Trending() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/games")
      .then((res) => setData(res.data));
  }, []);

  return (
    <div className="trending-container">
      <h1 className="trending-header">TRENDING</h1>
      <Grid
        container
        direction="row"
        spacing={2}
        justify="center"
        align="center"
      >
        {data.map((game) => {
          return (
            <Grid item xs={12} sm={6} md={4} key={game.slug}>
              <GameCard
                key={game.slug}
                name={game.name}
                slug={game.slug}
                category={game.category}
                image={game.image}
                price={game.price}
                developer={game.developer}
                rating={game.rating}
                description={game.description}
              />
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

export default Trending;
