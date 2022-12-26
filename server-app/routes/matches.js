const router = require("express").Router();

const user = require("./models/user");

const { Router } = require("express");

const match = require("./models/Match");

router.get("/matches", (req, res) => {
  match.findAll().then((match) => {
    res.json(match);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});

router.get("/matches/:id", (req, res) => {
  match.findOne({
    where: {
      id: req.params.id
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

router.post("/matches/create", (req, res) => {
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

router.put("/matches/:id", (req, res) => {
  match.findOne({
    where: {
      id: req.params.id
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




