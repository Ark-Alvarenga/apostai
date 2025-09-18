import axios from "axios";
// import { getEnv } from "../global/getEnv";

const FOOTBALL_API_URL =
  process.env.FOOTBALL_API_URL || "http://localhost:3666/api";
const FOOTBALL_API_KEY = process.env.FOOTBALL_API_KEY || "";

const footballApiClient = axios.create({
  baseURL: FOOTBALL_API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${FOOTBALL_API_KEY}`,
  },
});

export default footballApiClient;
