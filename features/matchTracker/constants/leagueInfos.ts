export const leaguesInfos = [
  {
    id: 71,
    name: "Brasileirão Série A",
    apiName: "Série A",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 1,
  },
  {
    id: 73,
    name: "Copa Do Brasil",
    apiName: "Copa Do Brasil",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 2,
  },
  {
    id: 13,
    name: "Copa Libertadores",
    apiName: "CONMEBOL Libertadores",
    season: 2025,
    flag: "https://media.api-sports.io/flags/eu.svg",
    order: 3,
  },
  {
    id: 2,
    name: "Champions League",
    apiName: "UEFA Champions League",
    season: 2024,
    flag: "https://media.api-sports.io/flags/eu.svg",
    order: 4,
  },
  {
    id: 39,
    name: "Premier League",
    apiName: "Premier League",
    season: 2024,
    flag: "https://media.api-sports.io/flags/gb.svg",
    order: 5,
  },
  {
    id: 135,
    name: "Serie A",
    apiName: "Serie A",
    season: 2024,
    flag: "https://media.api-sports.io/flags/it.svg",
    order: 6,
  },
  {
    id: 140,
    name: "La Liga",
    apiName: "La Liga",
    season: 2024,
    flag: "https://media.api-sports.io/flags/es.svg",
    order: 7,
  },
  {
    id: 78,
    name: "Bundesliga",
    apiName: "Bundesliga",
    season: 2024,
    flag: "https://media.api-sports.io/flags/de.svg",
    order: 8,
  },
  {
    id: 61,
    name: "Ligue 1",
    apiName: "Ligue 1",
    season: 2024,
    flag: "https://media.api-sports.io/flags/fr.svg",
    order: 9,
  },
  {
    id: 3,
    name: "Europa League",
    apiName: "UEFA Europa League",
    season: 2024,
    flag: "https://media.api-sports.io/flags/eu.svg",
    order: 10,
  },
  {
    id: 4,
    name: "Euro Championship",
    apiName: "Euro Championship",
    season: 2025,
    flag: "https://media.api-sports.io/flags/eu.svg",
    order: 11,
  },
  {
    id: 8,
    name: "Copa América",
    apiName: "Copa América",
    season: 2025,
    flag: "https://media.api-sports.io/flags/conmebol.svg",
    order: 12,
  },
  {
    id: 72,
    name: "Brasileirão Série B",
    apiName: "Série B",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 13,
  },
  {
    id: 75,
    name: "Brasileirão Série C",
    apiName: "Série C",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 14,
  },
  {
    id: 75,
    name: "Brasileirão Série D",
    apiName: "Série D",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 15,
  },
  {
    id: 94,
    name: "Primeira Liga",
    apiName: "Primeira Liga",
    season: 2024,
    flag: "https://media.api-sports.io/flags/pt.svg",
    order: 16,
  },
  {
    id: 624,
    name: "Carioca",
    apiName: "Carioca - 1",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 17,
  },
  {
    id: 475,
    name: "Paulista",
    apiName: "Paulista - A1",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 18,
  },
  {
    id: 629,
    name: "Mineiro",
    apiName: "Mineiro - 1",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 19,
  },
  {
    id: 602,
    name: "Baiano",
    apiName: "Baiano - 1",
    season: 2025,
    flag: "https://media.api-sports.io/flags/br.svg",
    order: 20,
  },
];

export const getSeasonByLeagueId = (leagueId: number): number | undefined => {
  const league = leaguesInfos.find((league) => league.id === leagueId);
  return league?.season;
};

export const getLeagueById = (leagueId: number) => {
  const league = leaguesInfos.find((league) => league.id === leagueId);
  return league;
};

export const getLeagueNameByApiName = (apiName: string): string | undefined => {
  const league = leaguesInfos.find((league) => league.apiName === apiName);
  return league?.name;
};

export const sortLeaguesByOrder = (leagueNames: string[]): string[] => {
  return leagueNames
    .map((apiName) => leaguesInfos.find((league) => league.apiName === apiName))
    .filter((league): league is (typeof leaguesInfos)[number] => !!league)
    .sort((a, b) => a.order - b.order)
    .map((league) => league.apiName);
};
