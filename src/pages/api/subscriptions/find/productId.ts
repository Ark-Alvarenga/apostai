import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Subscription } from "@/models/Subscription";
import { getTokenCookie, verifyToken } from "@/helpers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const connectMongo = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(process.env.MONGODB_URI as string);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  if (req.method === "GET") {
    const token = getTokenCookie(req.headers.cookie || "");

    if (!token) {
      return res.status(400).json({
        message: "Token is required, please make sure you are logged",
      });
    }

    const { user, error } = verifyToken(token);

    if (error) {
      return res.status(401).json({ message: error });
    }

    if (!user) {
      return res.status(400).json({ message: "Token was missing user" });
    }

    const { productId } = req.query;

    try {
      if (!productId || typeof productId !== "string") {
        return res.status(400).json({ message: "Invalid productId." });
      }

      const subscription = await Subscription.findOne({
        product: productId,
        status: "active",
        user: user._id,
      }).populate(["lastPayment"]);

      if (!subscription) {
        return res.status(404).json({
          message: "Active subscription not found for the specified product.",
        });
      }

      const stripeSubscription = await stripe.subscriptions.retrieve(
        subscription.stripeSubscriptionId
      );

      res.json({ ...subscription._doc, stripeSubscription });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
