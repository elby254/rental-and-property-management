const dotenv = require("dotenv");

// load env
dotenv.config();

// import routes
const express = require("express");
const connectDB = require("./config/db");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const paymentRoutes = require("./routes/paymentRoutes");
const startCronJobs = require("./Crons/rentReminders");
const bookingRoutes = require("./routes/bookingRoutes");
const atRoutes = require("./routes/atRoutes");
const authRoutes = require("./routes/authRoutes");
const propertyRoutes = require("./routes/propertyRoutes");
const leaseRoutes = require("./routes/leaseRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

// connect DB
connectDB();

// start cron jobs(automatic rent reminders)
startCronJobs();

// app
const app = express();

// middleware
app.use(express.json());
app.use(cookieParser());

// CORS (IMPORTANT for cookies)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// routes
app.use("/api/at", require("./routes/atRoutes"));
app.use("/api/payments", require("./routes/paymentRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/properties", require("./routes/propertyRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/leases", require("./routes/leaseRoutes"));
app.use("/api/maintenance", require("./routes/maintenanceRoutes"));

// home route
app.get("/", (req, res) => {
  res.json({
    message: "Rental Property Management API running ",
  });
});

// start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


