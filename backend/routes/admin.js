const express = require("express");
const router = express.Router();

router.post("/admin-login", (req, res) => {
  const { user, pass } = req.body;

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "admin123";

  if (user === ADMIN_USER && pass === ADMIN_PASS) {
    return res.json({ success: true });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid username or password",
  });
});

module.exports = router;
