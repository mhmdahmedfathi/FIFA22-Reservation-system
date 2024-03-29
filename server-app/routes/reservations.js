const router = require("express").Router();
const reservation = require("../models/Reservation");
const Roles = require("../helpers/roles.js");
const { authorize } = require('../middleWare/authorize');
const match = require("../models/Match");
const { body, validationResult } = require('express-validator');

router.get("/:id", authorize([Roles.Manager, Roles.Fan]), (req, res) => {
  reservation.findAll({
    attributes: ['setNumber'],
    where: {
      MatchId: req.params.id
    }
  }).then((reservation) => {
    setNumbers = [];
    reservation.forEach((element) => {
      setNumbers.push(element.setNumber);
    });
    res.json({ seatNumbers: setNumbers });
  }).catch((err) => {
    res.status(500).json({ error: err });
  });
}
);

router.post("/",
  body('seatNumber')
    .notEmpty()
    .isInt()
    .withMessage('Seat number must be an integer'),
  body('matchId')
    .notEmpty()
    .isInt()
    .withMessage('Match id must be an integer'),
  authorize([Roles.Fan]), (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // check wether the set is already reserved
    reservation.findOne({
      where: {
        setNumber: req.body.seatNumber,
        MatchId: req.body.matchId
      }
    }).then((reservation_val) => {
      if (reservation_val) {
        return res.status(400).json({ error: "Set is already reserved" });
      }
      reservation.create({
        date: new Date(Date.now()).toLocaleString().split(',')[0].toString(),
        setNumber: req.body.seatNumber,
        MatchId: req.body.matchId,
        UserId: req.user.id
      }).then((reservation) => {
        res.json(reservation);
      })
    }

    );
  });

router.delete("/:matchId/:seatNumber", authorize([Roles.Fan]), (req, res) => {
  // check the time of the match

  const threeDaysAfterToday = new Date();
  threeDaysAfterToday.setDate(threeDaysAfterToday.getDate() + 3);

  // check wether the user is the owner of the reservation
  reservation.findOne({
    where: {
      setNumber: req.params.seatNumber,
      MatchId: req.params.matchId
    },
    include: [{
      model: match,
      attributes: ['date']
    }]
  }).then((reservation_val) => {
    if (!reservation_val) {
      return res.status(404).json({ error: "Reservation not found" });
    }
    if (reservation_val.UserId != req.user.id) {
      return res.status(400).json({ error: "You are not the owner of this reservation" });
    }
    if (new Date(reservation_val.Match.date) < threeDaysAfterToday) {
      return res.status(400).json({ error: "you can't cancel the ticket less than 3 days before the match" });
    }
    reservation.destroy({
      where: {
        id: reservation_val.id
      }
    }).then((reservation) => {
      res.json(reservation);
    }
    ).catch((err) => {
      res.status(500).json({ error: err });
    }
    );
  });

});



module.exports = router;