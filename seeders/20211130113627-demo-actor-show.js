"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const actorsShows = [];

    for (let i = 0; i < 100; i++) {
      const distribution = [];
      const numActors = Math.floor(Math.random() * 15) + 1; // at most 10 actors per movie, at least one
      while (distribution.length < numActors) {
        const actorId = Math.floor(Math.random() * 100) + 1;

        // we don't want to add the same actor twice
        if (distribution.indexOf(actorId) === -1)
          distribution.push({
            actorId,
            showId: i + 1,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
      }
      actorsShows.push(...distribution);
    }

    await queryInterface.bulkInsert("ActorsShows", actorsShows);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ActorsShows");
  },
};
