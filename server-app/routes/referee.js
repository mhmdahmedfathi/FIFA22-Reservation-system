const router = require("express").Router();

const referee = require("../models/Referee");

router.get("/", (req, res) => {
  referee.findAll().then((referee) => {
    res.json(referee);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

module.exports = router;
