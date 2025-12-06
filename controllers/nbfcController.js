const bcrypt = require("bcryptjs");
const Nbfc = require("../models/nbfcModel");
const mongoose = require("mongoose");


// REGISTER NBFC
const registerNbfc = async (req, res) => {
  try {
    const {
      companyName,
      cinNumber,
      registrationYear,
      headquartersLocation,
      contactFullName,
      designation,
      officialEmail,
      phoneNumber,
      password
    } = req.body;

    if (
      !companyName ||
      !cinNumber ||
      !registrationYear ||
      !headquartersLocation ||
      !contactFullName ||
      !designation ||
      !officialEmail ||
      !phoneNumber ||
      !password
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Duplicate checks
    if (await Nbfc.findOne({ companyName })) {
      return res.status(400).json({ error: "Company already exists" });
    }

    if (await Nbfc.findOne({ cinNumber })) {
      return res.status(400).json({ error: "CIN already registered" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    const nbfc = await Nbfc.create({
      companyName,
      cinNumber,
      registrationYear,
      headquartersLocation,
      contactPerson: {
        fullName: contactFullName,
        designation,
        officialEmail,
        phoneNumber
      },
      auth: { passwordHash }
    });

    return res.json({
      message: "NBFC registered successfully",
      nbfcId: nbfc._id,
      companyName: nbfc.companyName
    });

  } catch (err) {
    console.log("NBFC Register Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

// LOGIN NBFC
const loginNbfc = async (req, res) => {
  try {
    const { companyName, password } = req.body;

    if (!companyName || !password) {
      return res
        .status(400)
        .json({ error: "Company name and password required" });
    }

    const nbfc = await Nbfc.findOne({ companyName });
    if (!nbfc) {
      return res.status(401).json({ error: "Invalid company or password" });
    }

    const match = await bcrypt.compare(password, nbfc.auth.passwordHash);
    if (!match) {
      return res.status(401).json({ error: "Invalid company or password" });
    }

    return res.json({
      message: "Login Successful",
      nbfcId: nbfc._id,
      companyName: nbfc.companyName
    });

  } catch (err) {
    console.log("NBFC Login Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};

const createLoanScheme = async (req, res) => {
  try {
    const { nbfcId } = req.params;

    const {
      schemeName,
      minAmount,
      maxAmount,
      minPeriodMonths,
      maxPeriodMonths,
      interestRate,
      processingFeePercent,
      requiredDocuments,
      preferredBusinessTypes
    } = req.body;

    // Validate required fields
    if (
      !schemeName ||
      minAmount == null ||
      maxAmount == null ||
      minPeriodMonths == null ||
      maxPeriodMonths == null ||
      interestRate == null
    ) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const nbfc = await Nbfc.findById(nbfcId);
    if (!nbfc) {
      return res.status(404).json({ error: "NBFC not found" });
    }

    // Generate schemeId
    const schemeNumber = (nbfc.loanSchemes?.length || 0) + 1;
    const schemeId = `SCH-${String(schemeNumber).padStart(3, "0")}`;

    const newScheme = {
      schemeId,
      schemeName,
      minAmount,
      maxAmount,
      minPeriodMonths,
      maxPeriodMonths,
      interestRate,
      processingFeePercent: processingFeePercent || 0,
      requiredDocuments: requiredDocuments || [],
      preferredBusinessTypes: preferredBusinessTypes || [],
      isActive: true,
      applicantsCount: 0,
      approvedCount: 0
    };

    nbfc.loanSchemes.push(newScheme);

    // Update dashboard stats
    nbfc.stats.activeSchemes = nbfc.loanSchemes.length;

    await nbfc.save();

    return res.status(201).json({
      message: "Loan scheme created successfully",
      scheme: newScheme
    });

  } catch (err) {
    console.log("CreateLoanScheme Error:", err);
    return res.status(500).json({ error: "Server error while creating scheme" });
  }
};


// GET DASHBOARD DATA FOR NBFC
const getNbfcDashboard = async (req, res) => {
  try {
    const { nbfcId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(nbfcId)) {
      return res.status(400).json({ error: "Invalid NBFC id" });
    }

    const nbfc = await Nbfc.findById(nbfcId);
    if (!nbfc) {
      return res.status(404).json({ error: "NBFC not found" });
    }

    const activeSchemes = (nbfc.loanSchemes || []).filter(s => s.isActive);
    const allApplications = nbfc.applications || [];

    // sort by appliedAt desc and take latest 5
    const recentApplicants = allApplications
      .sort((a, b) => b.appliedAt - a.appliedAt)
      .slice(0, 5);

    return res.json({
      companyName: nbfc.companyName,
      stats: nbfc.stats,
      activeSchemes,
      recentApplicants
    });

  } catch (err) {
    console.log("GetNbfcDashboard Error:", err);
    return res.status(500).json({ error: "Server error while fetching dashboard" });
  }
};


module.exports = {
  registerNbfc,
  loginNbfc,
  createLoanScheme,
  getNbfcDashboard
};