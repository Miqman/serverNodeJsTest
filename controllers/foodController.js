const { Food, Category } = require("../models/index");
const Redis = require("ioredis");

const redis = new Redis({
  port: 16033, // Redis port
  host: "redis-16033.c292.ap-southeast-1-1.ec2.cloud.redislabs.com", // Redis host
  password: "qveMlqG2GiuCKmn7Yb3x21kzYTL3cSu6",
});

class FoodController {
  static async getFood(req, res, next) {
    try {
      const foodCache = await redis.get("foodCache");

      if (!foodCache) {
        const foods = await Food.findAll({
          include: Category,
        });

        await redis.set("foodCache", JSON.stringify(foods));

        res.status(200).json({
          Code: 200,
          data: foods,
        });
      } else {
        res.status(200).json(JSON.parse(foodCache));
      }
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
  static async getOneFood(req, res, next) {
    try {
      const { id } = req.params;
      const food = await Food.findOne({
        where: { id },
      });

      if (food <= 0) {
        throw { name: "Data not found" };
      }

      res.status(200).json({
        Code: 200,
        data: food,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static async addFood(req, res, next) {
    try {
      const { name, description, imageUrl, price, CategoryId } = req.body;

      const newFood = await Food.create({
        name,
        description,
        imageUrl,
        price,
        CategoryId,
        UserId: req.user.id,
      });

      res.status(201).json({
        Code: 201,
        message: "Food created successfully",
        data: newFood,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async putFood(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, imageUrl, price, CategoryId } = req.body;

      const editFood = await Food.update(
        {
          name,
          description,
          imageUrl,
          price,
          CategoryId,
          UserId: req.user.id,
        },
        { where: { id } }
      );

      const food = await Food.findOne({
        where: { id: id },
      });

      if (food <= 0) {
        throw { name: "Data not found" };
      }

      res.status(200).json({
        Code: 200,
        message: "Edit Food successfully",
        data: food,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async patchFood(req, res, next) {
    try {
      const { id } = req.params;
      const { name, description, imageUrl, price, CategoryId } = req.body;

      const editFood = await Food.update(
        { name, description, imageUrl, price, CategoryId },
        { where: { id } }
      );

      const getFood = await Food.findByPk(id);

      if (getFood <= 0) {
        throw {
          name: "Data not found",
          message: `Food with Id ${id} not Found`,
        };
      }

      // console.log(newHistory);
      res.status(200).json({
        statusCode: 200,
        data: getFood,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async deleteFood(req, res, next) {
    try {
      const { id } = req.params;

      const removeFood = await Food.destroy({
        where: {
          id: id,
        },
      });
      if (removeFood <= 0) {
        throw { name: "Data not found" };
      }
      res.status(200).json({
        statusCode: 200,
        message: `Food with id ${id} success to delete`,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
}

module.exports = FoodController;
