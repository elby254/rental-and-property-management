const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

// GET ACTIVE LEASES FOR USER
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID required",
      });
    }

    const leases = await Booking.find({
     userId,
     status: "active",
    })
     .populate({
      path: "propertyId",
      select: "Title price location landlordID isAvailable",
      populate: {
        path: "landlordID",
        select: "name phoneNumber",
      },
    });

    return res.json({
      success: true,
      leases,
    });
  } catch (err) {
    console.error("Error fetching leases:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// GET LANDLORD DASHBOARD DATA
const authMiddleware = require("../middleware/authMiddleware");
router.get("/landlord-dashboard", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "landlord") {
      return res.status(403).json({
        success: false,
        message: "Only landlords allowed",
      });
    }

    // find all bookings with property + tenant
    const leases = await Booking.find()
      .populate({
        path: "propertyId",
        match: { landlordID: req.user._id }, // only landlord's properties
      })
      .populate("userId", "name phoneNumber");

    // remove unrelated ones
    const filtered = leases.filter(l => l.propertyId !== null);

    res.json({
      success: true,
      leases: filtered,
    });

  } catch (err) {
    console.error("Dashboard error:", err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

// DEBUG: Check all leases with property details
router.get("/debug/all-leases", async (req, res) => {
  try {
    const Property = require("../models/property");
    
    // Get all active bookings
    const allLeases = await Booking.find({ status: "active" })
      .populate({
        path: "propertyId",
        select: "Title landlordID",
        populate: {
          path: "landlordID",
          select: "name phoneNumber",
        },
      })
      .limit(5);

    // Check raw property data
    const propertyIds = allLeases.map(l => l.propertyId?._id).filter(Boolean);
    const rawProperties = await Property.find({ _id: { $in: propertyIds } }).select("landlordID");

    return res.json({
      success: true,
      leaseCount: allLeases.length,
      leases: allLeases,
      rawPropertyData: rawProperties,
      debug: {
        message: "If landlordID is null in leases but populated in rawPropertyData, check database indexes",
      },
    });

  } catch (err) {
    console.error("Debug error:", err);
    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;