import { ProductConfig } from "@/types";
import { ObjectId } from "mongoose";

export const productConfigDev: ProductConfig = {
  _id: "670942cd9d9eb8044c0299f1" as unknown as ObjectId,
  name: "ApostAI",
  colors: {
    primary: "#C8102E",
    secondary: "#FFD700",
    tertiary: "#1A1A1A",
  },
  title: "ApostAI - aprenda a vencer",
  logoLink: "https://img.logoipsum.com/325.svg",
  plans: [
    {
      _id: "670942cd9d9eb8044c0299f2" as unknown as ObjectId,
      name: "proTitle",
      price: "29",
      monthlyLimit: 150,
      dailyLimit: 7,
      features: { maxGamesInAnalisys: 2, betDatapoints: 10, maxBetsPerGame: 2 },
      description:
        "Ideal for casual or beginner bettors who want intelligent guidance to make more informed decisions. Receive daily analysis for selected games based on your risk aversion and betting history.",
      prod_stripe_id: "prod_QyWhO8lhLlaEB8",
      price_stripe_id: "price_1Q6ZdqICWdoDw822bJrDWTgH",
      popular: false,
      bullets: [
        {
          label: "proDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "proAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "proIntegration",
          icon: true,
          highlight: true,
        },
        {
          label: "proRisk",
          icon: true,
          highlight: true,
        },
        {
          label: "proAnalyses",
          icon: true,
          highlight: true,
        },
        {
          label: "proModels",
          icon: true,
          highlight: true,
        },
      ],
    },
    {
      _id: "670942cd9d9eb8044c0299f3" as unknown as ObjectId,
      name: "premiumTitle",
      price: "49",
      monthlyLimit: 350,
      dailyLimit: 15,
      features: { maxGamesInAnalisys: 3, betDatapoints: 20, maxBetsPerGame: 3 },
      description:
        "Designed for more experienced bettors looking to maximize their returns with advanced insights and greater analysis.",
      prod_stripe_id: "prod_QyWhUreQEMdnDL",
      price_stripe_id: "price_1Q6ZeCICWdoDw822WvYcspw3",
      popular: true,
      bullets: [
        {
          label: "premiumDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "premiumAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "premiumPlus",
          icon: false,
          highlight: true,
        },
        {
          label: "premiumLongterm",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumModels",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumAnalyses",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumDatapoints",
          icon: true,
          highlight: false,
        },
      ],
    },
    {
      _id: "670942cd9d9eb8044c0299f4" as unknown as ObjectId,
      name: "eliteTitle",
      price: "99",
      monthlyLimit: 900,
      dailyLimit: 25,
      features: { maxGamesInAnalisys: 4, betDatapoints: 30, maxBetsPerGame: 5 },
      description:
        "For the advanced bettor who needs unlimited access to detailed analytics and full customization to optimize every betting opportunity.",
      prod_stripe_id: "prod_QyWiVJNw4qky05",
      price_stripe_id: "price_1Q6ZejICWdoDw822KiS1KeLK",
      popular: false,
      bullets: [
        {
          label: "eliteDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "eliteAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "elitePlus",
          icon: false,
          highlight: true,
        },
        {
          label: "eliteIntegration",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteSupport",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteAnalyses",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteModels",
          icon: true,
          highlight: false,
        },
      ],
    },
  ],
  language: "ptBR",
};

export const productConfigProd: ProductConfig = {
  _id: "670942cd9d9eb8044c0299f1" as unknown as ObjectId,
  name: "ApostAI",
  colors: {
    primary: "#C8102E",
    secondary: "#FFD700",
    tertiary: "#1A1A1A",
  },
  title: "ApostAI - aprenda a vencer",
  logoLink: "https://img.logoipsum.com/325.svg",
  plans: [
    {
      _id: "670942cd9d9eb8044c0299f2" as unknown as ObjectId,
      name: "proTitle",
      price: "29",
      monthlyLimit: 150,
      dailyLimit: 7,
      features: { maxGamesInAnalisys: 2, betDatapoints: 10, maxBetsPerGame: 2 },
      description:
        "Ideal for casual or beginner bettors who want intelligent guidance to make more informed decisions. Receive daily analysis for selected games based on your risk aversion and betting history.",
      prod_stripe_id: "prod_RjjynvY59pnnnt",
      price_stripe_id: "price_1QqGUdICWdoDw822wiJLIE07",
      popular: false,
      bullets: [
        {
          label: "proDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "proAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "proIntegration",
          icon: true,
          highlight: true,
        },
        {
          label: "proRisk",
          icon: true,
          highlight: true,
        },
        {
          label: "proAnalyses",
          icon: true,
          highlight: true,
        },
        {
          label: "proModels",
          icon: true,
          highlight: true,
        },
      ],
    },
    {
      _id: "670942cd9d9eb8044c0299f3" as unknown as ObjectId,
      name: "premiumTitle",
      price: "49",
      monthlyLimit: 350,
      dailyLimit: 15,
      features: { maxGamesInAnalisys: 3, betDatapoints: 20, maxBetsPerGame: 3 },
      description:
        "Designed for more experienced bettors looking to maximize their returns with advanced insights and greater analysis.",
      prod_stripe_id: "prod_RjjyqtW0HFM0k7",
      price_stripe_id: "price_1QqGUaICWdoDw822hedwcTjt",
      popular: true,
      bullets: [
        {
          label: "premiumDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "premiumAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "premiumPlus",
          icon: false,
          highlight: true,
        },
        {
          label: "premiumLongterm",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumModels",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumAnalyses",
          icon: true,
          highlight: false,
        },
        {
          label: "premiumDatapoints",
          icon: true,
          highlight: false,
        },
      ],
    },
    {
      _id: "670942cd9d9eb8044c0299f4" as unknown as ObjectId,
      name: "eliteTitle",
      price: "99",
      monthlyLimit: 900,
      dailyLimit: 25,
      features: { maxGamesInAnalisys: 4, betDatapoints: 30, maxBetsPerGame: 5 },
      description:
        "For the advanced bettor who needs unlimited access to detailed analytics and full customization to optimize every betting opportunity.",
      prod_stripe_id: "prod_RjjyMnjgDskU8X",
      price_stripe_id: "price_1QqGUYICWdoDw822zPmYE8Bb",
      popular: false,
      bullets: [
        {
          label: "eliteDaily",
          icon: true,
          highlight: true,
        },
        {
          label: "eliteAmmount",
          icon: true,
          highlight: true,
        },
        {
          label: "elitePlus",
          icon: false,
          highlight: true,
        },
        {
          label: "eliteIntegration",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteSupport",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteAnalyses",
          icon: true,
          highlight: false,
        },
        {
          label: "eliteModels",
          icon: true,
          highlight: false,
        },
      ],
    },
  ],
  language: "ptBR",
};

export const productConfig =
  process.env.NEXT_PUBLIC_ENV === "production"
    ? productConfigProd
    : productConfigDev;
