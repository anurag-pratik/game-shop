import express from "express";
import Game from "../models/gameModel.js";
import data from "../data.js";
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Game.deleteMany({});
  const createdGames = await Game.insertMany(data.games);
  res.send({ createdGames });
});

export default seedRouter;
