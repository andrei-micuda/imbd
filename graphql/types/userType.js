const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList
} = require('graphql');

const listType = require("../types/listType");

const userType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLID,
    },
    email: {
      type: GraphQLString,
    },
    firstName: {
      type: GraphQLString
    },
    lastName: {
      type: GraphQLString
    },
    lists: {
      type: new GraphQLList(listType),
      resolve: async (source) => {
        return source.getLists();
      }
    }
  }
});

module.exports = userType;