const express = require("express");
const router = express.Router();

const protect = require(
  "../middleware/authMiddleware"
);

const {
  addToFavorites,
  getFavorites,
} = require(
  "../controllers/favoriteController"
);

router.post(
  "/:propertyId",
  protect,
  addToFavorites
);

router.get(
  "/my-favorites",
  protect,
  getFavorites
);

module.exports = router;