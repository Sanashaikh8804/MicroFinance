const express= require('express');
const router= express.Router();
const {getAllLoanSchemes} = require("../controllers/availableSchemes");

router.get("/schemes", getAllLoanSchemes);
module.exports= router;

