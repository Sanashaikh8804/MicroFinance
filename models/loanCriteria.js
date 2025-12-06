

const mongoose = require('mongoose');

const loanCriteriaSchema = new mongoose.Schema({
  loanAmountRanges: [
    {
      label: String,   // ₹10,000 – ₹25,000
      min: Number,     // 10000
      max: Number      // 25000 (or null if no limit)
    }
  ],

  loanPeriods: [ Number ]  // months: [6, 9, 12, 18]
});

module.exports = mongoose.model("LoanCriteria", loanCriteriaSchema);