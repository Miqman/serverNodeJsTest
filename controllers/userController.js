const { User } = require("../models/index");
const { comparePassWithHash } = require("../helpers/bcrypt");
const { createtoken } = require("../helpers/jwt");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, name } = req.body;

      const newUser = await User.create({
        email,
        password,
        name,
      });

      res.status(201).json({
        Code: 201,
        email: newUser.email,
        name: newUser.name,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      const getUser = await User.findOne({ where: { email } });

      if (!email) {
        throw { name: "Email is required" };
      }
      if (!password) {
        throw { name: "Password is required" };
      }

      if (!getUser) {
        throw { name: "401" };
      }
      const getValidUser = comparePassWithHash(password, getUser.password);

      if (!getValidUser) {
        throw { name: "401" };
      }

      const payload = { id: getUser.id };
      const token = createtoken(payload);

      res.status(200).json({
        Code: 200,
        access_token: token,
        name: getUser.name,
        email: getUser.email,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
