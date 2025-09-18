import mongoose, { ObjectId } from "mongoose";

interface IAffiliateSale {
  _id: string;
  user: ObjectId;
  affiliate: ObjectId;
  payment: ObjectId;
  initialBalance: number;
  finalBalance: number;
  value: number;
  rate: string;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
}

const affiliateSaleSchema = new mongoose.Schema<IAffiliateSale>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Affiliate",
    },
    payment: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Payment",
    },
    initialBalance: {
      type: Number,
      required: true,
    },
    finalBalance: {
      type: Number,
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    rate: {
      type: String,
      required: true,
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

export const AffiliateSale =
  mongoose.models.AffiliateSale ||
  mongoose.model<IAffiliateSale>("AffiliateSale", affiliateSaleSchema);
