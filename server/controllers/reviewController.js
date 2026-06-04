const Review = require("../models/Review");

const createReview = async (req, res) => {
  try {
    const { property, rating, comment } =
      req.body;

    const review = await Review.create({
      property,
      user: req.user,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      property: req.params.propertyId,
    }).populate("user", "name");

    res.json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReview,
  getReviews,
};