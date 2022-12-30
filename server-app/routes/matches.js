const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const match = require("../models/Match");
const { authorize }= require("../middleWare/authorize");
const Roles = require("../helpers/roles.js");

// the only restriction is a team can not have two matches at the same day)
router.get("/", (req, res) => {
  match.findAll().then((match) => {
    res.json(match);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});

router.get("/:matchid", (req, res) => {
  match.findOne({
    where: {
      id: req.params.matchid
    }
  }).then((match) => {
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    res.json(match);
  }
  ).catch((err) => {
    res.status(500).json({ error: err });
  }
  );
}
);

router.post("/create",authorize([Roles.Manager]), (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  match.create({
    date: req.body.date,
    isFull: req.body.isFull,
    team1_id: req.body.team1,
    team2_id: req.body.team2,
    ref1_id: req.body.referee1,
    ref2_id: req.body.referee2,
    ref3_id: req.body.referee3,
    StadiumId: req.body.stadium_id,
  }).then((match) => {
    res.json(match);
  }).catch((err) => {
    res.status(400).json({ error: err });
  });
});

router.put("/:matchid",authorize([Roles.Manager]), (req, res) => {
  match.findOne({
    where: {
      id: req.params.matchid
    }
  }).then((match) => {
    if (!match) {
      return res.status(404).json({ error: "Match not found" });
    }
    match.update({
      date: req.body.date,
      isFull: req.body.isFull,
      team1_id: req.body.team1,
      team2_id: req.body.team2,
      ref1_id: req.body.referee1,
      ref2_id: req.body.referee2,
      ref3_id: req.body.referee3,
      StadiumId: req.body.stadium_id,
    }).then((match) => {
      res.json(match);
    }).catch((err) => {
      res.status(400).json({ error: err });
    });
  });
});

module.exports = router;
