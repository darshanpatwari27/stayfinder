const express = require("express");
const router = express.Router();

const {
  createProperty,
  getProperties,
  getMyProperties,
  deleteProperty,
  getPropertyById,
  updateProperty,
} = require("../controllers/propertyController");

const protect = require("../middleware/authMiddleware");

// IMPORTANT: my-properties ko :id se pehle rakhna hai
router.get(
  "/my-properties",
  protect,
  getMyProperties
);

router.get("/", getProperties);
router.get("/:id", getPropertyById);

router.post("/", protect, createProperty);

router.put(
  "/:id",
  protect,
  updateProperty
);

router.delete(
  "/:id",
  protect,
  deleteProperty
);

module.exports = router;