import express, { urlencoded } from "express";
import data from "./data.js";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import gameRouter from "./routes/gameRoutes.js";
import userRouter from "./routes/userRoutes.js";
import orderRouter from "./routes/orderRoutes.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

const corsOpts = {
  origin: "*",

  methods: ["GET", "POST", "PUT"],

  allowedHeaders: ["Content-Type"],
};

app.use(cors(corsOpts));

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.get("/api/keys/razorpay", (req, res) => {
  res.send(process.env.RAZORPAY_KEY_ID || "sb");
});

app.use("/api/seed", seedRouter);
app.use("/api/games", gameRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Served at localhost:${port}`);
});
