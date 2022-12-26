const router = require("express").Router();

const user = require("./models/user");

const { Router } = require("express");

const jwt = require("jsonwebtoken");

router.post("/register", (req, res) => {
  // hash the password
  const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    user.create({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: req.body.birthdate,
    gender: req.body.gender,
    role: req.body.role,
    nationality: req.body.nationality
  }).then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(400).json({ error: err });
  });
});

router.post("/login", (req, res) => {
  user.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(
      req.body.password,
      user.password
    );
    if (!passwordIsValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400,
    });
    res.json({ auth: true, token: token });
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});
