const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

// Define the model
const Stadium = db.define('Stadium', {
  // Model attributes are defined here
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  rows:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  seatsPerRow:{
    type: DataTypes.INTEGER,
    allowNull: false
  },
  country:{
    type: DataTypes.STRING
  },
  city:{
    type: DataTypes.STRING
  }

});

db.sync().then(() => {
  console.log('Stadium table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(Stadium === db.models.Stadium); // true

module.exports = Stadium;