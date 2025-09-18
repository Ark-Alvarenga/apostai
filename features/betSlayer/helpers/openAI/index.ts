import { getUserSubscription } from "@/helpers";
import { Analysis, BetPossibility, Game, SelectedGameObj } from "@/types";
import { ChatCompletionCreateParamsBase } from "openai/resources/chat/completions.mjs";
import {
  filterBookmakers,
  getUniqueBetsWithHighestOdds,
  parseMatchData,
} from "../bets";
import { productConfig } from "@/constants";
import ptBR from "@/translations/ptBR";

const isBrTranslation = productConfig.language === "ptBR";

export const generateBetAnalysisPrompt = ({
  betAmmount,
  games,
  riskTolerance,
  userPrompt,
}: {
  betAmmount: string;
  games: string[];
  riskTolerance: number;
  userPrompt: string;
}) => {
  const en = {
    messages: [
      {
        role: "system",
        content: `
          You are an AI focused on sports data analysis and prediction. 
          Your goal is to use all the data available and allocate the resources that the user wants to bet in the best possible way in order to maximize the profit by betting. 
          ALWAYS return the exactly same number of games that the user send to you as option, always allocate the exactly ammount the user ask to use. 
          Diversify the way we be, try to bet on multiple possibilities and not just the winner of the match. 
          We need to justify the bets on each text as much as possible, long texts with arguments and facts should be our standard.
        `,
      },
      {
        role: "user",
        content: `Hello I want to bet ${betAmmount} in the following games (you NEED to bet on all of them): ${games}. My risk rolerance rate is ${riskTolerance}% and my main goal is: ${userPrompt}`,
      },
    ],
  } as unknown as Pick<ChatCompletionCreateParamsBase, "messages">;

  const ptBR = {
    messages: [
      {
        role: "system",
        content: `
        Você é uma IA focada em análise e previsão de dados esportivos.
        Seu objetivo é usar todos os dados disponíveis e alocar os recursos que o usuário deseja apostar da melhor forma possível, maximizando o lucro nas apostas.
        SEMPRE retorne o mesmo número exato de jogos que o usuário enviar como opção e sempre aloque exatamente o valor que o usuário pedir para usar.
        Diversifique as opções de aposta, tente apostar em múltiplas possibilidades e não apenas no vencedor da partida.
        Substitua Casa e Fora pelos nomes dos times.
        Todos os textos devem estar em portugues, se necessario traduza, especialmente o valor que sera apostado na bet que vai ser enviado em ingles.
        Precisamos justificar as apostas em cada texto o máximo possível; textos longos, com argumentos e fatos, devem ser nosso padrão.
      `,
      },
      {
        role: "user",
        content: `
        Olá, eu quero apostar ${betAmmount} nos seguintes jogos (você PRECISA apostar em todos eles): ${games}. Minha taxa de tolerância ao risco é ${riskTolerance}% e meu objetivo principal é: ${userPrompt}.
      `,
      },
    ],
  } as unknown as Pick<ChatCompletionCreateParamsBase, "messages">;

  return isBrTranslation ? ptBR : en;
};

export const parseBetPossibilityIntoText = (
  bets: BetPossibility[],
  limit: number
) => {
  return bets
    .filter((_, index) => index + 1 < limit)
    .map((bet) => {
      return `${bet.name}: ${bet.values
        .map((value) => `${value.value} @ ${value.odd}`)
        .join(", ")}`;
    })
    .join("; ");
};

// @todo fix cases where things could go wrong
export const processOddsIntoText = (selectedGames: SelectedGameObj[]) => {
  if (!selectedGames.length) return [""];

  const subscription = getUserSubscription();

  if (!subscription) return [""];

  const {
    features: { betDatapoints },
  } = subscription;

  return selectedGames.map((data) => {
    if (!data) return "";
    const filteredBookmakers = filterBookmakers(data.bookmakers);
    const highestOddsBets = getUniqueBetsWithHighestOdds(filteredBookmakers);

    if (!highestOddsBets.length) return "";

    const selectedBets = data.selectedBets;
    const selectedBetsPrompt = selectedBets
      ?.map((bet) => {
        return bet.label.props.children;
      })
      .join(", ");

    const possibleBetsPrompt = parseBetPossibilityIntoText(
      highestOddsBets.map((odds) => ({
        ...odds,
        values: [
          ...odds.values.map((values) => ({
            ...values,
            value: ptBR.betOptions[values.value],
          })),
        ],
      })),
      betDatapoints
    );

    const predictionInfo = parseMatchData(data);
    const enResult = `| League: ${data.league?.name} - Teams: ${
      data.teams?.home.name
    } vs ${data.teams?.away.name} ${
      selectedBets
        ? `- Mandatory bets, you need to allocate money on this bets: ${selectedBetsPrompt}`
        : ""
    }- Possible bets with the best odds: ${possibleBetsPrompt} - Predictions data: ${predictionInfo} |`;

    const ptBRResult = `| Liga: ${data.league?.name} - Times: ${
      data.teams?.home.name
    } vs ${data.teams?.away.name} ${
      selectedBets
        ? `- Apostas obrigatórias, você precisa alocar dinheiro nestas apostas: ${selectedBetsPrompt}`
        : ""
    }- Possíveis apostas com as melhores odds: ${possibleBetsPrompt} - Dados de previsões: ${predictionInfo} |`;

    return isBrTranslation ? ptBRResult : enResult;
  });
};

export const getTotalAllocated = (games: Game[]) => {
  return games.reduce((acc, actualGame) => {
    const gameAllocatedMoney = actualGame.bets.reduce((acc, actualBet) => {
      return acc + actualBet.betAmount;
    }, 0);

    return acc + gameAllocatedMoney;
  }, 0);
};

export const validateMoneyAllocation = (
  analysis: Analysis,
  betAmmount: number
): Analysis => {
  const totalAllocated = getTotalAllocated(analysis.games);

  if (betAmmount === totalAllocated) return analysis;

  const allocatedGames = analysis.games.map((game) => {
    const allocatedBets = game.bets.map((bet) => {
      const allocatedBetAmmount = Math.round(
        (bet.betAmount / totalAllocated) * betAmmount
      );

      return { ...bet, betAmount: allocatedBetAmmount };
    });

    return { ...game, bets: allocatedBets };
  });

  return { ...analysis, games: allocatedGames };
};
