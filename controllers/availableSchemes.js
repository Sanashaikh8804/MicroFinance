const asyncHandler = require("express-async-handler");
const AvailableLoanSchemes = require("../models/availableSchemes"); // adjust path

// GET all available loan schemes
const getAllLoanSchemes = asyncHandler(async (req, res) => {
  const schemes = await AvailableLoanSchemes.find({});
  if (!schemes || schemes.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No loan schemes found",
    });
  }

  res.status(200).json({
    success: true,
    data: schemes,
  });
});

module.exports = { getAllLoanSchemes };
