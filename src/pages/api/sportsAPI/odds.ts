import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    fixture,
    league,
    season = new Date().getFullYear().toString(),
    date = new Date().toISOString().split("T")[0],
    timezone = "America/Sao_Paulo",
    page = "1",
    bookmaker,
    bet,
  } = req.query;

  if (!league) {
    return res
      .status(400)
      .json({ message: "Missing required query parameter: league" });
  }

  // Helper function to add days to a date
  function addDaysToDate(date: string, days: number): string {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toISOString().split("T")[0];
  }

  // Prepare URLs for all three requests
  const urls = [0, 1, 2, 3].map((daysToAdd) => {
    const url = new URL("https://v3.football.api-sports.io/odds");
    url.searchParams.append("league", league as string);
    url.searchParams.append("season", season as string);
    url.searchParams.append("date", addDaysToDate(date as string, daysToAdd));
    url.searchParams.append("timezone", timezone as string);
    url.searchParams.append("page", page as string);

    // Append optional parameters only if they are present
    if (fixture) url.searchParams.append("fixture", fixture as string);
    if (bookmaker) url.searchParams.append("bookmaker", bookmaker as string);
    if (bet) url.searchParams.append("bet", bet as string);

    return url.toString();
  });

  try {
    // Fetch all data simultaneously
    const responses = await Promise.all(
      urls.map((url) =>
        fetch(url, {
          method: "GET",
          headers: {
            "x-rapidapi-key": process.env.SPORTS_API_KEY || "",
            "x-rapidapi-host": "v3.football.api-sports.io",
          },
        }).then((res) => {
          if (!res.ok)
            throw new Error(`API responded with status ${res.status}`);
          return res.json();
        })
      )
    );

    // Combine responses
    const combinedData = responses.map((response) => response.response);

    res.status(200).json(
      combinedData.flat() // Flatten the array if each response returns an array
    );
  } catch (error: any) {
    console.error("Failed to fetch odds data:", error);
    res
      .status(500)
      .json({ message: "Failed to fetch data", error: error.message });
  }
}
