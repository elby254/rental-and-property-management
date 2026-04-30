const at = require("../config/at");
const Payment = require("../models/Payment");
const Property = require("../models/Property");
const User = require("../models/User");

//  INITIATE PAYMENT SYSTEM
exports.initiatePayment = async (req, res) => {
  try {
    const { phone, amount, propertyID } = req.body;

    const tenantID = req.user.id;

    //  check property exists
    const property = await Property.findById(propertyID);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: "Property not found"
      });
    }

    //  create transaction (PENDING)
    const payment = await Payment.create({
      tenantID,
      propertyID,
      phone,
      amount,
      status: "pending"
    });

    // send SMS notification (Africa's Talking sandbox)
    const smsResponse = await at.SMS.send({
      to: [phone],
      message: `Rent payment of KES ${amount} initiated for ${property.Title}. Transaction ID: ${payment._id}`
    });

    // 👤 notify landlord (optional upgrade)
    const landlord = await User.findById(property.landlordID);

    if (landlord?.phoneNumber) {
      await at.SMS.send({
        to: [landlord.phoneNumber],
        message: `Your tenant has initiated a rent payment of KES ${amount} for ${property.Title}`
      });
    }

    //  return full transaction
    return res.json({
      success: true,
      message: "Payment initiated successfully 💳",
      data: {
        payment,
        smsResponse
      }
    });

  } catch (error) {
    console.error("Payment error:", error);

    return res.status(500).json({
      success: false,
      message: "Payment system failed",
      error: error.message
    });
  }
};