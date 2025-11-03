// Simple NBA stats scanner backend
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.ODDS_API_KEY;

// Allow frontend access
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Endpoint to get NBA player lines
app.get("/api/lines", async (req, res) => {
  try {
    const response = await fetch(`https://api.the-odds-api.com/v4/sports/basketball_nba/odds?regions=us&markets=player_points,player_rebounds,player_assists&oddsFormat=decimal&apiKey=${API_KEY}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch NBA lines" });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
