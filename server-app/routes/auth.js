const router = require('express').Router();

const user = require("../models/User");

const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.post("/register", (req, res) => {
  const hashedPassword = bcrypt.hashSync(req.body.password.toString(), saltRounds);

  // hash the password
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
  let jwtSecretKey = process.env.JWT_SECRET_KEY;

  user.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const passwordIsValid = bcrypt.compareSync(req.body.password.toString(), user.password);

    if (!passwordIsValid) {
      return res.status(401).json({ error: "Invalid password" });
    }
    const token = jwt.sign({ id: user.id }, jwtSecretKey, {
      expiresIn: 86400,
    });
    res.json({ auth: true, token: token });
  }).catch((err) => {
    res.status(500).json({ error: err });
  });

});

module.exports = router;
