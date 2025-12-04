const express = require('express');
const Resume = require('../models/Resume');
const router = express.Router();

// GET all enquiries
router.get('/', async (req, res) => {
  try {
    const list = await Resume.find().sort({ createdAt: -1 });
    res.json({ success: true, data: list });
  } catch (err) {
    console.error("Error fetching enquiries:", err);
    res.status(500).json({ success: false, error: "Failed to fetch enquiries" });
  }
});

// POST create enquiry
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

// DELETE enquiry by id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Resume.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Entry not found",
      });
    }

    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({
      success: false,
      error: "Server error",
    });
  }
});

module.exports = router;
