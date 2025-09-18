export const isFirstGameOfLeague = (predictionData: any): boolean => {
  if (!predictionData || typeof predictionData !== "object") {
    console.warn("⚠️ Dados inválidos fornecidos.");
    return false;
  }

  const { predictions, teams } = predictionData;

  if (!predictions || !teams) {
    console.warn("⚠️ Estrutura inesperada nos dados.");
    return false;
  }

  // Verifica se não há vencedor previsto, nem contagem de gols
  const noPredictionsAvailable =
    !predictions.winner.id &&
    !predictions.winner.name &&
    predictions.advice === "No predictions available" &&
    predictions.percent.home === "33%" &&
    predictions.percent.draw === "33%" &&
    predictions.percent.away === "33%";

  // Verifica se ambos os times nunca jogaram antes (número de jogos é zero)
  const isFirstGameForTeams =
    teams.home.league?.fixtures?.played?.total === 0 &&
    teams.away.league?.fixtures?.played?.total === 0;

  const isFirstGame = noPredictionsAvailable && isFirstGameForTeams;

  return isFirstGame;
};
