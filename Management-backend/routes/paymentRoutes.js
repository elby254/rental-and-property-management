// imports
const express = require("express");
const router = express.Router();

const Payment = require("../models/Payment");
const Property = require("../models/property");
const Booking = require("../models/Booking");

const at = require("../config/at");
const { normalizePhoneNumber } = require("../utils/phone");
const sms = at.SMS;


// ---------------- INITIATE PAYMENT ----------------
router.post("/pay", async (req, res) => {
  try {
    const { tenantID, propertyID, phone, amount } = req.body;

    if (!tenantID || !propertyID || !phone || !amount) {
      return res.status(400).json({
        success: false,
        message: "Missing payment details",
      });
    }

    const property = await Property.findById(propertyID);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found",
      });
    }

    // prevent duplicate payment
    const existingPayment = await Payment.findOne({
      tenantID,
      propertyID,
      status: "success",
    });

    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: "Already paid",
      });
    }

    // create payment (simulation)
    const payment = await Payment.create({
      tenantID,
      propertyID,
      phone,
      amount,
      status: "success",
    });

    // update property
    property.isAvailable = false;
    const now = new Date();
    const nextDueBase = property.nextRentDue ? new Date(property.nextRentDue) : now;
    const dueBase = nextDueBase > now ? nextDueBase : now;
    dueBase.setDate(dueBase.getDate() + 30);
    property.nextRentDue = dueBase;
    await property.save();

    // update booking
    await Booking.findOneAndUpdate(
      { propertyId: propertyID, userId: tenantID },
      { status: "active", isPaid: true }
    );

      const formattedPhone = normalizePhoneNumber(phone);

      console.log("Sending SMS to:", formattedPhone, "Message:", `Payment of KES ${amount} received. Booking confirmed.`);

      // SMS
      try {
        const smsResponse = await sms.send({
          to: [formattedPhone],
          message: `Payment of KES ${amount} received. Booking confirmed.`,
        });
     console.log("SMS sent successfully:", smsResponse);
     } catch (smsError) {
     console.error("SMS error:", smsError.message);
    }  

    res.json({
      success: true,
      message: "Payment successful",
      data: payment,
    });

  } catch (error) {
    console.error("Payment error:", error);

    res.status(500).json({
      success: false,
      message: "Payment failed",
      error: error.message,
    });
  }
});


// ---------------- PAYMENT CALLBACK (FIXED) ----------------
router.post("/payment-callback", async (req, res) => {
  try {
    const { tenantID, propertyID, amount, phone, status } = req.body;

    console.log("CALLBACK BODY:", req.body);

    // VALIDATION
    if (!tenantID || !propertyID || !amount || !phone || !status) {
      return res.status(400).json({
        success: false,
        message: "Missing callback data",
      });
    }

    // PREVENT DUPLICATES
    const existing = await Payment.findOne({
      tenantID,
      propertyID,
      amount,
      status,
    });

    if (existing) {
      return res.json({
        success: true,
        message: "Payment already recorded",
        payment: existing,
      });
    }

    // SAVE PAYMENT
    const payment = await Payment.create({
      tenantID,
      propertyID,
      amount,
      phone,
      status,
    });

    let booking = null;

    // IF SUCCESS → UPDATE BOOKING + PROPERTY
    if (status === "success") {

      booking = await Booking.findOneAndUpdate(
        { userId: tenantID, propertyId: propertyID },
        { status: "active", isPaid: true },
        { new: true }
      );

      const property = await Property.findById(propertyID);
      if (property) {
        const now = new Date();
        const nextDueBase = property.nextRentDue ? new Date(property.nextRentDue) : now;
        const dueBase = nextDueBase > now ? nextDueBase : now;
        dueBase.setDate(dueBase.getDate() + 30);

        await Property.findByIdAndUpdate(propertyID, {
          isAvailable: false,
          nextRentDue: dueBase,
        });
      }

      // SEND SMS SAFELY
      try {
        const formattedPhone = normalizePhoneNumber(phone);

        console.log("Sending SMS to:", formattedPhone, "Message:", "Payment confirmed. Your booking is now active.");

        const smsResponse = await sms.send({
          to: [formattedPhone],
          message: "Payment confirmed. Your booking is now active.",
        });
        console.log("SMS sent successfully:", smsResponse);
      } catch (smsError) {
        console.error("SMS error:", smsError.message);
      }
    }

    return res.json({
      success: true,
      message: "Callback processed",
      payment,
      booking,
    });

  } catch (err) {
    console.error("CALLBACK ERROR:", err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;