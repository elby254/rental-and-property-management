const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    Title: { type: String, required: true },
    price: { type: Number, required: true },
    location: { type: String, required: true },

    landlordID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    tenantID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    isAvailable: {
      type: Boolean,
      default: true,
    },

    images: {
      type: [String],
      default: [],
    },

    nextRentDue: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports =mongoose.models.Property || mongoose.model("Property", propertySchema);