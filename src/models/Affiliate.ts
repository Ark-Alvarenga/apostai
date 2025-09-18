import { DEFAULT_RATES_PERCENTAGE } from "@/constants";
import { Affiliate as IAffiliate, UserStatus } from "@/types";
import mongoose from "mongoose";

const affiliateSchema = new mongoose.Schema<IAffiliate>(
  {
    affiliateCode: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    cpf: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    pix: { type: String, required: true, unique: true },
    products: [{ type: String, required: true }],
    status: { type: String, default: UserStatus.PENDING, required: true },
    affiliateSales: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AffiliateSale" },
    ],
    affiliatePayments: [
      { type: mongoose.Schema.Types.ObjectId, ref: "AffiliatePayment" },
    ],
    relatedSubscriptions: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Subscription" },
    ],
    balance: { type: Number, default: 0, required: true },
    ratesPercentage: {
      type: {
        regular: {
          type: Number,
          default: DEFAULT_RATES_PERCENTAGE.REGULAR,
          required: true,
        },
        initial: {
          type: Number,
          default: DEFAULT_RATES_PERCENTAGE.INITIAL,
          required: true,
        },
        promo: {
          type: Number,
          default: DEFAULT_RATES_PERCENTAGE.PROMO,
          required: true,
        },
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Affiliate =
  mongoose.models.Affiliate ||
  mongoose.model<IAffiliate>("Affiliate", affiliateSchema);
