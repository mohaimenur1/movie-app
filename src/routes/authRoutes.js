const express = require("express");
const { register, login } = require("../controllers/authController");

const rotuer = express.Router();

rotuer.post("/register", register);
rotuer.post("/login", login);

module.exports = rotuer;
