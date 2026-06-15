const express = require("express");

const {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
} = require("../controllers/recipeController");

const protect = require("../middleware/authMiddleware");


const router = express.Router();


// GET all recipes
router.get("/", getRecipes);


// GET single recipe
router.get("/:id", getRecipeById);


// CREATE recipe
router.post("/", protect, createRecipe);


// UPDATE recipe
router.put("/:id", protect, updateRecipe);


// DELETE recipe
router.delete("/:id", protect, deleteRecipe);


module.exports = router;