const express = require('express');
const cors = require('cors');
const app = express();
const knex = require('../knex');
const loginRoutes = require("./../routes/login");

const { SCORES_TABLE } = require("./../global/global");

app.use(express.json());
app.use(cors());

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to Brush Buddy");
  })

  app.post("/scores/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const newScoresEntry = {
      user_id: userId,
      streak_score: 0,
      star_score: 0,
    }

    const result = await knex
    .insert(newScoresEntry)
    .into(SCORES_TABLE)
    .returning(['id']);

    const { id } = result[0];

    res.status(201).send({
      message: "New scores entry",
      id: id,
    });
  });

  app.get("/scores/:id", async (req, res) => {
    const userId = req.params.id;
    const currentDate = new Date();

    let lastBrush = await knex("brush_timestamps")
      .max("brush_timestamp")
      .where({"user_id": userId});
    console.log("last brush:", lastBrush);
    
    if (lastBrush[0].max !== null) {
    let timeDifferenceInHours = Math.abs(currentDate.getTime() - lastBrush[0].max.getTime())/ (1000 * 3600);

    if (timeDifferenceInHours >= 24) {
      await knex("scores")
      .where("user_id", userId)
      .update({"streak_score": 0});
    }
  }
    let score = await knex("scores")
      .join("user_credentials", "user_credentials.id", "=", "scores.user_id")
      .select({streakScore: "streak_score", starScore: "star_score"})
      .where({"user_credentials.id": userId})
      .first();

    res.status(200).send(score);
  })
  
  app.use("/login", loginRoutes);

  app.put("/starScore/:id", async (req, res) => {
    const userId = req.params.id;
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0); 
    endOfDay.setHours(23, 59, 59, 999); 

    const brushCount = await knex("brush_timestamps")
      .where({
        user_id: userId,
      })
      .andWhere("brush_timestamp", ">=", startOfDay)
      .andWhere("brush_timestamp", "<=", endOfDay)
      .count("*");

    if (parseInt(brushCount[0].count) >= 2) {
      return res.status(403).send("Be careful about over-brushing!");
      }
      
    const starScoreAmount = parseInt(brushCount[0].count) < 2 ? 2 : 0;
    
    await knex("scores")
      .where("user_id", userId)
      .increment("star_score", starScoreAmount);

    await knex("brush_timestamps").insert({
      user_id: userId, 
      });

    let starScore = await knex("scores")
      .select({starScore: "star_score"})
      .where({"user_id": userId});
    
    return res.status(200).send(starScore);
  })

  app.put("/streakScore/:id", async (req, res) => {
    const userId = req.params.id;
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0); 
    endOfDay.setHours(23, 59, 59, 999); 

    const brushCount = await knex("brush_timestamps")
      .where({
        user_id: userId,
      })
      .andWhere("brush_timestamp", ">=", startOfDay)
      .andWhere("brush_timestamp", "<=", endOfDay)
      .count("*");

    const streakScoreAmount = parseInt(brushCount[0].count) === 0 ? 1 : 0;
    
    await knex("scores")
      .where("user_id", userId)
      .increment("streak_score", streakScoreAmount);

    let streakScore = await knex("scores")
      .select({streakScore: "streak_score"})
      .where({"user_id": userId});
    
    return res.status(200).send(streakScore);
  })

  return app;
}

module.exports = { setupServer };