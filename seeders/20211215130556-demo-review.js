'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const allUsers = await db.User.findAll();
      const allMovies = await db.Movie.findAll();
      const reviews = [];
      for (let i = 0; i < 10; i++) {
        const userId = Math.floor(Math.random() * (allUsers.length - 1));
        const movieId = Math.floor(Math.random() * (allMovies.length - 1));
        reviews.push({
          userId,
          movieId,
          title: faker.lorem.sentence(),
          description: faker.lorem.paragraphs(),
          rating: Math.floor(Math.random() * 11),
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      }

      await queryInterface.bulkInsert('Reviews', reviews, {});
    }
    catch (err) {
      console.error(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
