// scripts/downloadFlags.js

const fs = require("fs");
const path = require("path");
const axios = require("axios");

const countries = [
  {
    league: {
      id: 66,
      name: "Coupe de France",
      type: "Cup",
      logo: "https://media.api-sports.io/football/leagues/66.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-11-15",
        end: "2024-11-30",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: false,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 64,
      name: "Feminine Division 1",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/64.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-09-21",
        end: "2025-05-07",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: true,
            statistics_players: true,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 61,
      name: "Ligue 1",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/61.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-18",
        end: "2025-05-18",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: true,
            statistics_players: true,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: true,
          predictions: true,
          odds: true,
        },
      },
    ],
  },
  {
    league: {
      id: 62,
      name: "Ligue 2",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/62.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-16",
        end: "2025-05-10",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: true,
            statistics_players: true,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: true,
        },
      },
    ],
  },
  {
    league: {
      id: 63,
      name: "National 1",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/63.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-16",
        end: "2025-05-16",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: true,
        },
      },
    ],
  },
  {
    league: {
      id: 67,
      name: "National 2 - Group A",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/67.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-17",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 68,
      name: "National 2 - Group B",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/68.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-17",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: true,
        },
      },
    ],
  },
  {
    league: {
      id: 69,
      name: "National 2 - Group C",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/69.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-17",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: true,
        },
      },
    ],
  },
  {
    league: {
      id: 461,
      name: "National 3 - Group A",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/461.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 462,
      name: "National 3 - Group B",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/462.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 463,
      name: "National 3 - Group C",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/463.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 464,
      name: "National 3 - Group D",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/464.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 465,
      name: "National 3 - Group E",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/465.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 466,
      name: "National 3 - Group F",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/466.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 1029,
      name: "National 3 - Group G",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/1029.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 467,
      name: "National 3 - Group H",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/467.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 468,
      name: "National 3 - Group I",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/468.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
  {
    league: {
      id: 469,
      name: "National 3 - Group J",
      type: "League",
      logo: "https://media.api-sports.io/football/leagues/469.png",
    },
    country: {
      name: "France",
      code: "FR",
      flag: "https://media.api-sports.io/flags/fr.svg",
    },
    seasons: [
      {
        year: 2024,
        start: "2024-08-24",
        end: "2025-05-17",
        current: true,
        coverage: {
          fixtures: {
            events: true,
            lineups: true,
            statistics_fixtures: false,
            statistics_players: false,
          },
          standings: true,
          players: true,
          top_scorers: true,
          top_assists: true,
          top_cards: true,
          injuries: false,
          predictions: true,
          odds: false,
        },
      },
    ],
  },
];

const leaguesInfos = [
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
    name: "Copa do Brasil",
    apiName: "Copa do Brasil",
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

async function downloadFlags() {
  const flagsDir = path.join(__dirname, "../public/images/leagues/fr");
  if (!fs.existsSync(flagsDir)) {
    fs.mkdirSync(flagsDir, { recursive: true });
  }

  for (const country of countries) {
    const code = country.league.id;
    const flagUrl = country.league.logo;
    const fileExtension = path.extname(flagUrl).split("?")[0] || ".png";
    const fileName = `${code}${fileExtension}`;
    const filePath = path.join(flagsDir, fileName);

    try {
      const response = await axios.get(flagUrl, {
        responseType: "arraybuffer",
      });
      fs.writeFileSync(filePath, response.data);
      console.log(`Downloaded flag for ${code}`);
    } catch (error) {
      console.error(`Failed to download flag for ${code}:`, error.message);
    }
  }
}

// downloadFlags();

async function downloadTeamLogos() {
  const API_URL = "https://v3.football.api-sports.io/standings";
  const API_KEY = "";
  const teamsDir = path.join(__dirname, "../public/images/teams/");

  // Cria a pasta "teams" caso não exista
  if (!fs.existsSync(teamsDir)) {
    fs.mkdirSync(teamsDir, { recursive: true });
  }

  for (const league of leaguesInfos) {
    const leagueId = league.id;
    const season = league.season;

    try {
      // Fazendo requisição para obter as classificações da liga
      const response = await axios.get(API_URL, {
        params: { league: leagueId, season },
        headers: {
          "x-rapidapi-key": API_KEY,
          "x-rapidapi-host": "v3.football.api-sports.io",
        },
      });

      const standings = response.data.response[0]?.league?.standings;
      if (!standings) {
        console.log(
          `Nenhuma classificação encontrada para a liga ${league.name}`
        );
        continue;
      }

      for (const group of standings) {
        for (const teamData of group) {
          const team = teamData.team;
          const teamId = team.id;
          const logoUrl = team.logo;
          const fileExtension = path.extname(logoUrl).split("?")[0] || ".png";
          const fileName = `${teamId}${fileExtension}`;
          const filePath = path.join(teamsDir, fileName);

          // Se o arquivo já existe, pula o download
          if (fs.existsSync(filePath)) {
            console.log(`Logo já existe: ${fileName}, pulando download.`);
            continue;
          }

          try {
            const logoResponse = await axios.get(logoUrl, {
              responseType: "arraybuffer",
            });
            fs.writeFileSync(filePath, logoResponse.data);
            console.log(`Baixado: ${teamId} (${team.name})`);
          } catch (error) {
            console.error(`Erro ao baixar logo de ${team.name}:`, error);
          }
        }
      }
    } catch (error) {
      console.error(
        `Erro ao buscar standings para ${league.name}:`,
        error.message
      );
    }
  }
}
