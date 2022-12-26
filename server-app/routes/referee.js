const router = require("express").Router();
const { Router } = require("express");

const referee = require("./models/Referee");

router.get("/referees", (req, res) => {
  referee.findAll().then((referee) => {
    res.json(referee);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);
