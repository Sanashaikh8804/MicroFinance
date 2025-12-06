const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    applicantName: { type: String, required: true },
    businessName: { type: String, required: true },
    schemeId: { type: String, required: true },
    schemeName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "under_review", "approved", "rejected"],
      default: "pending"
    },
    appliedAt: { type: Date, default: Date.now }
  },
  { _id: true }
);

// one loan scheme inside NBFC
const loanSchemeSchema = new mongoose.Schema(
  {
    schemeId: { type: String, required: true },       // e.g. "SCH-001"
    schemeName: { type: String, required: true },

    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },

    minPeriodMonths: { type: Number, required: true },
    maxPeriodMonths: { type: Number, required: true },

    interestRate: { type: Number, required: true },   // % p.a.
    processingFeePercent: { type: Number, default: 0 },

    requiredDocuments: [{ type: String }],            // ["Aadhaar Card", "PAN Card", ...]
    preferredBusinessTypes: [{ type: String }],       // ["Retail", "Service", ...]

    isActive: { type: Boolean, default: true },
    applicantsCount: { type: Number, default: 0 },
    approvedCount: { type: Number, default: 0 }
  },
  { _id: true } // keep an _id for each scheme
);

const nbfcSchema = new mongoose.Schema(
  {
    companyName: { type: String, required: true, unique: true },
    cinNumber: { type: String, required: true, unique: true },
    registrationYear: { type: Number, required: true },
    headquartersLocation: { type: String, required: true },

    contactPerson: {
      fullName: { type: String, required: true },
      designation: { type: String, required: true },
      officialEmail: { type: String, required: true },
      phoneNumber: { type: String, required: true }
    },

    auth: {
      passwordHash: { type: String, required: true }
    },

    documents: {
      cinCertificateUrl: String,
      rbiLicenseUrl: String,
      companyPanUrl: String,
      additionalDocs: [String]
    },

    // 🔹 NEW: dashboard stats with defaults = 0
    stats: {
      activeSchemes: { type: Number, default: 0 },
      totalApplicants: { type: Number, default: 0 },
      pendingReview: { type: Number, default: 0 },
      approvedThisMonth: { type: Number, default: 0 }
    },

    // 🔹 NEW: list of loan schemes created by this NBFC
    loanSchemes: [loanSchemeSchema],

    status: {
      type: String,
      enum: ["pending_verification", "active", "suspended"],
      default: "pending_verification"
    },
     applications: [applicationSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("nbfc", nbfcSchema);
