const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema(
  {
    fullname: { type: String },
    email: { type: String, unique: true },
    phoneNumber: { type: String },
    productType: { type: String },
    enquiryType: { type: String },
    others: { type: String, default: '' },
    duration: { type: String, default: '' },
    timeZone: { type: String },
    nameOfOrg: { type: String },
    fullname2: { type: String },
    position: { type: String },
    email2: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Contact', ContactSchema);
