/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Payment } from "@/models/Payment";
import { productConfig } from "@/constants";
import { getTokenCookie, verifyToken } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);

  if (req.method === "POST") {
    const token = getTokenCookie(req.headers.cookie || "");

    if (!token) {
      return res.status(400).json({ message: "JWT token is required" });
    }

    const { user, error } = verifyToken(token);

    if (error) {
      return res.status(401).json({ message: error });
    }

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token don't have an user associated" });
    }

    const { stripeSessionObject, stripeSessionId } = req.body;

    if (!stripeSessionObject) {
      return res
        .status(400)
        .json({ message: "stripeSessionObject is required" });
    }

    if (!stripeSessionId) {
      return res.status(400).json({ message: "stripeSessionId is required" });
    }

    try {
      const payment = await new Payment({
        user: user._id,
        status: "pending",
        stripeSessionObject,
        stripeSessionId,
        productId: productConfig._id,
      }).save();

      res.status(200).json({ payment });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
