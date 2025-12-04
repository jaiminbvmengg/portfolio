const express = require('express');
const Resume = require('../models/Resume');   // This is now the Enquiry model

const router = express.Router();

// -------------------------------
// CREATE Enquiry (POST)
// -------------------------------
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // DEBUG LOG — check frontend message
    console.log("Received message:", message);

    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const doc = new Resume({
      name,
      email,
      phone: phone || "",
      message: message || ""    // Prevent undefined values
    });

    await doc.save();

    res.status(201).json({ success: true, data: doc });

  } catch (err) {
    console.error("Error saving enquiry:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// -------------------------------
// GET all Enquiries (Admin Dashboard)
// -------------------------------
router.get('/', async (req, res) => {
  try {
    const items = await Resume.find().sort({ createdAt: -1 });
    res.json({ success: true, data: items });

  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

// -------------------------------
// DELETE Enquiry by ID (Admin Dashboard)
// -------------------------------
router.delete('/:id', async (req, res) => {
  try {
    await Resume.findByIdAndDelete(req.params.id);
    res.json({ success: true });

  } catch (err) {
    console.error("Error deleting enquiry:", err);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
