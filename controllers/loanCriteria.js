const asyncHandler = require("express-async-handler");
const LoanCriteria = require("../models/loanCriteriaModel");

// Fetch loan criteria from MongoDB
const loanCriteria = asyncHandler(async (req, res) => {
  const criteria = await LoanCriteria.findOne(); // get first / latest document

  if (!criteria) {
    return res.status(404).json({
      success: false,
      message: "No loan criteria found",
    });
  }

  res.json({
    success: true,
    data: criteria
  });
});

module.exports = { loanCriteria };
