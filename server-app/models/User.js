const { Sequelize, DataTypes } = require('sequelize');

const db = require('../db/config');

// Define the model
const User = db.define('User', {
  // Model attributes are defined here
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstname: {  
    type: DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  birthdate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  gender: {
    type: DataTypes.BOOLEAN, // 0 FEMALE , 1 MALE
    allowNull: false
  },
  nationality: {
    type: DataTypes.STRING,
    allowNull: true
  },
  role: {
    type: DataTypes.ENUM('Manager', 'Fan', 'Admin'),
    allowNull: false
  }
  // is approved by admin for manager role
}, {});

db.sync().then(() => {
  console.log('User table created successfully!');
}).catch((error) => {
  console.error('Unable to create table : ', error);
});

// `sequelize.define` also returns the model
console.log(User === db.models.User); // true

module.exports = User;