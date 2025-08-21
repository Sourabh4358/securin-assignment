// src/app.js
const express = require("express");
const recipeRoutes = require("./routes/recipeRoutes");

const app = express();

app.use(express.json());
app.use("/api/recipes", recipeRoutes);

app.get("/", (req, res) => res.send("🍲 Recipe API Running..."));

module.exports = app;
