//(where the real estate data lives)
// propertyRoutes.js

// imports
const express = require('express');
const router = express.Router();
const Property = require('../models/property');
const authMiddleware = require('../middleware/authmiddleware');
const landlordOnly = require('../middleware/landlordOnly');


// ASSIGN TENANT TO PROPERTY
// assigns tenantID and sets next rent due date
router.patch('/:id/assign-tenant', authMiddleware, async (req, res) => {
    try {
        const { tenantID } = req.body;

        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        // calculate next month date
        const today = new Date();
        const nextMonth = new Date();
        nextMonth.setMonth(today.getMonth() + 1);

        // update property
        property.tenantID = tenantID;
        property.isAvailable = false;
        property.nextRentDue = nextMonth;

        await property.save();

        res.json({
            success: true,
            message: 'Tenant assigned successfully',
            data: property
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


// ---------------- GET ALL (PUBLIC) ----------------
router.get("/", async (req, res) => {
  const properties = await Property.find();
  res.json(properties);
});

// ---------------- GET ONE (PUBLIC) ----------------
router.get("/:id", async (req, res) => {
  const property = await Property.findById(req.params.id);
  res.json(property);
});

// ---------------- CREATE (LANDLORD ONLY) ----------------
router.post("/", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "landlord") {
      return res.status(403).json({
        message: "Only landlords can create properties",
      });
    }

    const property = await Property.create({
      ...req.body,
      landlordID: req.user._id,
    });

    res.json(property);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- UPDATE (LANDLORD ONLY + OWNER CHECK) ----------------
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.user.role !== "landlord") {
      return res.status(403).json({ message: "Only landlords allowed" });
    }

    if (property.landlordID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your property" });
    }

    const updated = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ---------------- DELETE (LANDLORD ONLY + OWNER CHECK) ----------------
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Not found" });
    }

    if (req.user.role !== "landlord") {
      return res.status(403).json({ message: "Only landlords allowed" });
    }

    if (property.landlordID.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not your property" });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
