const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { property, checkIn, checkOut } =
      req.body;

    const existingBooking =
      await Booking.findOne({
        property,
        checkIn: {
          $lte: new Date(checkOut),
        },
        checkOut: {
          $gte: new Date(checkIn),
        },
      });

    if (existingBooking) {
      return res.status(400).json({
        message:
          "Property already booked for these dates",
      });
    }

    const booking =
      await Booking.create({
        property,
        user: req.user,
        checkIn,
        checkOut,
      });

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user,
    }).populate("property");

    res.json(bookings);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(
      req.params.id
    );

    if (!booking) {
      return res.status(404).json({
        message: "Booking not found",
      });
    }

    await booking.deleteOne();

    res.json({
      message: "Booking Cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  cancelBooking,
};