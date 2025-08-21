const recipeService = require("../services/recipeService");
const Recipe = require("../models/Recipe");

// GET /api/recipes?page=1&limit=10
const getAllRecipes = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const recipes = await Recipe.find()
      .sort({ rating: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Recipe.countDocuments();

    res.status(200).json({ page, limit, total, data: recipes });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// GET /api/recipes/search
const searchRecipes = async (req, res) => {
  try {
    const filters = req.query;
    const query = {};

    if (filters.title) {
      query.title = { $regex: filters.title, $options: "i" };
    }

    if (filters.cuisine) {
      query.cuisine = filters.cuisine;
    }

    if (filters.rating) {
      const operator = filters.rating.substring(0, 2).match(/[><=]+/)[0];
      const value = parseFloat(filters.rating.replace(/[><=]/g, ""));
      if (operator.includes(">")) query.rating = { $gte: value };
      if (operator.includes("<")) query.rating = { $lte: value };
      if (operator.includes("=")) query.rating = value;
    }

    if (filters.total_time) {
      const operator = filters.total_time.substring(0, 2).match(/[><=]+/)[0];
      const value = parseInt(filters.total_time.replace(/[><=]/g, ""));
      if (operator.includes(">")) query.total_time = { $gte: value };
      if (operator.includes("<")) query.total_time = { $lte: value };
      if (operator.includes("=")) query.total_time = value;
    }

    if (filters.calories) {
      const operator = filters.calories.substring(0, 2).match(/[><=]+/)[0];
      const value = parseInt(filters.calories.replace(/[><=]/g, ""));
      query["nutrients.calories"] = {};
      if (operator.includes(">")) query["nutrients.calories"].$gte = `${value} kcal`;
      if (operator.includes("<")) query["nutrients.calories"].$lte = `${value} kcal`;
      if (operator.includes("=")) query["nutrients.calories"] = `${value} kcal`;
    }

    const results = await Recipe.find(query).sort({ rating: -1 });

    res.status(200).json({ data: results });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { getAllRecipes, searchRecipes };
