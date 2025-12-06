const express = require("express");
const router = express.Router();

const {
  registerNbfc,
  loginNbfc,
  createLoanScheme,
  getNbfcDashboard
} = require("../controllers/nbfcController");

// AUTH ROUTES
router.post("/register", registerNbfc);
router.post("/login", loginNbfc);

// CREATE NEW LOAN SCHEME
router.post("/:nbfcId/create-scheme", createLoanScheme);

// DASHBOARD
router.get("/dashboard/:nbfcId", getNbfcDashboard);

module.exports = router;
