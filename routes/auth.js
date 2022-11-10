const express = require("express");
const {
  register,
  login,
  verifyEmail,
  getUsers,
} = require("../controllers/auth");

const router = express();

router.post("/register", register);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.get("/", getUsers);

module.exports = router;
