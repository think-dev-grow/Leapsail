const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    password: { type: String },
    emailToken: { type: String },
    verified: { type: Boolean, default: false },
    token: { type: String, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
