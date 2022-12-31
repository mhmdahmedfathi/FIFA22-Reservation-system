'use strict';
// npx sequelize-cli db:seed:all
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Referees', [
      {
        name: 'Ahmed',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mohamed',
        createdAt: new Date(),
        updatedAt: new Date()

      },
      {
        name: 'Ali',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khaled',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hassan',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Mahmoud',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hossam',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hesham',
        createdAt: new Date(),
        updatedAt: new Date()
      }

    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Referees', null, {});
  }
};
