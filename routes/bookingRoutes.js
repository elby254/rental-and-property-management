const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// CREATE BOOKING
router.post("/", async (req, res) => {
  try {
    const { userId, propertyId } = req.body;

    // VALIDATION 
    if (!userId || !propertyId) {
      return res.status(400).json({
        success: false,
        message: "Missing booking details",
      });
    }

    // CHECK EXISTING BOOKING
    const existing = await Booking.findOne({ userId, propertyId });

    if (existing) {
      return res.status(400).json({
        success: false,
        message: "You already booked this property",
      });
    }

    const booking = await Booking.create({
      userId,
      propertyId,
    });

    res.json({
      success: true,
      message: "Booking created",
      data: booking,
    });

  } catch (error) {
    console.error("Booking error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;