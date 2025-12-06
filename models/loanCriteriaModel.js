const mongoose = require('mongoose');

const loanCriteriaSchema = new mongoose.Schema({
  loanAmountRanges: [
    {
      label: String,
      min: Number,
      max: Number
    }
  ],

  loanPeriods: [ Number ]
});

module.exports = mongoose.model('LoanCriteria', loanCriteriaSchema);
