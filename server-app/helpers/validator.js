const { body, validationResult } = require('express-validator');

module.exports.validateUser = (req , res, next) => {
  console.log("heerrrrrr")
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isString()
    .custom((value) => {
      return user.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject('Username already in use');
        }
      });
    }),
    body('email')
      .notEmpty()
      .withMessage('Email is required')
      .isEmail()
      .custom((value) => {
        return user.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject('Email already in use');
          }
        });
      }),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 characters long'),
    body('firstname')
      .notEmpty()
      .withMessage('First name is required')
      .isString()
      .withMessage('First name must be a string'),
    body('lastname')
      .notEmpty()
      .withMessage('Last name is required')
      .isString()
      .withMessage('Last name must be a string'),
    body('birthdate')
      .notEmpty()
      .withMessage('Birthdate is required'),
    body('role')
      .notEmpty()
      .withMessage('Role is required')
      .isIn(['Manager', 'Fan', 'Admin'])
      .withMessage('Role must be either Manager or Fan or Admin'),
    body('gender')
      .notEmpty()
      .withMessage('gender is required')
      .isBoolean()

}