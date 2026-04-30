module.exports = (req, res, next) => {
  // safety check: user must exist
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // role check
  if (req.user.role !== "landlord") {
    return res.status(403).json({
      message: "Access denied: landlords only",
    });
  }

  next();
};