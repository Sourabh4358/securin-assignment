const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
const connectDB = require("./config/db");
const Recipe = require("./models/Recipe");
const parseRecipes = require("./utils/parseRecipes");
const recipeRoutes = require("./routes/recipeRoutes");
const path = require("path");
require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(morgan("dev")); // Logging
app.use(
  cors({
    origin: "http://localhost:5173", // React dev server
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Routes
app.use("/api/recipes", recipeRoutes);

// Health check
app.get("/", (req, res) => {
  res.status(200).send("Recipe API is running...");
});

// Serve frontend (production)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
  });
}

// Global Error Handler (production-safe)
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
  });
});

(async () => {
  try {
    // Connect to MongoDB
    await connectDB();

    // Auto-seed if collection is empty
    const count = await Recipe.countDocuments();
    if (count === 0) {
      const filePath = path.join(__dirname, "US_recipes.json");
      const recipes = parseRecipes(filePath);
      await Recipe.insertMany(recipes);
      console.log(`Seeded ${recipes.length} recipes`);
    } else {
      console.log(`Recipes already exist: ${count} documents`);
    }

    // Start server
    app.listen(PORT, () =>
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
    );
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1); // Exit process in case of fatal error
  }
})();
