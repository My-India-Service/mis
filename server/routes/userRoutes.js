const express = require('express');
const Admin = require('../models/Admin');
const auth = require('../middleware/auth');
const { requirePermission } = auth;
const { normalizePermissions } = require('../utils/permissions');

const router = express.Router();

router.use(auth, requirePermission('manage_users'));

const countManageUsers = async (excludeId = null) => {
  const filter = { 'permissions.manage_users': true };
  if (excludeId) filter._id = { $ne: excludeId };
  return Admin.countDocuments(filter);
};

router.get('/', async (_req, res) => {
  try {
    const users = await Admin.find().sort({ createdAt: -1 });
    res.json({ success: true, data: users.map((u) => u.toSafeJSON()) });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { email, password, name, permissions } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password required' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await Admin.findOne({ email: normalizedEmail });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Email already in use' });
    }

    const user = await Admin.create({
      email: normalizedEmail,
      password,
      name: name || 'Admin',
      permissions: normalizePermissions(permissions),
    });

    res.status(201).json({ success: true, data: user.toSafeJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const actorId = (req.admin.id || req.admin._id).toString();
    const targetId = user._id.toString();
    const { email, password, name, permissions } = req.body;

    if (permissions !== undefined) {
      const nextPerms = normalizePermissions(permissions);
      const currentlyHas = user.getPermissions().manage_users;
      const willHave = nextPerms.manage_users;

      if (actorId === targetId && currentlyHas && !willHave) {
        const others = await countManageUsers(user._id);
        if (others === 0) {
          return res.status(400).json({
            success: false,
            message: 'Cannot remove manage_users from the last user who has it',
          });
        }
      }

      user.permissions = nextPerms;
    }

    if (email !== undefined) {
      const normalizedEmail = email.toLowerCase().trim();
      const clash = await Admin.findOne({ email: normalizedEmail, _id: { $ne: user._id } });
      if (clash) {
        return res.status(400).json({ success: false, message: 'Email already in use' });
      }
      user.email = normalizedEmail;
    }

    if (name !== undefined) user.name = name;

    if (password) {
      if (password.length < 6) {
        return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
      }
      user.password = password;
    }

    await user.save();
    res.json({ success: true, data: user.toSafeJSON() });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const user = await Admin.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const actorId = (req.admin.id || req.admin._id).toString();
    const targetId = user._id.toString();

    if (actorId === targetId) {
      return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    if (user.getPermissions().manage_users) {
      const others = await countManageUsers(user._id);
      if (others === 0) {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete the last user who has manage_users',
        });
      }
    }

    await user.deleteOne();
    res.json({ success: true, message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
