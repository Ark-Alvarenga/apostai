import { ObjectId } from "mongoose";

export interface Payment {
  _id: string;
  createdAt: string;
  updatedAt: string;
  user: ObjectId;
  status: string;
  stripeSessionObject: object;
  stripeSessionId: string;
  subscriptionId: ObjectId;
  productId: ObjectId;
}

export enum RateType {
  REGULAR = "regular",
  PROMO = "promo",
  INITIAL = "initial",
}
