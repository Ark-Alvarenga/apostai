import mongoose, { ObjectId } from "mongoose";

interface IAffiliateDeposit {
  _id: string;
  admin: ObjectId;
  affiliate: ObjectId;
  initialBalance: number;
  finalBalance: number;
  value: number;
  transferMethod: string;
  productId: ObjectId;
  createdAt: string;
  updatedAt: string;
}

const affiliateDepositSchema = new mongoose.Schema<IAffiliateDeposit>(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Admin",
    },
    affiliate: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Affiliate",
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
    transferMethod: {
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

export const AffiliateDeposit =
  mongoose.models.AffiliateDeposit ||
  mongoose.model<IAffiliateDeposit>("AffiliateDeposit", affiliateDepositSchema);
