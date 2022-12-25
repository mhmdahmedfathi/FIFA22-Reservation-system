const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

// Define the model
const Referee = db.define('Referee', {
  // Model attributes are defined here
  name:{
    type: DataTypes.STRING,
    allowNull: false
  }
});

db.sync().then(() => {
  console.log('Referee table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(Referee === db.models.Referee); // true

module.exports = Referee;