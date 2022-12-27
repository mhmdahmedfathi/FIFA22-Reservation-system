const router = require('express').Router();

const user = require("../models/User");

router.get("/", (req, res) => {
  user.findAll().then((user) => {
    res.json(user);
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
});

router.put("/profile/:username" , (req , res) =>{
  
});

router.put("/:username" , (req , res) => {

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
