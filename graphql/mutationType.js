const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const db = require("../models");
const movieType = require("./types/movieType");
const createMovieInputType = require("./inputTypes/createMovieInputType");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createMovie: {
      type: movieType,
      args: {
        createMovieInput: { type: createMovieInputType },
      },
      resolve: async (source, args) => {
        const { title, genre, actorsIdList } = args.createMovieInput;
        try {
          const newMovie = await db.Movie.create({ title, genre });
          for (let i = 0; actorsIdList && i < actorsIdList.length; i++) {
            const actor = await db.Actor.findByPk(actorsIdList[i]);
            newMovie.addActor(actor);
          }
          return newMovie;
        } catch (err) {
          console.error(err);
          return null;
        } finally {
        }
      },
    },
  },
});

module.exports = mutationType;
