const mongoose = require('mongoose');

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
      phoneNumber: { type: String, required: true },
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

    status: {
      type: String,
      enum: ["pending_verification", "active", "suspended"],
      default: "pending_verification"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Nbfc", nbfcSchema);
