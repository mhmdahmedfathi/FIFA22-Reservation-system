const router = require("express").Router();
const team = require("../models/Team");

router.get("/", (req, res) => {
  team.findAll().then((team) => {
    res.json(team);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

module.exports = router;
