const express = require("express");
const {
  forgetPassword,
  resetPassword,
  resetPassword2,
} = require("../controllers/user.js");

// VrSZl5_xWFmAKJwEqxwuQij6E4OhKhzpK4acagQD

const router = express.Router();

router.post("/forgot-password", forgetPassword);

router.get("/reset-password/:id", resetPassword);

router.put("/reset-password/:id", resetPassword2);

module.exports = router;
