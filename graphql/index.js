const { GraphQLSchema } = require("graphql");

const queryType = require("./queryType");

const schema = new GraphQLSchema({
  query: queryType,
});

module.exports = schema;
