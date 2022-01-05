"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    static associate(models) {
      Movie.belongsToMany(models.Actor, {
        through: "ActorsMovies",
      });
      Movie.belongsToMany(models.List, {
        through: "ListsMovies"
      });
      Movie.hasMany(models.Review);
    }
  }
  Movie.init(
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      rating: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Movie",
    }
  );
  return Movie;
};
