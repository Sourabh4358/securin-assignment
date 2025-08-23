const express = require("express");
const router = express.Router();
const {
  getAllRecipes,
  getRecipeById,
  searchRecipes,
  createRecipe,
  updateRecipe,
  deleteRecipe,
} = require("../controllers/recipeController");

// GET all recipes
router.get("/", getAllRecipes);

// ✅ Put static routes BEFORE dynamic :id route
router.get("/search", searchRecipes);

// GET a recipe by ID
router.get("/:id", getRecipeById);

// Create a new recipe
router.post("/", createRecipe);

// Update a recipe
router.put("/:id", updateRecipe);

// Delete a recipe
router.delete("/:id", deleteRecipe);

module.exports = router;
