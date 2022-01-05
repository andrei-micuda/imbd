const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLList,
} = require("graphql");

const listItemType = require("../types/listItemType");
const db = require("../../models");

const listType = new GraphQLObjectType({
  name: "List",
  fields: {
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    items: {
      type: new GraphQLList(listItemType),
      resolve: async (source) => {
        // console.log(source)
        const listItems = await db.ListItem.findAll({
          where: {
            listId: source.id
          }
        });

        let res = [];

        for (const listItem of listItems) {
          const itemId = listItem.itemId;

          if (listItem.itemType === "Movie") {
            const movie = await db.Movie.findByPk(itemId);
            res.push(movie);
            console.log(res);
          } else if (listItem.itemType === "TvShow") {
            const tvShow = await db.TvShow.findByPk(itemId);
            res.push(tvShow);
          }
        }

        console.log(res);

        return res;
        // console.log(listItems)
        // return [{
        //   title: "Homalon"
        // },
        // { title: "naruto", seasons: 20 }]
        // return source.getLists();
      }
    }
  },
});

module.exports = listType;
