const Property = require("../models/Property");

const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, image } = req.body;

    const property = await Property.create({
      title,
      description,
      location,
      price,
      image,
      owner: req.user,
    });

    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "owner",
      "name email"
    );

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({
      owner: req.user,
    }).populate("owner", "name email");

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    await property.deleteOne();

    res.json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    ).populate("owner", "name email");

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(
      req.params.id
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.owner.toString() !== req.user) {
      return res.status(401).json({
        message: "Not Authorized",
      });
    }

    property.title =
      req.body.title || property.title;

    property.description =
      req.body.description ||
      property.description;

    property.location =
      req.body.location ||
      property.location;

    property.price =
      req.body.price || property.price;

    property.image =
      req.body.image || property.image;

    const updatedProperty =
      await property.save();

    res.json(updatedProperty);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProperty,
  getProperties,
  getMyProperties,
  deleteProperty,
  getPropertyById,
  updateProperty,
};