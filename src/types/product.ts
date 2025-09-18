import { ObjectId } from "mongoose";

export type Bullet = {
  label: string;
  icon: boolean;
  highlight: boolean;
};

export type Features = {
  maxGamesInAnalisys: number;
  betDatapoints: number;
  maxBetsPerGame: number;
};

export type SubscriptionPlan = {
  _id: ObjectId;
  name: string;
  price: string;
  description: string;
  prod_stripe_id: string;
  price_stripe_id: string;
  popular: boolean;
  bullets: Bullet[];
  monthlyLimit: number;
  dailyLimit: number;
  features: Features;
};

export type ProductConfig = {
  _id: ObjectId;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  title: string;
  logoLink: string;
  plans: SubscriptionPlan[];
  language: string;
};

export enum AvailableProducts {
  APOSTAI = "Apostai",
}
