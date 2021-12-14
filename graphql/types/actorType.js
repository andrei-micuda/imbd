const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLDate,
} = require("graphql");

const actorType = new GraphQLObjectType({
  name: "Actor",
  fields: {
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
    dateOfBirth: { type: GraphQLString },
  },
});

module.exports = actorType;
