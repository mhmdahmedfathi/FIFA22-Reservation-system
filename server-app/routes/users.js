const router = require('express').Router();

const { authorize } = require('../middleWare/authorize');
const user = require("../models/User");

router.get("/", authorize('Manager'), (req, res) => {
  user.findAll().then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
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

router.delete('/:username', (req, res) => {
  user.destroy({
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
