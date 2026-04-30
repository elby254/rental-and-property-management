const express = require("express");
const router = express.Router();
const at = require("../config/at");
const sms = at.SMS;

// Test SMS endpoint
router.post("/test", async (req, res) => {
  try {
    const result = await sms.send({
      to: "+254711111111",
      message: "Test SMS"
    });
    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Send SMS endpoint
router.post("/send", async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: to, message"
      });
    }

    const result = await sms.send({
      to,
      message
    });

    res.json({
      success: true,
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
