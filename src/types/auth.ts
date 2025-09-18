import { ObjectId } from "mongoose";
import { Features } from "./product";
import Stripe from "stripe";

export type Subscription = {
  stripeSubscriptionId: string;
  payments: ObjectId[];
  lastPayment: ObjectId;
  dailyLimit: number;
  monthlyLimit: number;
  plan: ObjectId;
  product: ObjectId;
  features: Features;
  usages: ObjectId[];
  user: ObjectId;
  status: string;
  affiliate?: string;
  _id: string;
};

export type lastPayment = {
  createdAt: string;
  productId: string;
  status: string;
  stripeSessionId: string;
  stripeSessionObject: Stripe.CheckoutSessionCompletedEvent;
  updatedAt: string;
  user: string;
  _id: string;
};

export type EnhancedSubscription = Subscription & {
  lastPayment: lastPayment;
  stripeSubscription: Stripe.Subscription;
};

export type User = {
  _id: ObjectId;
  email: string;
  subscriptions: Subscription[];
  payments: ObjectId[];
  canSendEmailMkt: boolean;
  status: string;
  createdAt: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
};

export enum UserStatus {
  PENDING = "pending",
  ACTIVE = "active",
  BLOCKED = "blocked",
  BANNED = "banned",
  CANCELED = "canceled",
}
