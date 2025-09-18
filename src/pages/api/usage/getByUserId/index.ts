import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Usage } from "@/models";
import { verifyToken } from "@/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);
  if (req.method === "POST") {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "Token is required" });
    }

    const { user, error } = verifyToken(token);

    if (error) {
      return res.status(401).json({ message: error });
    }

    if (!user) {
      return res.status(400).json({ message: "Token was missing user" });
    }

    try {
      const usages = await Usage.find({ user: user._id });

      res.status(201).json({
        message: "Usage created successfully",
        data: usages,
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
