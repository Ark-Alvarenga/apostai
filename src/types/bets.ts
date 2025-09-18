export type Periods = {
  first: number;
  second: number;
};

export type Venue = {
  id: number;
  name: string;
  city: string;
};

export type Status = {
  long: string;
  short: string;
  elapsed: number;
  extra?: number;
};

export type Fixture = {
  id: number;
  referee: string;
  timezone: string;
  date: string;
  timestamp: number;
  periods: Periods;
  venue: Venue;
  status: Status;
};

export type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
  winner?: boolean | null;
  last_5?: { form: string; att: string; def: string };
  league?: { form: string };
};

export type Teams = {
  home: Team;
  away: Team;
};

export type Goals = {
  home: number;
  away: number;
};

export type ScoreDetail = {
  home: number | null;
  away: number | null;
};

export type Score = {
  halftime: ScoreDetail;
  fulltime: ScoreDetail;
  extratime: ScoreDetail;
  penalty: ScoreDetail;
};

export type FixtureResponse = {
  fixture: Fixture;
  league: League;
  teams: Teams;
  goals: Goals;
  score: Score;
};

export type LeagueInfo = {
  id: number;
  name: string;
  type: string;
  logo: string;
};

export type CountryInfo = {
  name: string;
  code: string;
  flag: string;
};

export type FixtureCoverage = {
  events: boolean;
  lineups: boolean;
  statistics_fixtures: boolean;
  statistics_players: boolean;
};

export type CoverageInfo = {
  fixtures: FixtureCoverage;
  standings: boolean;
  players: boolean;
  top_scorers: boolean;
  top_assists: boolean;
  top_cards: boolean;
  injuries: boolean;
  predictions: boolean;
  odds: boolean;
};

export type SeasonInfo = {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: CoverageInfo;
};

export type Soccer = {
  league: LeagueInfo;
  country: CountryInfo;
  seasons: SeasonInfo[];
};

export type BetValue = {
  value: string | number;
  odd: string;
  bookmakerId?: number;
  bookmakerName?: string;
};

export type BetPossibility = {
  id: number;
  name: string;
  values: BetValue[];
};

export type Bookmaker = {
  id: number;
  name: string;
  bets: BetPossibility[];
};

export type OddsResponse = {
  league: League;
  fixture: Fixture;
  update: string;
  bookmakers: Bookmaker[];
  predictions: PredictionDetails;
  teams: Teams;
};

export type PredictionDetails = {
  winner: { name: string; comment: string };
  win_or_draw: boolean;
  percent: { home: string; draw: string; away: string };
  advice: string;
};

export type HeadToHead = {
  lastGames: Fixture[]; // List of last fixtures between the two teams
  stats: Record<string, any>; // Additional stats like wins, losses, draws
};

export type PredictionsResponse = {
  predictions: PredictionDetails;
  league: League;
  teams: Teams;
  comparison: Comparison;
  h2h: HeadToHead[];
};

export type BetAnalysis = {
  type: string;
  betOn: string;
  odds: number;
  betAmount: number;
  rationale: string;
};

export type ExternalAnalysisLink = {
  title: string;
  url: string;
};

export type ExternalAnalysis = {
  analysis: string;
  relatedLinks: ExternalAnalysisLink[];
};

export type Game = {
  match: string;
  bets: BetAnalysis[];
  insightAboutGame?: ExternalAnalysis;
  wheaterAnalysis?: ExternalAnalysis;
  relatedNewsAnalysis?: ExternalAnalysis;
};

export type Analysis = {
  strategyIntroduction: string;
  games: Game[];
  totalPotentialIncome: number;
  mostProbableOutcomeIncome: number;
  overallRisk?: number;
  strategySummary: string;
};

export type Country = {
  name: string;
  code: string;
  flag: string;
};

type Comparison = {
  form: { home: string; away: string };
  att: { home: string; away: string };
  def: { home: string; away: string };
  poisson_distribution: { home: string; away: string };
  h2h: { home: string; away: string };
  goals: { home: string; away: string };
  total: { home: string; away: string };
};

export type SelectedGameObj = OddsResponse &
  FixtureResponse &
  Partial<PredictionsResponse> & {
    selectedBets?: {
      value: number;
      label: React.JSX.Element;
    }[];
  };
