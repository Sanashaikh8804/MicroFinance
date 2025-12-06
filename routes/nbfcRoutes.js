const express = require("express");
const router = express.Router();

const {
  registerNbfc,
  loginNbfc
} = require("../controllers/nbfcController");

router.post("/register", registerNbfc);
router.post("/login", loginNbfc);

module.exports = router;
