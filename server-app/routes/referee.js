const router = require("express").Router();

const referee = require("../models/Referee");
const { authorize }= require("../middleWare/authorize");
const Roles = require("../helpers/roles.js");

router.get("/",authorize([Roles.Manager]), (req, res) => {
  referee.findAll().then((referee) => {
    res.json(referee);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

module.exports = router;
