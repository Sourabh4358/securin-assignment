const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    Contient: { type: String },
    Country_State: { type: String },
    cuisine: { type: String, required: true },
    title: { type: String, required: true },
    URL: { type: String },
    rating: { type: Number, default: null },
    prep_time: { type: Number, default: null },
    cook_time: { type: Number, default: null },
    total_time: { type: Number, default: null },
    description: { type: String },
    ingredients: { type: [String], default: [] },
    instructions: { type: [String], default: [] },
    nutrients: {
      calories: { type: String, default: "" },
      carbohydrateContent: { type: String, default: "" },
      cholesterolContent: { type: String, default: "" },
      fiberContent: { type: String, default: "" },
      proteinContent: { type: String, default: "" },
      saturatedFatContent: { type: String, default: "" },
      sodiumContent: { type: String, default: "" },
      sugarContent: { type: String, default: "" },
      fatContent: { type: String, default: "" },
      unsaturatedFatContent: { type: String, default: "" }
    },
    serves: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Recipe", recipeSchema);
