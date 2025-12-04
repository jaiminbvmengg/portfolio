const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    message: { type: String }
  },
  {
    timestamps: true,
    collection: "Enquiry"  // MUST match your existing MongoDB collection
  }
);

module.exports = mongoose.model("Enquiry", ResumeSchema);
