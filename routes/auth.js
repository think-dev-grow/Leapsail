const express = require("express");
const {
  register,
  login,
  verifyEmail,
  getUsers,
  sendOTP,
} = require("../controllers/auth");

const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.get("/send-otp/:id", sendOTP);
router.get("/", getUsers);

module.exports = router;
