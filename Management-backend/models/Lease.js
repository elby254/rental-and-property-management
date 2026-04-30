const mongoose = require("mongoose");

const leaseSchema = new mongoose.Schema({
  tenantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  landlordID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  rentAmount: {
    type: Number,
    required: true,
  },

  startDate: {
    type: Date,
    default: Date.now,
  },

  endDate: {
    type: Date,
  },

  status: {
    type: String,
    enum: ["active", "terminated", "expired"],
    default: "active",
  },

  isPaid: {
    type: Boolean,
    default: true,
  },

  terms: {
    type: String,
    default:
      "Tenant agrees to pay rent on time and maintain the property in good condition.",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Lease", leaseSchema);