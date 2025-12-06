const express = require("express");
const router = express.Router();

// Use exact name as exported from the controller
const { getAllReviewApplications } = require("../controllers/reviewApplications");

router.get("/applications", getAllReviewApplications);

module.exports = router;
