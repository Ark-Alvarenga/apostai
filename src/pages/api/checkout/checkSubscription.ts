/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/checkSubscription.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { subscriptionId } = req.body;

    if (!subscriptionId) {
      return res.status(400).json({ error: "Subscription ID is required" });
    }

    try {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const isValid = subscription.status === "active";
      res.status(200).json({ isValid });
    } catch (error: any) {
      console.error("Error fetching subscription:", error);
      res.status(500).json({ error: "Failed to fetch subscription" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
