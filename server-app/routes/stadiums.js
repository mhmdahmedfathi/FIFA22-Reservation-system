const router = require("express").Router();

const { Router } = require("express");

const stadium = require("./models/Stadium");

router.get("/stadiums", (req, res) => {
  stadium.findAll().then((stadium) => {
    res.json(stadium);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

router.get("/stadiums/:id", (req, res) => {
  stadium.findOne({
    where: {
      id: req.params.id
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

router.post("/stadiums", (req, res) => {
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

