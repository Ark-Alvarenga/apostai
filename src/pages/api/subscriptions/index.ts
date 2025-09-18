import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import { Subscription, User, Payment } from "@/models";
import {
  Affiliate as IAffiliate,
  Subscription as ISubscription,
  RateType,
} from "@/types";
import { Affiliate } from "@/models/Affiliate";
import { AffiliateSale } from "@/models/AffiliateSale";
import { productConfig } from "@/constants";

// USE THIS TO SELECT THE RATE TO BE USED
const SELECTED_RATE = RateType.REGULAR;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await mongoose.connect(process.env.MONGODB_URI!);

  if (req.method === "POST") {
    try {
      const { affiliateCode, ...subscriptionData } = req.body as {
        affiliateCode: string;
      } & ISubscription;

      let affiliate = null;
      if (affiliateCode) {
        affiliate = await Affiliate.findOne<IAffiliate>({
          affiliateCode,
        });
      }

      // Create new subscription
      const newSubscription = new Subscription({
        ...subscriptionData,
        ...(affiliate ? { affiliate: affiliate._id } : []),
      });

      await newSubscription.save();

      // Update user with new subscription ID
      await User.findByIdAndUpdate(subscriptionData.user, {
        $push: { subscriptions: newSubscription._id },
      });

      // Update payment status to 'paid'
      const payment = await Payment.findByIdAndUpdate(
        subscriptionData.lastPayment,
        {
          status: "paid",
          subscriptionId: newSubscription._id,
        }
      );

      if (affiliate) {
        const selectedRateFactor =
          affiliate.ratesPercentage[SELECTED_RATE] / 100;
        const affiliateEarning = Math.round(
          payment.stripeSessionObject.amount_total * selectedRateFactor
        );

        const affiliateSale = await new AffiliateSale({
          user: subscriptionData.user,
          affiliate: affiliate._id,
          payment: subscriptionData.lastPayment,
          initialBalance: affiliate.balance,
          finalBalance: affiliate.balance + affiliateEarning,
          value: affiliateEarning,
          rate: SELECTED_RATE,
          productId: productConfig._id,
        });
        affiliateSale.save();

        await Affiliate.findByIdAndUpdate(affiliate._id, {
          balance: affiliate.balance + affiliateEarning,
          $push: {
            affiliateSales: affiliateSale._id,
            relatedSubscriptions: newSubscription._id,
          },
        });
      }

      res.status(201).json(newSubscription);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
