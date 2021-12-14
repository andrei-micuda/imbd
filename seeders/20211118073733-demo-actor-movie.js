"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // iterate through the movies and associate a random number of actors to it
    const actorsMovies = [];

    // iterate through the movies and associate a random number of actors to it
    for (let i = 0; i < 100; i++) {
      const actorsInMovie = [];
      const numActorsInMovie = Math.floor(Math.random() * 10) + 1; // at most 10 actors per movie, at least one
      while (actorsInMovie.length < numActorsInMovie) {
        const actorId = Math.floor(Math.random() * 100) + 1;

        // we don't want to add the same actor twice
        if (actorsInMovie.indexOf(actorId) === -1)
          actorsInMovie.push({
            actorId,
            movieId: i + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
      }
      actorsMovies.push(...actorsInMovie);
    }

    await queryInterface.bulkInsert("ActorsMovies", actorsMovies);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ActorsMovies");
  },
};
