const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  education: { type: String },
  skills: { type: [String], default: [] },
  coverLetter: { type: String },
  resumeUrl: { type: String }, // path or external URL
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Enquiry", ResumeSchema, "Enquiry");

