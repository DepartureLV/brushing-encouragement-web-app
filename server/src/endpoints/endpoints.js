const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('../knex');

app.use(express.json());
app.use(cors());

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to Brush Buddy");
  })

  app.get("/score/:id", async (req, res) => {
    const userId = req.params.id;
    let score = await knex("scores")
      .join("user_credentials", "user_credentials.id", "=", "scores.user_id")
      .select({streakScore: "streak_score", starScore: "star_score"})
      .where({"user_credentials.id": userId})
      .first();
    res.status(200).send(score);
  })

  return app;
}

module.exports = { setupServer };