const express = require('express');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');

const router = express.Router();

const signToken = (admin) => {
  const permissions = admin.getPermissions();
  return jwt.sign(
    {
      id: admin._id.toString(),
      email: admin.email,
      name: admin.name,
      permissions,
    },
    process.env.JWT_SECRET || 'mis-secret-key',
    { expiresIn: '7d' }
  );
};

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

    const safe = admin.toSafeJSON();
    const token = signToken(admin);

    res.json({
      success: true,
      token,
      admin: safe,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/me', auth, async (req, res) => {
  try {
    const adminId = req.admin.id || req.admin._id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }
    res.json({
      success: true,
      admin: admin.toSafeJSON(),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
