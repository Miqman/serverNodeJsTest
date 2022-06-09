const express = require("express");
const router = express.Router();
const users = require("./user");
const foods = require("./food");

router.use("/users", users);
router.use("/foods", foods);

module.exports = router;
