'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Stadia', [
      {
        name: 'Cairo International Stadium',
        rows: 10,
        seatsPerRow: 10,
        country: 'Egypt',
        city: 'Cairo',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Suez Stadium',
        rows: 10,
        seatsPerRow: 10,
        country: 'Egypt',
        city: 'Suez',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Alexandria Stadium',
        rows: 10,
        seatsPerRow: 10,
        country: 'Egypt',
        city: 'Alexandria',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        name: 'Ramses Stadium',
        rows: 10,
        seatsPerRow: 10,
        country: 'Egypt',
        city: 'Giza',
        createdAt: new Date(),
        updatedAt: new Date()

      }]);


  },

  async down(queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Stadia', null, {});
  }
};
