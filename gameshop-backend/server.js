import express from "express";
import data from "./data.js";
import cors from "cors";

const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.get("/api/games", (req, res) => {
  res.send(data.games);
});

app.get("/api/games/slug/:slug", (req, res) => {
  const game = data.games.find((ele) => ele.slug === req.params.slug);
  game ? res.send(game) : res.status(404).send({ message: "Game not found" });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Served at localhost:${port}`);
});
