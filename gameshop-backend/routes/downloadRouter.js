import express from "express";
import Link from "../models/linkModel.js";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";

const downloadRouter = express.Router();

downloadRouter.get(
  "/:slug",
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const link = await Link.findOne({ slug: req.params.slug });
    link
      ? res.send(link.link)
      : res.status(404).send({ message: "Link not found" });
  })
);

export default downloadRouter;
