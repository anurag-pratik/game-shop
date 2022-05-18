import express from "express";
import Game from "../models/gameModel.js";

const gameRouter = express();

gameRouter.get("/", async (req, res) => {
  const games = await Game.find({});
  res.send(games);
});

gameRouter.get("/slug/:slug", async (req, res) => {
  const game = await Game.findOne({ slug: req.params.slug });
  game ? res.send(game) : res.status(404).send({ message: "Game not found" });
});

export default gameRouter;
