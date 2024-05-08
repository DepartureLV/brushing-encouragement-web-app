const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
const knex = require("../knex");
const loginRoutes = require("./../routes/login");
const { generateHashedPassword } = require("../authentication/password-hasher");

const { SCORES_TABLE } = require("./../global/global");

const SECRET_KEY = process.env.SECRET;

app.use(express.json());
app.use(cors());

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to Brush Buddy");
  });

  // LOGIN ENDPOINT
  app.post("/user/login", async (req, res, next) => {
    const { body } = req;
    const { user_email } = body;
    const { password } = body;

    const userVerficationData = await knex("user_credentials")
      .select("hashed_password", "salt")
      .where({ user_email: user_email })
      .first();

    if (!userVerficationData) {
      res
        .status(401)
        .send({ message: "Wrong username or password, please try again" });
      return;
    }

    const hashed_password = generateHashedPassword(
      password,
      userVerficationData.salt
    );

    if (hashed_password !== userVerficationData.hashed_password) {
      res
        .status(401)
        .send({ message: "Wrong username or password, please try again" });
    } else {
      jwt.sign(
        { message: "Login Successful" },
        SECRET_KEY,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
          }
          res.status(201).send({ token: token, message: "Login Successful" });
        }
      );
    }
  });

  // DASHBOARD ENDPOINT
  app.get("/leaderboard", async (req, res) => {
    const resp = await knex("scores")
      .select("*")
      .orderBy("streak_score", "desc");
    res.status(200).send(resp);
  });

  // this is create new challenger ??
  app.post("/scores/:id", async (req, res) => {
    const userId = parseInt(req.params.id);
    const newScoresEntry = {
      user_id: userId,
      streak_score: 0,
      star_score: 0,
    };

    const result = await knex
      .insert(newScoresEntry)
      .into(SCORES_TABLE)
      .returning(["id"]);

    const { id } = result[0];

    res.status(201).send({
      message: "New scores entry",
      id: id,
    });
  });

  // get each user's scores
  app.get("/scores/:id", async (req, res) => {
    const userId = req.params.id;
    const currentDate = new Date();

    // get the lastes timestamp of that user
    let lastBrush = await knex("brush_timestamps")
      .max("brush_timestamp")
      .where({ user_id: userId });

    // compare current with last brush
    if (lastBrush[0].max !== null) {
      let timeDifferenceInHours =
        Math.abs(currentDate.getTime() - lastBrush[0].max.getTime()) /
        (1000 * 3600);

      // if user lose streak, update first before sending back to client
      if (timeDifferenceInHours >= 24) {
        await knex("scores")
          .where("user_id", userId)
          .update({ streak_score: 0 });
      }
    }

    // send score back to client
    let score = await knex("scores")
      .join("user_credentials", "user_credentials.id", "=", "scores.user_id")
      .select({ streakScore: "streak_score", starScore: "star_score" })
      .where({ "user_credentials.id": userId })
      .first();

    res.status(200).send(score);
  });

  // app.use("/login", loginRoutes);

  app.put("/starScore/:id", async (req, res) => {
    const userId = req.params.id;
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    // check more than 2 time in 24 hours (GMT +7)
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
      .select({ starScore: "star_score" })
      .where({ user_id: userId });

    return res.status(200).send(starScore);
  });


  app.put("/starScore/flossy/:id", checkToken, async (req, res) => {
    const userId = req.params.id;
    const startOfDay = new Date();
    const endOfDay = new Date();

    startOfDay.setHours(0, 0, 0, 0);
    endOfDay.setHours(23, 59, 59, 999);

    // check more than 2 time in 24 hours (GMT +7)
    const flossyCount = await knex("flossy_timestamps")
      .where({
        user_id: userId,
      })
      .andWhere("flossy_timestamp", ">=", startOfDay)
      .andWhere("flossy_timestamp", "<=", endOfDay)
      .count("*");

    if (parseInt(flossyCount[0].count) >= 2) {
      return res.status(403).send("Be careful about over-flossing!");
    }

    const starScoreAmount = parseInt(flossyCount[0].count) < 2 ? 2 : 0;

    await knex("scores")
      .where("user_id", userId)
      .increment("star_score", starScoreAmount);

    await knex("flossy_timestamps").insert({
      user_id: userId,
    });

    let starScore = await knex("scores")
      .select({ starScore: "star_score" })
      .where({ user_id: userId });

    return res.status(200).send(starScore);
  });

  app.put("/streakScore/:id", checkToken, async (req, res) => {

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
      .select({ streakScore: "streak_score" })
      .where({ user_id: userId });

    return res.status(200).send(streakScore);
  });

  function checkToken(req, res, next) {
    const header = req.headers["authorization"];

    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1];

      jwt.verify(token, SECRET_KEY, (err) => {
        if (err) {
          res.sendStatus(403);
        } else {
          next();
        }
      });
    } else {
      res.sendStatus(403);
    }
  }

  return app;
};

module.exports = { setupServer };
