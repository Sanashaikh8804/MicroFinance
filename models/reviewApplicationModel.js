const mongoose = require("mongoose");

const reviewApplicationSchema = new mongoose.Schema({
  applicationId: { type: String, required: true, unique: true },
  appliedDate: { type: String, required: true },
  scheme: { type: String, required: true },

  loanAmount: { type: Number, required: true },
  loanPeriod: { type: Number, required: true }, // months

  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  aadharNumber: { type: String, required: true },
  panNumber: { type: String, required: true },

  businessName: { type: String, required: true },
  businessType: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String },

  turnoverLast6Months: { type: Number, required: true },
  lastYearItr: { type: Number, required: true }
});

module.exports = mongoose.model("ReviewApplications", reviewApplicationSchema);
// Collection name → reviewapplications
