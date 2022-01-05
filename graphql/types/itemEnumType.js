const {
  GraphQLEnumType
} = require("graphql");

const itemEnumType = new GraphQLEnumType({
  name: "Item",
  values: {
    Movie: { value: "Movie" },
    TvShow: { value: "TvShow" }
  }
})

module.exports = itemEnumType;