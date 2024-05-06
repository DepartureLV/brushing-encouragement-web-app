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
      console.log("brush count is: ", brushCount);

    if (parseInt(brushCount[0].count) > 2) {
      return res.status(403).send("Be careful about over-brushing!");
      }
      
    const starScoreAmount = parseInt(brushCount[0].count) === 0 ? 2 : 1;
    console.log("star to be added is: ", starScoreAmount);
    
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

// const newStreak = parseInt(req.body.num);
//     let addNewStreak = await knex("scores")
//       .update({"streak_score": newStreak})
//       .where({"id": userId})
//       .returning(["streak_score"]);
//     res.status(200).send(addNewStreak[0]);
//   })

// const newStar = parseInt(req.body.num);
//     let addNewStar = await knex("scores")
//       .update({"star_score": newStar})
//       .where({"id": userId})
//       .returning(["star_score"]);
//     res.status(200).send(addNewStar[0]);

// app.post("/score/:id", async (req, res) => {
//   const userId = req.params.id;
//   const startOfDay = new Date();
//   const endOfDay = new Date();
  
//   startOfDay.setHours(0, 0, 0, 0); 
//   endOfDay.setHours(23, 59, 59, 999); 

//   const brushCount = await knex("user_brush_timestamp")
//     .join("brush_timestamp", "brush_timestamp.id", "=", "user_brush_timestamp.brush_id")
//     .where({
//         user_id: userId,
//     })
//     .andWhere("brush_timestamp", ">=", startOfDay)
//     .andWhere("brush_timestamp", "<=", endOfDay)
//     .count("*");

//   if (parseInt(brushCount.count) >= 2) {
//     return res.status(403).send("You can only brush twice per day!");
//   }
  
//   const starScoreAmount = parseInt(brushCount.count) === 0 ? 2 : 1;

//   await knex("scores")
//     .where("user_id", userId)
//     .increment("star_score", starScoreAmount);
  
//   const currentTime = Date.now()

//   await knex("brush_timestamp").insert({
//     brush_timestamp: currentTime, 
//   });

//   await knex.insert("user_brush_timestamp")
//     .join("brush_timestamp", "brush_timestamp.id", "=", "user_brush_timestamp.brush_id")

//   let score = await knex("scores")
//     .join("user_credentials", "user_credentials.id", "=", "scores.user_id")
//     .select({streakScore: "streak_score", starScore: "star_score"})
//     .where({"user_credentials.id": userId});

//   return res.status(200).send(score);
//   }
// )