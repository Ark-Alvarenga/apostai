import Stripe from "stripe";
import type { NextApiRequest, NextApiResponse } from "next";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    if (!req.body.priceId) {
      return res.status(400).end("Missing price id");
    }

    try {
      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: req.body.priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url: `${req.headers.origin}/confirmPayment/success`,
        cancel_url: `${req.headers.origin}/confirmPayment/canceled`,
      });

      res.status(200).json(session);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
