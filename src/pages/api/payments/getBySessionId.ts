/* eslint-disable @typescript-eslint/no-explicit-any */
// /pages/api/payments/stripe-session.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Payment } from "@/models";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);

  if (req.method === "GET") {
    const { stripeSessionId } = req.query;

    if (typeof stripeSessionId !== "string") {
      return res.status(400).json({
        message:
          "Invalid request: Stripe Session ID is required and must be a string.",
      });
    }

    try {
      const payment = await Payment.findOne({
        stripeSessionId: stripeSessionId,
      });

      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
