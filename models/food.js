"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Food.belongsTo(models.User);
      Food.belongsTo(models.Category);
    }
  }
  Food.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
      imageUrl: DataTypes.STRING,
      price: DataTypes.STRING,
      UserId: DataTypes.INTEGER,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Food",
    }
  );
  return Food;
};
