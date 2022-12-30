const router = require('express').Router();

const user = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { authorize } = require('../middleWare/authorize');
const Roles = require('../helpers/roles');
const saltRounds = 10;


router.post("/register",
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .custom((value) => {
      return user.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .custom((value) => {
      return user.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject('Email already in use');
        }
      });
    }),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long'),
  body('firstname')
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string'),
  body('lastname')
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string'),
  body('birthdate')
    .notEmpty()
    .withMessage('Birthdate is required'),
  body('role')
  .notEmpty()
  .withMessage('Role is required')
  .isIn(['Manager', 'Fan', 'Admin'])
  .withMessage('Role must be either Manager or Fan or Admin'),
  body('gender')
  .notEmpty()
  .withMessage('gender is required')
  .isBoolean(),
  (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = bcrypt.hashSync(req.body.password.toString(), saltRounds);

    if (req.body.role === 'Manager') {
      req.isAproved = false;
    } else {
      req.isAproved = true;
    }

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
      nationality: req.body.nationality || null,
      isApproved: req.isAproved
    }).then((user) => {
      res.json(user);
    }).catch((err) => {
      res.status(400).json({ error: err });
    });
  });

router.post("/logout",authorize(), (req, res) => {
  console.log(req.token)
  res.json({ message: "Logged out" });
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
    const token = jwt.sign({ id: user.id , role: user.role }, jwtSecretKey, {
      expiresIn: 86400,
    });
    res.json({token: token  , user: user});
  }).catch((err) => {
    res.status(500).json({ error: err });
  });

});

module.exports = router;
