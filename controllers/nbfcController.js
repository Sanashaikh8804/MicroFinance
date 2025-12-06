const bcrypt = require("bcryptjs");
const Nbfc = require("../models/nbfcModel");

// REGISTER NBFC
exports.registerNbfc = async (req, res) => {
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

    if (!companyName || !cinNumber || !registrationYear || !headquartersLocation ||
        !contactFullName || !designation || !officialEmail || !phoneNumber || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // duplicate checks
    if (await Nbfc.findOne({ companyName }))
      return res.status(400).json({ error: "Company already exists" });

    if (await Nbfc.findOne({ cinNumber }))
      return res.status(400).json({ error: "CIN already registered" });

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
exports.loginNbfc = async (req, res) => {
  try {
    const { companyName, password } = req.body;

    if (!companyName || !password)
      return res.status(400).json({ error: "Company name and password required" });

    const nbfc = await Nbfc.findOne({ companyName });
    if (!nbfc) return res.status(401).json({ error: "Invalid company or password" });

    const match = await bcrypt.compare(password, nbfc.auth.passwordHash);
    if (!match) return res.status(401).json({ error: "Invalid company or password" });

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
