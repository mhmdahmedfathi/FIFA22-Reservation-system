const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

// Define the model
const Team = db.define('Team', {
  // Model attributes are defined here
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  imagSource:{
    type: DataTypes.STRING
  }
});

db.sync().then(() => {
  console.log('Team table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(Team === db.models.Team); // true

module.exports = Team;