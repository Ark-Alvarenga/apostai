import {
  StandingsResponse,
  FixtureTeam,
  TeamStatisticsResponse,
  FixtureInfo,
  PredictionResponse,
  Fixture,
} from "football-wrapper";

export interface FootballMatchAnalysisType {
  resume: {
    resume: string;
  };
  result_final: {
    resume: string;
    probability: string;
    insights: string[];
    bet_suggestions: {
      safe_bet: string;
      moderate_bet: string;
      risky_bet: string;
    };
  };
  total_goals: {
    tendency: string;
    average_goals: number;
    insights: {
      home_team: string[];
      away_team: string[];
      general: string[];
    };
    bet_suggestions: {
      safe_bet: string;
      moderate_bet: string;
      risky_bet: string;
    };
  };
  half_time_full_time: {
    half_time_result: string;
    full_time_result: string;
    insights: string[];
    bet_suggestions: {
      safe_bet: string;
      moderate_bet: string;
      risky_bet: string;
    };
  };
  cardsSchema: {
    home_team_cards: {
      average_cards: number;
      prone_moments: string[];
      insights: string[];
    };
    away_team_cards: {
      average_cards: number;
      prone_moments: string[];
      insights: string[];
    };
    foul_prone_team: string;
    bet_suggestions: {
      safe_bet: string;
      moderate_bet: string;
      risky_bet: string;
    };
  };
}

type TeamData = FixtureTeam & {
  statistics: TeamStatisticsResponse;
};

export interface MatchDataType {
  league: StandingsResponse[];
  home: TeamData;
  fixture: FixtureInfo;
  away: TeamData;
  predictions: PredictionResponse;
}
export interface MarketOpportunity {
  update?: Date;
  market: string;
  bestOdds: Record<string, { bookmaker: string; odd: number; link: string }[]>;
  arbitrageResult: {
    arbitrageValue: number;
    hasArbitrage: boolean;
  };
  message: string;
}
export interface FilteredMarketOpportunity {
  update?: Date;
  market: string;
  bestOdds: Record<string, { bookmaker: string; odd: number; link: string }>;
  arbitrageResult: {
    arbitrageValue: number;
    hasArbitrage: boolean;
  };
  message: string;
}

export interface InternalFixture extends Document {
  fixtureId: number;
  start: Date;
  status: Fixture["status"]["long"];
  leagueName: string;
  teams: string;
  result: {
    gols: Fixture["goals"];
    score: Fixture["score"];
  };
  preMatchStatistics?: MatchDataType;
  preMatchOdds?: MarketOpportunity[];
  preMatchOpenaiReport?: FootballMatchAnalysisType;
  createdAt: Date;
  updatedAt: Date;
}
