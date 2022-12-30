const router = require("express").Router();


const stadium = require("../models/Stadium");
const { authorize } = require('../middleWare/authorize');
const Roles = require('../helpers/roles.js');
const { body, validationResult } = require('express-validator');

router.get("/", authorize([Roles.Manager]), (req, res) => {
  stadium.findAll().then((stadium) => {
    res.json(stadium);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

router.get("/:stadiumid", authorize([Roles.Manager]), (req, res) => {
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

router.post("/",
  body('name')
    .custom((value) => {
      return stadium.findOne({
        where: {
          name: value
        }
      }).then((stadium) => {
        if (stadium) {
          return Promise.reject('Stadium name already in use');
        }
      });
    }),
  authorize([Roles.Manager]), (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
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

