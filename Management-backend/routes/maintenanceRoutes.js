const express = require("express");
const router = express.Router();

const Maintenance = require("../models/Maintenance");
const authMiddleware = require("../middleware/authmiddleware");


// CREATE REQUEST (TENANT)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { propertyID, issue } = req.body;

    const request = await Maintenance.create({
      tenantID: req.user._id,
      propertyID,
      issue,
    });

    res.json({
      success: true,
      request,
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// GET REQUESTS (ROLE BASED)
router.get("/", authMiddleware, async (req, res) => {
  try {
    let requests;

    if (req.user.role === "tenant") {
      requests = await Maintenance.find({ tenantID: req.user._id })
        .populate("propertyID");
    } else {
      requests = await Maintenance.find()
        .populate("propertyID")
        .populate("tenantID");
    }

    res.json({
      success: true,
      requests,
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


// UPDATE STATUS (LANDLORD)
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await Maintenance.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      updated,
    });

  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;