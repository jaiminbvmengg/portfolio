require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const resumeRouter = require("./backend/routes/resume");
const adminRouter = require("./backend/routes/admin");


const app = express();
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ROUTES
// ROUTES
app.use('/api/resumes', resumeRouter);
app.use('/api', adminRouter);


// Health check
app.get('/api/health', (req, res) => res.json({ ok: true }));

// ENV Vars
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error('Missing MONGO_URI in .env. Add MONGO_URI inside .env.');
  process.exit(1);
}

// DB Connection
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
