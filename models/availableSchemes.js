const mongoose = require('mongoose');

const loanSchemeSchema = new mongoose.Schema({
  companyName: { 
    type: String, 
    required: true 
  },
  registrationAuthority: { 
    type: String 
  },
  loanRange: {
    min: { type: Number, required: true }, // e.g., 25000
    max: { type: Number, required: true }  // e.g., 100000
  },
  tenureMonths: { 
    type: Number, 
    required: true 
  },
  processingTime: { 
    type: String // e.g., "3-5 business days"
  },
  requiredDocuments: [{ 
    type: String // e.g., ["PAN", "Aadhar card", "Bank statement"]
  }]
});

// Main collection for all available loan schemes
const availableLoanSchema = new mongoose.Schema({
  Available_Loan_Schemes: [loanSchemeSchema]
});

module.exports = mongoose.model("AvailableLoanSchemes", availableLoanSchema);
