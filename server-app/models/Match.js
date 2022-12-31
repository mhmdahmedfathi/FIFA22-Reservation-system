const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

const Stadium = require('./Stadium.js')
const Referee = require('./Referee')
const Team = require('./Team')

// Define the model
const Match = db.define('Match', {
  date:{
    type: DataTypes.STRING
  },
  isFull:{
    type: DataTypes.BOOLEAN
  },
  time:{
    type: DataTypes.STRING
  }
});

Match.belongsTo(Team, {
  foreignKey: "team1_id",
  as: "team1"
}); // foreign key added to the Match table
Match.belongsTo(Team,{
  foreignKey: "team2_id",
  as: "team2"
}); // foreign key added to the Match table
Match.belongsTo(Stadium); // foreign key added to the Match table
Match.belongsTo(Referee,{
  foreignKey: "ref1_id",
  as : "ref1"
}); // foreign key added to the Match table
Match.belongsTo(Referee,{
  foreignKey: "ref2_id",
  as: "ref2"
}); // foreign key added to the Match table
Match.belongsTo(Referee,{
  foreignKey: "ref3_id",
  as: "ref3"
}); // foreign key added to the Match table


db.sync().then(() => {
  console.log('Match table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(Match === db.models.Match); // true

module.exports = Match;