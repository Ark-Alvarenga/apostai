/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { sessionId } = req.body;

    if (!sessionId) {
      return res.status(400).json({ error: "Session ID is required" });
    }

    try {
      const session = await stripe.checkout.sessions.retrieve(sessionId, {
        expand: ["subscription"],
      });

      if (session.subscription) {
        res.status(200).json({
          session: session,
          paymentStatus: session.payment_status,
        });
      } else {
        res.status(200).json({
          error: "No subscription found for this session",
          sessionDetails: session,
        });
      }
    } catch (error: any) {
      console.error("Error fetching checkout session:", error);
      res.status(500).json({ error: "Failed to fetch session details" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
