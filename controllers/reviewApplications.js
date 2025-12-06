const asyncHandler = require("express-async-handler");
const ReviewApplication = require("../models/reviewApplicationModel");


// GET all review applications
const getAllReviewApplications = asyncHandler(async (req, res) => {
  const apps = await ReviewApplication.find({});
  if (apps.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No applications found",
    });
  }

  res.status(200).json({
    success: true,
    data: apps,
  });
});

module.exports = { getAllReviewApplications };
