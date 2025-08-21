// src/seed/seedRecipes.js
const mongoose = require("mongoose");
const Recipe = require("../models/Recipe");
const parseRecipes = require("../utils/parseRecipes");
require("dotenv").config();

const filePath = "US_recipes.json"; // path to JSON file

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const recipes = parseRecipes(filePath);

    // Clean old data
    await Recipe.deleteMany({});
    // Insert new data
    await Recipe.insertMany(recipes);

    console.log("Recipes seeded successfully into MongoDB Atlas");
    process.exit();
  } catch (error) {
    console.error("Error seeding recipes:", error.message);
    process.exit(1);
  }
})();
