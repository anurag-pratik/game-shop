import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        slug: { type: String, required: true },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        game: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Game",
          required: true,
        },
      },
    ],
    address: {
      name: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      pincode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email: String,
    },
    itemsPrice: { type: Number, required: true },
    tax: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
