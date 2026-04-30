// landlord creation
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
require("dotenv").config();

// connect DB
mongoose.connect(process.env.mongo_uri)
  .then(() => console.log("MongoDB connected for seeding"))
  .catch((err) => console.log("DB error:", err));

async function createLandlord() {
  try {
    const existing = await User.findOne({ phoneNumber: "0700000000" });

    if (existing) {
      console.log("Landlord already exists");
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("abcd", 10);

    const landlord = await User.create({
      name: "Main Landlord",
      phoneNumber: "0700000000",
      role: "landlord",
      password: hashedPassword,
    });

    console.log("Landlord created:", landlord.phoneNumber);

    process.exit();

  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
}

createLandlord();