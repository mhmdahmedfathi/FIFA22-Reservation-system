const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

const Stadium = require('./Stadium.js')
const Referee = require('./Referee')
const Team = require('./Team')

// Define the model
const Match = db.define('Match', {
  date:{
    type: DataTypes.DATE
  },
  isFull:{
    type: DataTypes.BOOLEAN
  },
  time:{
    type: DataTypes.TIME
  }
});

Match.hasOne(Team, {
  foreignKey: "team1_id"
}); // foreign key added to the Match table
Match.hasOne(Team,{
  foreignKey: "team2_id"
}); // foreign key added to the Match table
Match.hasOne(Stadium); // foreign key added to the Match table
Match.hasOne(Referee,{
  foreignKey: "ref1_id"
}); // foreign key added to the Match table
Match.hasOne(Referee,{
  foreignKey: "ref2_id"
}); // foreign key added to the Match table
Match.hasOne(Referee,{
  foreignKey: "ref3_id"
}); // foreign key added to the Match table


db.sync().then(() => {
  console.log('Match table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(Match === db.models.Match); // true

module.exports = Match;