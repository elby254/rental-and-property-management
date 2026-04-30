const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },

  status: {
    type: String,
    enum: ["pending", "active", "cancelled"],
    default: "pending",
  },

  isPaid: {
    type: Boolean,
    default: false,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// PREVENT DUPLICATE BOOKINGS (same user + same property)
bookingSchema.index({ userId: 1, propertyId: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);