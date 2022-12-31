const router = require('express').Router();

const { authorize } = require('../middleWare/authorize');
const user = require("../models/User");
const { verify } = require("jsonwebtoken");
const Roles = require('../helpers/roles.js');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Admin routes 

// authorized only for site admin 
router.get("/", authorize([Roles.Admin]), (req, res) => {
  user.findAll().then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});


router.post("/approve/:id", authorize([Roles.Admin]), (req, res) => {
  user.findOne({
    where: {
      id: req.params.id
    }
  }).then((user) => {
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role != Roles.Manager) {
      return res.status(400).json({ error: "User is not a Manager it is already approved" });
    }
    user.update({
      isApproved: true
    }).then((user) => {
      res.json(user);
    }
    ).catch((err) => {
      res.status(400).json({ error: err });
    }
    );
  }
  ).catch((err) => {
    res.status(500).json({ error: err });
  }
  );
});

router.delete('/:id', authorize([Roles.Admin]), (req, res) => {
  user.destroy({
    where: {
      id: req.params.id
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
});

router.put("/:username",
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .custom((value) => {
      return user.findOne({ where: { username: value } }).then((user) => {
        if (user) {
        if (user.username == value) {
            return Promise.reject('Username already in use');
          }
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
          if (user.email == value) {
            return Promise.reject('Email already in use');
          }
        }
      });
    }),
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
  authorize([Roles.Admin]), (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    user.findOne({
      where: {
        username: req.params.username
      }
    }).then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.update({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        role: req.body.role,
        nationality: req.body.nationality || null
      }).then((user) => {
        res.json(user);
      }
      ).catch((err) => {
        res.status(400).json({ error: err });
      }
      );
    }
    ).catch((err) => {
      res.status(500).json({ error: err });
    }
    );
  });


router.get("/me", authorize(), (req, res) => {
  // get token from header
  user.findOne({
    where: {
      id: req.user.id
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

});

router.put("/profile/:username",
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .custom((value) => {
      return user.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          if (user.username != value) {
            return Promise.reject('Username already in use');
          }
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
          if (user.email != value) {
            return Promise.reject('Email already in use');
          }
        }
      });
    }),
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
  authorize([Roles.Fan]), (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // const hashedPassword = bcrypt.hashSync(req.body.password.toString(), saltRounds);

    user.findOne({
      where: {
        username: req.params.username
      }
    }).then((user) => {
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      user.update({
        username: req.body.username,
        email: req.body.email,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        birthdate: req.body.birthdate,
        gender: req.body.gender,
        role: req.body.role,
        nationality: req.body.nationality
      }).then((user) => {
        res.json(user);
      }
      ).catch((err) => {
        res.status(400).json({ error: err });
      }
      );
    }
    ).catch((err) => {
      res.status(500).json({ error: err });
    }
    
    
    );
  });


router.get("/profile/:username", authorize([Roles.Fan]), (req, res) => {
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
});





module.exports = router;
