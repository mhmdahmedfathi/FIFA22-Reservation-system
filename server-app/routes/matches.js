const router = require("express").Router();
const { body, validationResult } = require('express-validator');
const match = require("../models/Match");
const { authorize } = require("../middleWare/authorize");
const Roles = require("../helpers/roles.js");
const Team = require("../models/Team");
const Referee = require("../models/Referee");
const Stadium = require("../models/Stadium");
const { Op } = require('sequelize')
// the only restriction is a team can not have two matches at the same day)
router.get("/", (req, res) => {
  match.findAll({
    attributes: ['id', 'date', 'isFull', 'time'],
    include: [{ model: Team, as: "team1", attributes: ['name'] },
    { model: Team, as: "team2", attributes: ['name'] },
    { model: Referee, as: "ref1", attributes: ['name'] },
    { model: Referee, as: "ref2", attributes: ['name'] },
    { model: Referee, as: "ref3", attributes: ['name'] },
    { model: Stadium, attributes: ['name' ,'rows' , 'seatsPerRow'] }
    ]

  }).then((match) => {
    res.json(match);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});

router.get("/:matchid", (req, res) => {
  match.findOne({
    where: {
      id: req.params.matchid
    },
    attributes: ['id', 'date', 'isFull', 'time'],
    include: [{ model: Team, as: "team1", attributes: ['name'] },
    { model: Team, as: "team2", attributes: ['name'] },
    { model: Referee, as: "ref1", attributes: ['name'] },
    { model: Referee, as: "ref2", attributes: ['name'] },
    { model: Referee, as: "ref3", attributes: ['name'] },
    { model: Stadium, attributes: ['name' ,'rows' , 'seatsPerRow'] }
    ]

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

router.post("/create", authorize([Roles.Manager]), (req, res) => {
  // check if the team is already have a match at the same day
  match.findOne({
    where: {
      date: Date.parse(req.body.date),
      [Op.or]: [{team1_id: req.body.team1}, { team1_id: req.body.team2 }],
      [Op.or]: [{team2_id: req.body.team1}, { team2_id: req.body.team2 }]
    }
  }).then((match_val) => {
    if (match_val) {
      return res.status(400).json({ error: "Team already have a match at the same day" });
    }
    // check if the stadium is already have a match at the same day
    match.findOne({
      where: {
        date: Date.parse(req.body.date),
        StadiumId: req.body.stadium_id
      }
    }).then((match_val) => {
      if(match_val){
        return res.status(400).json({ error: "Stadium already have a match at the same day" });
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
        time: req.body.time
      }).then((match) => {
        res.json(match);
      }).catch((err) => {
        res.status(400).json({ error: err });
      });
    });
  });
});

router.put("/:matchid", authorize([Roles.Manager]), (req, res) => {
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
