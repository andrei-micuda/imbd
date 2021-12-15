'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Review.belongsTo(models.User, {
        foreignKey: 'userId',
      });

      models.Review.belongsTo(models.Movie, {
        foreignKey: 'movieId',
      });
    }
  };
  Review.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.NUMBER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};