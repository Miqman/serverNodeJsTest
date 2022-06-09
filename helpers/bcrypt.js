const bcrypt = require("bcrypt");

function createHashPass(pass) {
  return bcrypt.hashSync(pass, 8);
}

function comparePassWithHash(inputPass, dbPass) {
  return bcrypt.compareSync(inputPass, dbPass);
}

module.exports = { createHashPass, comparePassWithHash };
