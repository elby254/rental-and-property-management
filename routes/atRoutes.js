const express = require("express");
const router = express.Router();
const at = require("../config/at");

const sms = at.SMS;

/**
 * USSD MENU
 */
router.post("/ussd", (req, res) => {
  const { text } = req.body;

  let response = "";

  if (text === "") {
    response = `CON Welcome to Rental Management
1. Check Rent Balance
2. Contact Support`;

  } else if (text === "1") {
    response = `END Your rent balance is KES 10,000`;

  } else if (text === "2") {
    response = `END Call: +254711111111`;

  } else {
    response = `END Invalid choice`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

/**
 * SEND SMS AFTER PAYMENT
 */
router.post("/send-reminder", async (req, res) => {
  try {
    const { phoneNumber, amount } = req.body;

    const message = `Rent Reminder: KES ${amount} due.`;

    const response = await sms.send({
      to: [phoneNumber],
      message,
    });

    res.json({
      success: true,
      data: response,
    });

  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;