const express = require("express");
const { register, login, logout } = require("../controllers/authController");

const rotuer = express.Router();

rotuer.post("/register", register);
rotuer.post("/login", login);
rotuer.post("/logout", logout);

module.exports = rotuer;
