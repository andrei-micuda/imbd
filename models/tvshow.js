'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TvShow extends Model {
    static associate(models) {
      TvShow.belongsToMany(models.Actor, {
        through: "ActorsShows"
      });
    }
  };
  TvShow.init({
    title: DataTypes.STRING,
    genre: DataTypes.STRING,
    seasons: DataTypes.INTEGER,
    rating: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'TvShow',
  });
  return TvShow;
};