const express= require('express');
const router= express.Router();
const { loanCriteria} = require("../controllers/loanCriteria");

router.get("/loanCriteria", loanCriteria);
module.exports= router;

