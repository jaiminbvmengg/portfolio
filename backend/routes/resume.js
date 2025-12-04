const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await Resume.find().sort({ createdAt: -1 });
    return res.json({ success: true, data: list });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

router.post('/', async (req, res) => {
  const { name, email, phone, message } = req.body;

  try {
    const saved = await Resume.create({ name, email, phone, message });
    return res.status(201).json({ success: true, data: saved });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
