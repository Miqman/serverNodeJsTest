const jwt = require("jsonwebtoken");

const sKey = "test2";

function createtoken(payload) {
  return jwt.sign(payload, sKey, {
    expiresIn: "4h",
  });
}

function readToken(token) {
  return jwt.verify(token, sKey);
}

module.exports = { createtoken, readToken };
