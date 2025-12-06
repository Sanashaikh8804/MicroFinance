const bcrypt = require("bcryptjs");
const Nbfc = require("../models/nbfcModel");

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
    const { nbfcId } = req.body;

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

    if (
      !nbfcId || !schemeName ||
      minAmount == null || maxAmount == null ||
      minPeriodMonths == null || maxPeriodMonths == null ||
      interestRate == null
    ) {
      return res.status(400).json({ error: "Required fields are missing" });
    }

    const nbfc = await Nbfc.findById(nbfcId);
    if (!nbfc) {
      return res.status(404).json({ error: "NBFC not found" });
    }

    // Simple schemeId: SCH-001, SCH-002, ...
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
    // update dashboard count
    nbfc.stats.activeSchemes = (nbfc.stats?.activeSchemes || 0) + 1;

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

    const nbfc = await Nbfc.findById(nbfcId);
    if (!nbfc) {
      return res.status(404).json({ error: "NBFC not found" });
    }

    return res.json({
      companyName: nbfc.companyName,
      stats: nbfc.stats,
      loanSchemes: nbfc.loanSchemes
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