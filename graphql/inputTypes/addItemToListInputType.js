const {
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
} = require("graphql");

const itemEnumType = require("../types/itemEnumType");

const addItemToListInputType = new GraphQLInputObjectType({
  name: "AddItemToListInput",
  fields: {
    listId: { type: new GraphQLNonNull(GraphQLInt) },
    itemId: { type: new GraphQLNonNull(GraphQLInt) },
    itemType: { type: new GraphQLNonNull(itemEnumType) }
  },
});

module.exports = addItemToListInputType;

