const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLNonNull,
} = require("graphql");

const db = require("../models");

const actorType = require("./types/actorType");
const movieType = require("./types/movieType");

const queryType = new GraphQLObjectType({
  name: "Query",
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => {
        return "Hello World";
      },
    },
    actors: {
      type: new GraphQLList(actorType),
      resolve: async () => {
        return await db.Actor.findAll();
      },
    },
    actor: {
      type: actorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        const actor = await db.Actor.findByPk(id);
        return actor;
      },
    },
    movies: {
      type: new GraphQLList(movieType),
      resolve: async () => {
        return await db.Movie.findAll();
      },
    },
    movie: {
      type: movieType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }, context) => {
        const movie = await db.Movie.findByPk(id);
        return movie;
      },
    },
    actorsFromMovie: {
      type: new GraphQLList(actorType),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve: async (_, { id }) => {
        const actors = await db.Actor.findAll({
          include: {
            model: db.Movie,
            where: {
              id: id,
            },
          },
        });
        return actors;
      },
    },
  },
});

module.exports = queryType;
