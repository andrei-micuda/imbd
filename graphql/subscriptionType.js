const { GraphQLObjectType } = require("graphql");
const movieType = require("./types/movieType");
const tvShowType = require("./types/tvShowType");
const pubsub = require("../pubsub");
const db = require("../models");
const subscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        subMovies: {
            type: movieType,
            subscribe: () => { 
                return pubsub.asyncIterator("movies")
            },
            resolve: async (source) => {
                console.log("source.subMovies", source.subMovies.newMovie);
                const movie = await db.Movie.findByPk(source.subMovies.newMovie.id);
                return movie;
            }
        },
        subShows: {
            type: tvShowType,
            subscribe: () => {
                return pubsub.asyncIterator("shows")
            },
            resolve: async (source) => {
                console.log("source.subShows", source.subShows.newShow);
                const show = await db.TvShow.findByPk(source.subShows.newShow.id);
                return show;
            }
        }
    }

});
module.exports = subscriptionType;