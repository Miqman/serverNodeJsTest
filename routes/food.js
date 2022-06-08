const express = require("express");
const router = express.Router();
const FoodController = require("../controllers/foodController");
const authentication = require("../middlewares/authen");

router.get("/", FoodController.getFood);

router.use(authentication);

router.post("/", FoodController.addFood);

router.get("/:id", FoodController.getOneFood);

router.put("/:id", FoodController.putFood);

router.patch("/:id", FoodController.patchFood);

router.delete("/:id", FoodController.deleteFood);

module.exports = router;
