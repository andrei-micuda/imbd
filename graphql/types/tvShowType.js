const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt,
  GraphQLList,
} = require("graphql");

const actorType = require("./actorType");

const tvShowType = new GraphQLObjectType({
  name: "TvShow",
  fields: {
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    genre: { type: GraphQLString },
    seasons: { type: GraphQLInt },
    rating: { type: GraphQLFloat },
    actors: {
      type: new GraphQLList(actorType),
      resolve: async (source) => {
        return await source.getActors();
      },
    },
  },
});

module.exports = tvShowType;
