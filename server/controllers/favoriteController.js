const User = require("../models/User");

const addToFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user);

    if (
      !user.favorites.includes(
        req.params.propertyId
      )
    ) {
      user.favorites.push(
        req.params.propertyId
      );

      await user.save();
    }

    res.json({
      message: "Added to Favorites",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(
      req.user
    ).populate("favorites");

    res.json(user.favorites);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToFavorites,
  getFavorites,
};