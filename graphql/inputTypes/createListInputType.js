const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} = require("graphql");

const createListInputType = new GraphQLInputObjectType({
  name: "CreateListInput",
  fields: {
    name: { type: new GraphQLNonNull(GraphQLString) },
  },
});

module.exports = createListInputType;
