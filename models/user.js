"use strict";
const { Model } = require("sequelize");
const { createHashPass } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Food);
    }
  }
  User.init(
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          isEmail: { msg: "Must be format email" },
          notEmpty: { msg: "Require Email" },
          notNull: { msg: "Require Email" },
        },
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "Require Password" },
          notNull: { msg: "Password cant empty" },
          isPassword(value) {
            let pass = value.length;
            if (pass < 5) {
              throw new Error("Minimal input password 5");
            }
          },
        },
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          notEmpty: { msg: "name cant be empty" },
          notNull: { msg: "name cant empty" },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  //hook
  User.beforeCreate((instance, options) => {
    instance.password = createHashPass(instance.password);
  });
  return User;
};
