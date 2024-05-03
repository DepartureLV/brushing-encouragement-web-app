const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

const setupServer = () => {
  app.get("/", (req, res) => {
    res.status(200).send("Welcome to Brush Buddy");
  })

  return app;
}

module.exports = { setupServer };