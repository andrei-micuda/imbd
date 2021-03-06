'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ListItem.belongsTo(models.List);
    }
  };
  ListItem.init({
    listId: DataTypes.INTEGER,
    itemId: DataTypes.INTEGER,
    itemType: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ListItem',
  });
  return ListItem;
};