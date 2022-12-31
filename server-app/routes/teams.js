const router = require("express").Router();
const team = require("../models/Team");
const { authorize } = require('../middleWare/authorize');
const Roles = require('../helpers/roles.js');

router.get("/",authorize([Roles.Admin, Roles.Manager]), (req, res) => {
  team.findAll().then((team) => {
    res.json(team);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

module.exports = router;
