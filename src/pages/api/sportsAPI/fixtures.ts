import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    fixture,
    league,
    season = new Date().getFullYear().toString(),
    timezone = "America/Sao_Paulo",
  } = req.query;

  if (!league) {
    return res
      .status(400)
      .json({ message: "Missing required query parameter: league" });
  }

  const url = new URL(
    "https://v3.football.api-sports.io/fixtures?status=NS-TBD"
  );
  url.searchParams.append("league", league as string);
  url.searchParams.append("season", season as string);
  url.searchParams.append("timezone", timezone as string);

  // Append optional parameters only if they are present
  if (fixture) url.searchParams.append("fixture", fixture as string);

  try {
    const apiResponse = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "x-rapidapi-key": process.env.SPORTS_API_KEY || "",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`API responded with status ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
    res.status(200).json(data.response);
  } catch (error: any) {
    console.error("Failed to fetch odds data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
}
