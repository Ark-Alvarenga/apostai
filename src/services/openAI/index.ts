"use server";
import { CallOpenAIParams } from "@/types";
import OpenAI from "openai";

const schema = {
  type: "object",
  additionalProperties: false,
  properties: {
    strategyIntroduction: { type: "string" },
    games: {
      type: "array",
      items: {
        additionalProperties: false,
        type: "object",
        properties: {
          match: { type: "string" },
          bets: {
            type: "array",
            items: {
              additionalProperties: false,
              type: "object",
              properties: {
                type: { type: "string" },
                betOn: { type: "string" },
                odds: { type: "number" },
                betAmount: { type: "number" },
                rationale: {
                  type: "string",
                  description:
                    "At least 300 characters. Be factual, use data to justify the bet",
                },
              },
              required: ["type", "betOn", "odds", "betAmount", "rationale"],
            },
          },
        },
        required: ["match", "bets"],
      },
    },
    totalPotentialIncome: { type: "number" },
    mostProbableOutcomeIncome: { type: "number" },
    strategySummary: {
      type: "string",
      description:
        "Overview of the overall strategy used in the bets, justify the analysis, and make it look legit in the user's eye",
    },
  },
  required: [
    "strategyIntroduction",
    "games",
    "totalPotentialIncome",
    "mostProbableOutcomeIncome",
    "strategySummary",
  ],
};

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const callOpenAI = async ({
  messages,
  model = "gpt-4o",
  functions,
  ...rest
}: CallOpenAIParams): Promise<any> => {
  try {
    const res = (await openai.chat.completions.create({
      model,
      messages,
      functions,
      stream: false,
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "betting_strategy",
          schema,
          strict: true,
        },
      },
      ...rest,
    })) as OpenAI.Chat.Completions.ChatCompletion;

    return res.choices[0].message;
  } catch (error) {
    console.error("Error OpenAI", error);
    throw error;
  }
};
