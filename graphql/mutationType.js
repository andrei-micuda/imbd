const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLBoolean,
} = require("graphql");

const db = require("../models");
const movieType = require("./types/movieType");
const createMovieInputType = require("./inputTypes/createMovieInputType");
const listType = require("./types/listType");
const createListInputType = require("./inputTypes/createListInputType");
const addItemToListInputType = require("./inputTypes/addItemToListInputType");
const createTvShowInputType = require("./inputTypes/createTvShowInputType");

const loginHandler = require("../repository/login");
const loginInputType = require("./inputTypes/loginInputType");

const loginResultType = require("./types/loginResultType");
const userType = require("./types/userType");
const { createUser, updateUser } = require("../repository/users");
const pubsub = require("../pubsub");
const tvShowType = require("./types/tvShowType");

const mutationType = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    login: {
      type: loginResultType,
      args: {
        loginInput: {
          type: loginInputType,
        },
      },
      resolve: (source, args) => {
        const { email, password } = args.loginInput;

        const token = loginHandler(email, password);

        return {
          token,
        };
      },
    },
    createMovie: {
      type: movieType,
      args: {
        createMovieInput: { type: createMovieInputType },
      },
      resolve: async (source, args, context) => {
        if (context.user) {
          const { title, genre, actorsIdList } = args.createMovieInput;
          try {
            const newMovie = await db.Movie.create({ title, genre });
            for (let i = 0; actorsIdList && i < actorsIdList.length; i++) {
              const actor = await db.Actor.findByPk(actorsIdList[i]);
              newMovie.addActor(actor);
            }
            pubsub.publish("movies", {
              subMovies: {
                newMovie: newMovie.toJSON(),
              }
            });
            return newMovie;
          } catch (err) {
            console.error(err);
            return null;
          } finally {
          }
        } else {
          return null;
        }
      },
    },
    createTvShow: {
      type: tvShowType,
      args: {
        createTvShowInput: { type: createTvShowInputType },
      },
      resolve: async (source, args, context) => {
        if (context.user) {
          const { title, genre, seasons, actorsIdList } = args.createTvShowInput;
          try {
            const newShow = await db.TvShow.create({ title, genre, seasons });
            for (let i = 0; actorsIdList && i < actorsIdList.length; i++) {
              const actor = await db.Actor.findByPk(actorsIdList[i]);
              newShow.addActor(actor);
            }
            pubsub.publish("shows", {
              subShows: {
                newShow: newShow.toJSON(),
              }
            });
            return newShow;
          } catch (err) {
            console.error(err);
            return null;
          } finally {
          }
        } else {
          return null;
        }
      },
    },
    createList: {
      type: listType,
      args: {
        createListInput: { type: createListInputType },
      },
      resolve: async (source, args, context) => {
        if (context.user) {
          const { name } = args.createListInput;
          const list = await db.List.create({ userId: context.user.dataValues.id, name });
          return list;
        } else {
          return null;
        }
      },
    },
    deleteList: {
      type: listType,
      args: {
        movieId: { type: GraphQLInt },
      },
      resolve: async (source, args, context) => {
        if (context.user) {
          const { movieId } = args;
          console.log(movieId);
          const list = await db.List.findByPk(movieId);
          await list.destroy();
          return list;
        } else {
          return null;
        }
      },
    },
    addItemToList: {
      type: GraphQLBoolean,
      args: {
        addItemToListInput: { type: addItemToListInputType },
      },
      resolve: async (source, args, context) => {
        if (context.user) {
          const { listId, itemId, itemType } = args.addItemToListInput;

          await db.ListItem.create(args.addItemToListInput);
          return true;
        } else {
          return null;
        }
      },
    },
  }
});

module.exports = mutationType;
