'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Teams', [
      {
        name: 'Ahly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Zamalek',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Al Ahly',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'El ismaily',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Al Masry',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Al Ittihad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Real Madrid',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Barcelona',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bayern Munich',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juventus',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);

  },

  async down (queryInterface, Sequelize) {
   return queryInterface.bulkDelete('Teams', null, {});
  }
};
