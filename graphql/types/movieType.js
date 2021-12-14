const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

const actorType = require("./actorType");

const movieType = new GraphQLObjectType({
  name: "Movie",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    rating: { type: GraphQLFloat },
    actors: {
      type: new GraphQLList(actorType),
      resolve: async (source) => {
        return await source.getActors();
      },
    },
  },
});

module.exports = movieType;
