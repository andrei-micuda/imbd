'use strict';
const faker = require('faker');
const db = require('../models');

function capitalize(s) {
  return s[0].toUpperCase() + s.slice(1);
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const movies = [];
    for (let i = 0; i < 100; i++) {
      movies.push({
        title: capitalize(faker.lorem.words(Math.floor(Math.random() * 5) + 1)),
        genre: faker.lorem.word(),
        rating: (Math.random() * 9 + 1).toFixed(1),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }

    await queryInterface.bulkInsert('Movies', movies);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Movies', null, {});
  }
};
