/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import mongoose, { ObjectId } from "mongoose";

export interface IUsage {
  subscription: ObjectId;
  product: ObjectId;
  user: ObjectId;
  requestData: Object;
  responseData: any;
  createdAt: string;
  updatedAt: string;
}

const usageSchema = new mongoose.Schema<IUsage>(
  {
    subscription: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Subscription",
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    requestData: {
      type: Object,
      required: true,
    },
    responseData: {
      type: Object,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Usage =
  mongoose.models.Usage || mongoose.model<IUsage>("Usage", usageSchema);
