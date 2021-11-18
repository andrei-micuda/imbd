'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const actors = [];
    for (let i = 0; i < 100; i++) {
      const refDate = new Date(faker.date.past());
      refDate.setFullYear(refDate.getFullYear() - 18);
      actors.push({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        dateOfBirth: faker.date.past(70, new Date(refDate)),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Actors', actors);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Actors', null, {});
  }
};
