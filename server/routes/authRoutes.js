const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  registerUser,
  loginUser,
  addFavorite,
  removeFavorite,
  getFavorites
} = require("../controllers/authController");

// Registering routes
router.post("/register", registerUser);

// Favorites routes
router.post(
  "/favorites/:recipeId",
  protect,
  addFavorite
);

router.delete(
  "/favorites/:recipeId",
  protect,
  removeFavorite
);

router.get(
  "/favorites",
  protect,
  getFavorites
);

router.post("/login",loginUser);

module.exports = router;