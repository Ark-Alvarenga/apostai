import { Payment as IPayment } from "@/types";
import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema<IPayment>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    status: { type: String, default: "pending", required: true },
    stripeSessionObject: { type: Object },
    stripeSessionId: { type: String, required: true, unique: true },
    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Payment =
  mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);
