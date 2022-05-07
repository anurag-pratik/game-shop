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

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Served at localhost:${port}`);
});
