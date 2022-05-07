import express from "express";
import data from "./data.js";

const app = express();

app.get("/api/games", (req, res) => {
  res.send(data.games);
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Served at localhost:${port}`);
});
