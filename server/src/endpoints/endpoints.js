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

  app.get("/scores/:id", async (req, res) => {
    const userId = req.params.id;
    let score = await knex("scores")
      .join("user_credentials", "user_credentials.id", "=", "scores.user_id")
      .select({streakScore: "streak_score", starScore: "star_score"})
      .where({"user_credentials.id": userId});
    res.status(200).send(score);
  })

  app.put("/streakScore/:id", async (req, res) => {
    console.log(req.body);
    const userId = req.params.id;
    const newStreak = parseInt(req.body.num);
    let addNewStreak = await knex("scores")
      .update({"streak_score": newStreak})
      .where({"id": userId})
      .returning(["streak_score"]);
    res.status(200).send(addNewStreak[0]);
  })
  return app;
}

module.exports = { setupServer };

// app.post("/hobbies", async (req, res) => {
//   const addHobby = req.body.NewHobby;
//   console.log(addHobby);
//   const post = await knex('hobby').insert({activity: addHobby});
//   res.status(200).send(post);
// });