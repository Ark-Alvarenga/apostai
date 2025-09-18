import { Subscription as ISubscription } from "@/types";
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    stripeSubscriptionId: { type: String, required: true, unique: true },
    payments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payment" }],
    lastPayment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Payment",
      required: true,
    },
    dailyLimit: { type: Number, required: true },
    monthlyLimit: { type: Number, required: true },
    plan: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    features: mongoose.Schema.Types.Mixed,
    usages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Usage" }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Affiliate",
    },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const Subscription =
  mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", subscriptionSchema);
