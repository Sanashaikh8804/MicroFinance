const express = require("express");
const router = express.Router();

const upload = require("../Middleware_/upload");
const {
  createUser,
  loginUser,
  uploadUserPan,
  getUserPanUrl
} = require("../controllers/userControllers");

router.post("/upload/pan/:userId", upload.single("panCard"), uploadUserPan);
router.post("/createUser", createUser);
router.post("/loginUser", loginUser);
router.get("/pan/:userId", getUserPanUrl);

module.exports = router;
