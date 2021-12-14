const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
} = require("graphql");

const createMovieInputType = new GraphQLInputObjectType({
  name: "CreateMovieInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    actorsIdList: { type: new GraphQLList(GraphQLString) },
  },
});

module.exports = createMovieInputType;
