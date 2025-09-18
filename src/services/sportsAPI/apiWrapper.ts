"use client";
import {
  LeaguesService,
  FixturesService,
  TeamStatisticsService,
  PredictionService,
  LiveOddsInPlayService,
  OddsService,
  ApiClient,
  StandingsService,
  VenueService,
} from "football-wrapper";

const apiClient = new ApiClient("88abfd49fed49319f9ad3a3dd3e510ef");

const leagueService = new LeaguesService(apiClient);
const fixturesService = new FixturesService(apiClient);
const teamStatisticsService = new TeamStatisticsService(apiClient);
const predictionService = new PredictionService(apiClient);
const liveOddsInPlayService = new LiveOddsInPlayService(apiClient);
const standingsService = new StandingsService(apiClient);
const venueService = new VenueService(apiClient);
const oddsService = new OddsService(apiClient);

export {
  leagueService,
  fixturesService,
  teamStatisticsService,
  predictionService,
  liveOddsInPlayService,
  oddsService,
  standingsService,
  venueService,
};
