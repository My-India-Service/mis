const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }

    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin || !(await admin.comparePassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: admin._id, email: admin.email },
      process.env.JWT_SECRET || 'mis-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      admin: { id: admin._id, email: admin.email, name: admin.name },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/me', auth, async (req, res) => {
  const admin = await Admin.findById(req.admin.id).select('-password');
  if (!admin) return res.status(404).json({ success: false, message: 'Admin not found' });
  res.json({ success: true, admin });
});

module.exports = router;
