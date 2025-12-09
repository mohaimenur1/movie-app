// import express from "express";
// import { config } from "dotenv";
// import { connectDB } from "./config/db";

const express = require("express");
const { config } = require("dotenv");
const { connectDB } = require("./config/db");

config();
connectDB();

const app = express();

app.listen(5001, () => {
  console.log(`Server is running on port 5001`);
});
