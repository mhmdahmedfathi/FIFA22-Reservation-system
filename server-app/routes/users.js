const router = require("express").Router();

const user = require("./models/User");

const { Router } = require("express");

const jwt = require("jsonwebtoken");

router.get("/profile/:username", (req, res) => {
  user.findOne({
    where: {
      username: req.params.username
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  }
  ).catch((err) => {
    res.status(500).json({ error: err });
  }
  );
}
);

