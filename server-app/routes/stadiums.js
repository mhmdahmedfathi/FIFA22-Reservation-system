const router = require("express").Router();


const stadium = require("../models/Stadium");
const { authorize } = require('../middleWare/authorize');
const Roles = require('../helpers/roles.js');

router.get("/",authorize([Roles.Manager]), (req, res) => {
  stadium.findAll().then((stadium) => {
    res.json(stadium);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

router.get("/:stadiumid",authorize([Roles.Manager]), (req, res) => {
  stadium.findOne({
    where: {
      id: req.params.stadiumid
    }
  }).then((stadium) => {
    if (!stadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }
    res.json(stadium);
  }
  ).catch((err) => {
    res.status(500).json({ error: err });
  }
  );
}
);

router.post("/",authorize([Roles.Manager]), (req, res) => {
  stadium.create({
    name: req.body.name,
    rows: req.body.rows,
    seatsPerRow: req.body.seatsPerRow,
    city: req.body.city,
    country: req.body.country
  }).then((stadium) => {
    res.json(stadium);
  }).catch((err) => {
    res.status(400).json({ error: err });
  });
}
);

module.exports = router;

