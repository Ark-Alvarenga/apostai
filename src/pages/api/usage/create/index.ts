import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Usage } from "@/models";
import { productConfig } from "@/constants";
import { callOpenAI } from "@/services";
import Stripe from "stripe";
import { getTokenCookie, verifyToken } from "@/helpers";
import { validateMoneyAllocation } from "@betSlayer/helpers";
import { Analysis } from "@/types";

export const config = {
  maxDuration: 300,
};
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);
  if (req.method === "POST") {
    const token = getTokenCookie(req.headers.cookie || "");

    const { subscription, requestData, betAmmount } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    if (!subscription) {
      return res.status(400).json({ message: "Subscription is required" });
    }

    const { user, error } = verifyToken(token);

    if (error) {
      return res.status(401).json({ message: error });
    }

    if (!user) {
      return res.status(400).json({ message: "Token was missing user" });
    }
    let stripeSubscription;

    // Verify usage quota
    try {
      stripeSubscription = await stripe.subscriptions.retrieve(
        subscription.stripeSubscriptionId
      );

      if (stripeSubscription.status !== "active")
        return res
          .status(401)
          .json({ message: "User subscription is expired" });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }

    const now = new Date();
    const oneDayAgo = new Date(new Date().setDate(now.getDate() - 1));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    // Count usages in the last 24 hours
    const countUsagesLast24Hours = await Usage.countDocuments({
      user: user._id,
      createdAt: { $gte: oneDayAgo, $lte: now },
    });

    // Count usages in the current month
    const countUsagesThisMonth = await Usage.countDocuments({
      user: user._id,
      createdAt: { $gte: startOfMonth, $lte: now },
    });

    if (
      countUsagesLast24Hours >= subscription.dailyLimit ||
      countUsagesThisMonth >= subscription.monthlyLimit
    )
      return res
        .status(401)
        .json({ message: "Your usage quota exceeded the limit!" });

    try {
      // Call AI model
      const result = await callOpenAI(requestData);

      const parsedData = JSON.parse(result.content);
      const responseData = validateMoneyAllocation(
        parsedData as Analysis,
        betAmmount
      );
      const usageParams = {
        subscription: subscription._id,
        product: productConfig._id,
        user: user._id,
        requestData,
        responseData,
      };

      const usage = new Usage(usageParams);
      await usage.save();

      res.status(201).json({
        message: "Usage created successfully",
        data: usage,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
