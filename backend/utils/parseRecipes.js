const fs = require("fs");

function parseRecipes(filePath) {
  try {
    let raw = fs.readFileSync(filePath, "utf-8");

    // Replace all standalone NaNs (not inside strings) with null
    raw = raw.replace(/\bNaN\b/g, "null");

    const data = JSON.parse(raw);
    const recipes = Array.isArray(data) ? data : Object.values(data);

    if (!Array.isArray(recipes)) {
      throw new Error("Invalid JSON structure: expected an array of recipes");
    }

    return recipes
      .filter(recipe => recipe && typeof recipe === "object" && recipe.title?.trim())
      .map((recipe, index) => ({
        id: index + 1,
        continent: recipe.Contient || null,
        country_state: recipe.Country_State || null,
        cuisine: recipe.cuisine || null,
        title: recipe.title.trim(),
        url: recipe.URL || null,
        rating: isNaN(recipe.rating) ? null : recipe.rating,
        prep_time: isNaN(recipe.prep_time) ? null : recipe.prep_time,
        cook_time: isNaN(recipe.cook_time) ? null : recipe.cook_time,
        total_time: isNaN(recipe.total_time) ? null : recipe.total_time,
        description: recipe.description || "",
        ingredients: Array.isArray(recipe.ingredients) ? recipe.ingredients : [],
        instructions: Array.isArray(recipe.instructions) ? recipe.instructions : [],
        nutrients: typeof recipe.nutrients === "object" && recipe.nutrients !== null ? recipe.nutrients : {},
        serves: recipe.serves || "",
      }));
  } catch (err) {
    console.error(" Failed to parse recipes:", err.message);
    throw err;
  }
}

module.exports = parseRecipes;
