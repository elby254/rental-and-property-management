const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  tenantID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  propertyID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  phone: String,
  amount: Number,

  status: {
    type: String,
    enum: ["pending", "success", "failed"],
    default: "pending",
  },

  transactionId: String, 

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);