import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Payment } from "@/models/Payment";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);

  const { id } = req.query;

  if (req.method === "PUT") {
    try {
      const payment = await Payment.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
      }
      res.json(payment);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
