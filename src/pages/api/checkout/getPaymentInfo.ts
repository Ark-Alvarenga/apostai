/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/api/getPaymentInfo.ts
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { paymentIntentId } = req.body;

    if (!paymentIntentId) {
      return res.status(400).json({ error: "Payment Intent ID is required" });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(
        paymentIntentId
      );
      res.status(200).json({ paymentIntent });
    } catch (error: any) {
      console.error("Error fetching payment intent:", error);
      res.status(500).json({ error: "Failed to fetch payment intent" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
