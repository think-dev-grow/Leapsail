const express = require("express");
const {
  forgetPassword,
  resetPassword,
  resetPassword2,
} = require("../controllers/user.js");

router.post("/forgot-password", forgetPassword);

router.get("/reset-password/:id", resetPassword);

router.put("users/reset-password/:id", resetPassword2);

module.exports = router;
