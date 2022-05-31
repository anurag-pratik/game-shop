import mongoose from "mongoose";

const linkSchema = new mongoose.Schema(
  {
    slug: { type: String, required: true },
    link: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Link = mongoose.model("Link", linkSchema);

export default Link;
