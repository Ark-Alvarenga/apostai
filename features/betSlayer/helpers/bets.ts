import { defaultPreferredBookmakers } from "@/constants";
import {
  BetAnalysis,
  BetPossibility,
  Bookmaker,
  SelectedGameObj,
} from "@/types";

type Badge = {
  color: string;
  text: string;
};

// Function to return badges based on the bet analysis
export const getBadges = (bet: BetAnalysis): Badge[] => {
  const badges: Badge[] = [];
  const chanceOfWin = 1 / bet.odds;
  // 1. High Chance of Win
  if (chanceOfWin > 0.9) {
    badges.push({ color: "red", text: "highChance" });
  }

  // 2. Low Risk Bet
  if (chanceOfWin > 0.75 && chanceOfWin <= 0.9) {
    badges.push({ color: "green", text: "lowRisk" });
  }

  // 3. Safe Bet
  if (chanceOfWin > 0.6 && chanceOfWin <= 0.75) {
    badges.push({ color: "teal", text: "safebet" });
  }

  // 4. High Reward Bet - odds greater than 3.0
  if (bet.odds > 3.0) {
    badges.push({ color: "blue", text: "highReward" });
  }

  // 5. Long Shot Bet - odds greater than 5.0
  if (bet.odds > 5.0) {
    badges.push({ color: "purple", text: "longShot" });
  }

  // 6. Underdog Bet - betting on the underdog (based on high odds)
  if (bet.rationale.toLowerCase().includes("underdog")) {
    badges.push({ color: "dark-gray", text: "underdog" });
  }

  // 7. Hot Pick - based on a specific rationale containing keywords
  if (bet.rationale.toLowerCase().includes("hot")) {
    badges.push({ color: "yellow", text: "hotPick" });
  }

  // 8. High Confidence - specific rationale keywords indicating confidence
  if (bet.rationale.toLowerCase().includes("sure win")) {
    badges.push({ color: "light-green", text: "highConfidence" });
  }

  // 9. Special Type Bet - such as "over/under" or "parlay"
  if (bet.type.toLowerCase() === "parlay") {
    badges.push({ color: "cyan", text: "parlay" });
  }
  if (bet.type.toLowerCase() === "over/under") {
    badges.push({ color: "pink", text: "overUnder" });
  }

  // 10. Bet on Favorite - if bet is placed on the favorite team/player
  if (bet.type.toLowerCase() === "favorite") {
    badges.push({ color: "gold", text: "favorite" });
  }

  return badges;
};

export const filterBookmakers = (
  bookmakers: Bookmaker[],
  preferredBookmakers = defaultPreferredBookmakers
): Bookmaker[] => {
  return bookmakers.filter((bookmaker) =>
    preferredBookmakers.includes(bookmaker.name.toLowerCase())
  );
};

export const getUniqueBetsWithHighestOdds = (
  bookmakers: Bookmaker[]
): BetPossibility[] => {
  const betMap = new Map<number, BetPossibility>();

  for (const bookmaker of bookmakers) {
    for (const bet of bookmaker.bets) {
      if (!betMap.has(bet.id)) {
        // Initialize a new bet entry if it doesn't exist
        betMap.set(bet.id, {
          ...bet,
          values: bet.values.map((value) => ({
            ...value,
            bookmakerId: bookmaker.id,
            bookmakerName: bookmaker.name,
          })),
        });
      } else {
        // If the bet already exists, update it with the highest odds
        const existingBet = betMap.get(bet.id)!;

        for (const value of bet.values) {
          const existingValue = existingBet.values.find(
            (v) => v.value === value.value
          );
          const currentOdd = parseFloat(value.odd);

          if (existingValue) {
            const existingOdd = parseFloat(existingValue.odd);
            if (currentOdd > existingOdd) {
              // Update the value with the higher odd
              existingValue.odd = value.odd;
              existingValue.bookmakerId = bookmaker.id;
              existingValue.bookmakerName = bookmaker.name;
            }
          } else {
            // Add new value if it doesn't exist
            existingBet.values.push({
              ...value,
              bookmakerId: bookmaker.id,
              bookmakerName: bookmaker.name,
            });
          }
        }
      }
    }
  }

  // Convert the Map back to an array and sort it
  return Array.from(betMap.values()).sort((a, b) => a.id - b.id);
};

export const parseMatchData = (data: SelectedGameObj): string => {
  const { teams, comparison, predictions } = data;

  // Extract relevant data
  const home = teams.home;
  const away = teams.away;

  const comp = comparison;
  const pred = predictions;

  // Construct a compact string
  return `
  Home Team: ${home.name}, Form: ${home.last_5?.form}, League Form: ${home.league?.form}
  Away Team: ${away.name}, Form: ${away.last_5?.form}, League Form: ${away.league?.form}

  Comparison: 
  Form: ${comp?.form.home}-${comp?.form.away}, 
  Attack: ${comp?.att.home}-${comp?.att.away}, 
  Defense: ${comp?.def.home}-${comp?.def.away},
  Poisson: ${comp?.poisson_distribution.home}-${comp?.poisson_distribution.away},
  H2H: ${comp?.h2h.home}-${comp?.h2h.away}, 
  Goals: ${comp?.goals.home}-${comp?.goals.away},
  Total: ${comp?.total.home}-${comp?.total.away}

  Predictions:
  Winner: ${pred.winner?.name} (${pred.winner?.comment}), 
  Win or Draw: ${pred.win_or_draw}, 
  Chances - Home: ${pred.percent.home}, Draw: ${pred.percent.draw}, Away: ${pred.percent.away}, 
  Advice: ${pred.advice}
  `
    .replace(/\s+/g, " ")
    .trim();
};
