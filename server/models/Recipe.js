const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({

  user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
  },
  
  title: {
    type: String,
    required: true
  },

  ingredients: {
    type: [String],
    required: true
  },

  steps: {
    type: [String],
    required: true
  },

  cookingTime: {
    type: Number,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  foodType: {
  type: String,
  enum: ["Veg", "Non-Veg"],
  required: true
  },

  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    default: "Easy"
  },

  image: {
    type: String
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }

}, { timestamps: true });

module.exports = mongoose.model("Recipe", recipeSchema);