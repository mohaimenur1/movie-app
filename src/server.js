// import express from "express";
// import { config } from "dotenv";
// import { connectDB } from "./config/db";

const express = require("express");
const { config } = require("dotenv");
const { connectDB } = require("./config/db");
const authRoutes = require("./routes/authRoutes");

config();
connectDB();

const app = express();

app.use(express.json());
// API Routes

app.use("/auth", authRoutes);

app.listen(5001, () => {
  console.log(`Server is running on port 5001`);
});
