const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const auth = (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    const token = header.split(' ')[1];
    req.admin = jwt.verify(token, process.env.JWT_SECRET || 'mis-secret-key');
    next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

/**
 * Load the admin from DB and require a permission flag.
 * Must run after `auth`.
 */
const requirePermission = (permission) => async (req, res, next) => {
  try {
    const adminId = req.admin?.id || req.admin?._id;
    if (!adminId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const admin = await Admin.findById(adminId);
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    const permissions = admin.getPermissions();
    if (!permissions[permission]) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: missing permission ${permission}`,
      });
    }

    req.adminDoc = admin;
    req.adminPermissions = permissions;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/** auth then requirePermission — for optional admin listing routes */
const authWithPermission = (permission) => (req, res, next) => {
  auth(req, res, () => requirePermission(permission)(req, res, next));
};

module.exports = auth;
module.exports.requirePermission = requirePermission;
module.exports.authWithPermission = authWithPermission;
