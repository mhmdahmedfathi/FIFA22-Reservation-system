const router = require('express').Router();

const user = require("../models/User");


router.get("/profile/:username", (req, res) => {
  console.log(req.params.username)
  user.findOne({
    where: {
      username: "yousifahmed"
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

module.exports = router;
