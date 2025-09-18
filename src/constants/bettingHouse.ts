export enum BettingHouseEnum {
  Bet365 = "Bet365",
  Betfair = "Betfair",
  Pinnacle = "Pinnacle",
  Betano = "Betano",
}

export interface BettingHouse {
  name: BettingHouseEnum;
  id: number;
  link: string;
}

export const AllowedBookmakers: BettingHouseEnum[] = [
  BettingHouseEnum.Bet365,
  BettingHouseEnum.Betano,
  BettingHouseEnum.Betfair,
  BettingHouseEnum.Pinnacle,
];

export const BettingHouse: BettingHouse[] = [
  {
    name: BettingHouseEnum.Bet365,
    id: 8,
    link: "https://www.bet365.com/#/IP/B1",
  },
  {
    name: BettingHouseEnum.Betfair,
    id: 3,
    link: "https://www.betfair.com/apostas/br/futebol/s-1",
  },
  {
    name: BettingHouseEnum.Pinnacle,
    id: 4,
    link: "https://www.pinnacle.com/pt/soccer/matchups/live/",
  },
  {
    name: BettingHouseEnum.Betano,
    id: 32,
    link: "https://br.betano.com/live/",
  },
];

export enum OddsMarket {
  MatchWinner = "Match Winner",
  HomeAway = "Home/Away",
  SecondHalfWinner = "Second Half Winner",
  GoalsOverUnder = "Goals Over/Under",
  GoalsOverUnderFirstHalf = "Goals Over/Under First Half",
  GoalsOverUnderSecondHalf = "Goals Over/Under - Second Half",
  BothTeamsScore = "Both Teams Score",
  ExactScore = "Exact Score",
  HighestScoringHalf = "Highest Scoring Half",
  CorrectScoreFirstHalf = "Correct Score - First Half",
  CorrectScoreSecondHalf = "Correct Score - Second Half",
  DoubleChance = "Double Chance",
  FirstHalfWinner = "First Half Winner",
  TeamToScoreFirst = "Team To Score First",
  WinBothHalves = "Win Both Halves",
  TotalHome = "Total - Home",
  TotalAway = "Total - Away",
  DoubleChanceFirstHalf = "Double Chance - First Half",
  DoubleChanceSecondHalf = "Double Chance - Second Half",
  BothTeamsScoreFirstHalf = "Both Teams Score - First Half",
  BothTeamsToScoreSecondHalf = "Both Teams To Score - Second Half",
  OddEven = "Odd/Even",
  OddEvenFirstHalf = "Odd/Even - First Half",
  ResultsBothTeamsScore = "Results/Both Teams Score",
  HomeTeamScoreAGoal = "Home Team Score a Goal",
  AwayTeamScoreAGoal = "Away Team Score a Goal",
  CornersOverUnder = "Corners Over Under",
}

export interface DynamicOddsEntry {
  bookmaker: string;
  odd: number;
  link: string;
}

export interface DynamicOdds {
  [key: string]: DynamicOddsEntry;
}
