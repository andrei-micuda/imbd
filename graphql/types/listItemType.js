const { GraphQLUnionType } = require("graphql");
const movieType = require('../types/movieType');
const tvShowType = require('../types/tvShowType');
const db = require('../../models');

const listItemType = new GraphQLUnionType({
  name: 'ListItem',
  types: [movieType, tvShowType],
  resolveType: (value) => {
    console.log(value)
    if (value instanceof db.Movie) {
      return movieType.name;
    }

    if (value instanceof db.TvShow) {
      return tvShowType.name;
    }
  }
});

module.exports = listItemType; 