const express= require('express');
const router= express.Router();

router.post("/name", Name);
router.post("/phone_number", phone_number);
router.post("/password", password)
router.post("/email", email);
router.post("/aadhar", aadhar);
router.post("/pan", pan);
router.post("business_description"  , business_description);
router.post("/previous_micro_loans", previous_micro_loans);
router.post("/gst_number", gst_number);

module.exports= router;