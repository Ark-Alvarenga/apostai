interface GetPredictionParams {
  fixtureId: string;
}

interface PredictionItem {
  comparison: any;
  h2h: any;
  league: any;
  predictions: any;
  teams: any;
}

export const getPrediction = async ({
  fixtureId,
}: GetPredictionParams): Promise<PredictionItem[]> => {
  const response = await fetch(
    `/api/sportsAPI/predictions?fixture=${fixtureId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    const errorBody = await response.json();
    throw new Error(`API call failed: ${response.status} ${errorBody.message}`);
  }

  const parsedResponse = await response.json();

  return parsedResponse;
};
