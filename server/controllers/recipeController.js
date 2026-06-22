const Recipe = require("../models/Recipe");


// CREATE Recipe
const createRecipe = async (req, res) => {

  try {

    const {
      title,
      ingredients,
      steps,
      cookingTime,
      category,
      foodType,
      difficulty,
      image
    } = req.body;

    const recipe = await Recipe.create({

      title,
      ingredients,
      steps,
      cookingTime,
      category,
      foodType,
      difficulty,
      image,

      user: req.user._id

    });

    res.status(201).json(recipe);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET All Recipes
const getRecipes = async (req, res) => {

  try {

    const recipes = await Recipe.find();

    res.json(recipes);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// GET Single Recipe
const getRecipeById = async (req, res) => {

  try {

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {

      return res.status(404).json({
        message: "Recipe not found"
      });

    }

    res.json(recipe);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// UPDATE Recipe
const updateRecipe = async (req, res) => {

  try {

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {

      return res.status(404).json({
        message: "Recipe not found"
      });

    }

    // Ownership Check
    if (
      !recipe.user ||
      recipe.user.toString() !== req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    const updatedRecipe = await Recipe.findByIdAndUpdate(

      req.params.id,

      req.body,

      {
        new: true
      }

    );

    res.json(updatedRecipe);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


// DELETE Recipe
const deleteRecipe = async (req, res) => {

  try {

    const recipe = await Recipe.findById(req.params.id);

    if (!recipe) {

      return res.status(404).json({
        message: "Recipe not found"
      });

    }

    // Ownership Check
    if (
      !recipe.user ||
      recipe.user.toString() !== req.user._id.toString()
    ) {

      return res.status(401).json({
        message: "Not authorized"
      });

    }

    await recipe.deleteOne();

    res.json({
      message: "Recipe deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};


module.exports = {
  createRecipe,
  getRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe
};