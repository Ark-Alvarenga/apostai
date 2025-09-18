import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(
      "https://v3.football.api-sports.io/countries",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.SPORTS_API_KEY || "",
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data.response);
  } catch (error: any) {
    console.error("Failed to fetch data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
}
