const cron = require("node-cron");
const User = require("../models/User");
const Property = require("../models/property");
const at = require("../config/at");
const { normalizePhoneNumber } = require("../utils/phone");

const sms = at.SMS;

const startCronJobs = () => {
  console.log("Cron system initialized");

  // run once per day at midnight
  cron.schedule("0 0 * * *", async () => {
    console.log("Running rent reminders...");

    try {
      const properties = await Property.find({ isAvailable: false })
        .populate("landlordID")
        .populate("tenantID");

      const today = new Date();
      const currentDay = today.getDate();
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const firstOfMonth = new Date(currentYear, currentMonth, 1);
      const reminderDay = currentDay === 1;
      const overdueDay = currentDay === 8;

      if (!reminderDay && !overdueDay) return;

      for (const property of properties) {
        if (!property.nextRentDue) continue;

        const dueDate = new Date(property.nextRentDue);
        if (dueDate.getMonth() !== currentMonth || dueDate.getFullYear() !== currentYear) continue;

        const tenant = property.tenantID;
        if (!tenant || !tenant.phoneNumber) continue;

        const formattedPhone = normalizePhoneNumber(tenant.phoneNumber);

        if (reminderDay) {
          await sms.send({
            to: [formattedPhone],
            message: `Rent reminder: Rent for ${property.Title} is due this month. Please pay your rent on time.`,
          });

          console.log(`1st-of-month reminder sent to ${formattedPhone} for ${property.Title}`);
        }

        if (overdueDay && dueDate <= firstOfMonth) {
          await sms.send({
            to: [formattedPhone],
            message: `Overdue rent reminder: Rent for ${property.Title} is now overdue by one week. Please pay immediately.`,
          });

          console.log(`Overdue reminder sent to ${formattedPhone} for ${property.Title}`);
        }
      }

    } catch (error) {
      console.error("Cron error:", error.message);
    }
  });
};

module.exports = startCronJobs;