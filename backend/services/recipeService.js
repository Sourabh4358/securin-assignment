const Recipe = require("../models/Recipe");

// Get paginated & sorted recipes
const getRecipes = async (page, limit) => {
  const skip = (page - 1) * limit;
  const total = await Recipe.countDocuments();
  const data = await Recipe.find()
    .sort({ rating: -1 }) // sort by rating DESC
    .skip(skip)
    .limit(limit);

  return { total, data };
};

// Search recipes by filters
const searchRecipes = async (filters) => {
  const query = {};

  if (filters.title) {
    query.title = { $regex: filters.title, $options: "i" };
  }

  if (filters.cuisine) {
    query.cuisine = { $regex: filters.cuisine, $options: "i" };
  }

  if (filters.rating) {
    const operator = filters.rating[0]; // >, <, =
    const value = Number(filters.rating.slice(1));
    if (operator === ">") query.rating = { $gte: value };
    if (operator === "<") query.rating = { $lte: value };
    if (operator === "=") query.rating = value;
  }

  if (filters.total_time) {
    const operator = filters.total_time[0];
    const value = Number(filters.total_time.slice(1));
    if (operator === ">") query.total_time = { $gte: value };
    if (operator === "<") query.total_time = { $lte: value };
    if (operator === "=") query.total_time = value;
  }

  if (filters.calories) {
    const operator = filters.calories[0];
    const value = Number(filters.calories.slice(1));
    query["nutrients.calories"] = {};
    if (operator === ">") query["nutrients.calories"].$gte = `${value} kcal`;
    if (operator === "<") query["nutrients.calories"].$lte = `${value} kcal`;
    if (operator === "=") query["nutrients.calories"] = `${value} kcal`;
  }

  return await Recipe.find(query).sort({ rating: -1 });
};

module.exports = { getRecipes, searchRecipes };
