import express from "express";
import Game from "../models/gameModel.js";
import data from "../data.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Link from "../models/linkModel.js";
const seedRouter = express.Router();

seedRouter.get("/", async (req, res) => {
  await Game.deleteMany({});
  const createdGames = await Game.insertMany(data.games);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  await Order.deleteMany({});
  await Link.deleteMany({});
  const createdLinks = await Link.insertMany(data.links);

  res.send({ createdGames, createdUsers, createdLinks });
});

export default seedRouter;
