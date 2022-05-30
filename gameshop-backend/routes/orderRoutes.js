import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";
import User from "../models/userModel.js";
import { isAuth } from "../utils.js";

const orderRouter = express.Router();

orderRouter.post(
  "/",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const newOrder = new Order({
      items: req.body.items.map((ele) => ({ ...ele, game: ele._id })),
      address: req.body.address,
      itemsPrice: req.body.itemsPrice,
      tax: req.body.tax,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    res.status(201).send({ message: "New order created", order });
  })
);

orderRouter.get(
  "/all",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  "/:id",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) res.send(order);
    else res.status(404).send({ message: "Order not found" });
  })
);

export default orderRouter;
