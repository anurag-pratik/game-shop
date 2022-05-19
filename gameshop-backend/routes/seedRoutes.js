import express from "express";
import Game from "../models/gameModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Game.deleteMany({});
  const createdGames = await Game.insertMany(data.games);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdGames, createdUsers });
});

export default seedRouter;
