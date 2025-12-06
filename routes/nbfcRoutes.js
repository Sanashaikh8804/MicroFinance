const express = require("express");
const router = express.Router();

const {
  registerNbfc,
  loginNbfc,
  createLoanScheme,
  getNbfcDashboard
} = require("../controllers/nbfcController");

router.post("/register", registerNbfc);
router.post("/login", loginNbfc);

// new routes
router.post("/schemes", createLoanScheme);
router.get("/dashboard/:nbfcId", getNbfcDashboard);

module.exports = router;
