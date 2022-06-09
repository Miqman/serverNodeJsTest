const jwt = require("jsonwebtoken");

const sKey = process.env.SECRET_KEY;

function createtoken(payload) {
  return jwt.sign(payload, sKey, {
    expiresIn: "4h",
  });
}

function readToken(token) {
  return jwt.verify(token, sKey);
}

module.exports = { createtoken, readToken };
