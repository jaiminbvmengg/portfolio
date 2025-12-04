const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

// ⭐ GET all enquiries (required for Admin Dashboard)
router.get('/', async (req, res) => {
  try {
    const list = await Resume.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: list
    });

  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch enquiries"
    });
  }
});

// POST (save enquiry)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    const doc = new Resume({
      name,
      email,
      phone: phone || "",
      message: message || ""
    });

    const saved = await doc.save();
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    console.error('Error saving enquiry:', err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
