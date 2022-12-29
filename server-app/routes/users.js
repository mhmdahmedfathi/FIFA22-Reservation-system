const router = require('express').Router();

const { authorize } = require('../middleWare/authorize');
const user = require("../models/User");
const { verify } = require("jsonwebtoken");

router.get("/", authorize(['Admin', 'Manager']), (req, res) => {
  user.findAll().then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});

// admin approve Manger endpoint 

router.get("/me", (req, res) => {
  // get token from header
  const accessToken = req.header('authorization').split(' ')[1];
  if (!accessToken) res.json({ error: "User is not logged in" });
  else try {
    const validtoken = verify(accessToken, process.env.JWT_SECRET_KEY);
    req.user = validtoken;
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
  } catch (err) {
    res.json({ error: err });
  }    
 
});

router.put("/profile/:username", (req, res) => {
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
      password: hashedPassword,
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

router.put("/:username", (req, res) => {
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
      password: hashedPassword,
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
});

router.delete('/:id', (req, res) => {
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



module.exports = router;
