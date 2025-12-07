const express = require("express");
const router = express.Router();

const upload = require("../Middleware_/upload");
const {
  createUser,
  loginUser,
  uploadUserPan
} = require("../controllers/userControllers");

router.post("/upload/pan/:userId", upload.single("panCard"), uploadUserPan);
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);

module.exports = router;
