const {
    GraphQLInputObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
  } = require("graphql");
  
  const createTvShowInputType = new GraphQLInputObjectType({
    name: "CreateTvShowInput",
    fields: {
      title: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: new GraphQLNonNull(GraphQLString) },
      seasons: { type: new GraphQLNonNull(GraphQLInt) },
      actorsIdList: { type: new GraphQLList(GraphQLString) },
    },
  });
  
  module.exports = createTvShowInputType;
  