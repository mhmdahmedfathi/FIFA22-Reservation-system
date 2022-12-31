const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');
const User = require('./User.js')
const Match = require('./Match.js')

// Define the model
const Reservation = db.define('Reservation', {
  // Model attributes are defined here
  date:{
    type: DataTypes.STRING
  },
  setNumber:{
    type: DataTypes.INTEGER
  }
});

db.sync().then(() => {
  console.log('Reservation table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

Reservation.belongsTo(User); // foreign key added to the Reservation table
Reservation.belongsTo(Match); // foreign key added to the Reservation table
// `sequelize.define` also returns the model
console.log(Reservation === db.models.Reservation); // true

module.exports = Reservation;