// routes/resume.js — TEMP DEBUG VERSION
const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    console.log('Debug POST body:', { name, email, phone, message });

    if (!name) return res.status(400).json({ success: false, error: 'Name is required' });
    if (!email) return res.status(400).json({ success: false, error: 'Email is required' });

    const doc = new Resume({
      name,
      email,
      phone: phone || "",
      message: message || ""
    });

    const saved = await doc.save();
    console.log('Saved document id:', saved._id);
    res.status(201).json({ success: true, data: saved });

  } catch (err) {
    console.error('Error saving enquiry (DEBUG):', err && err.stack ? err.stack : err);
    // TEMP: return real error message to client (remove this after debugging)
    res.status(500).json({ success: false, error: (err && err.message) || 'Server error', stack: err && err.stack });
  }
});

module.exports = router;
