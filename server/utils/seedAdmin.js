const Admin = require('../models/Admin');
const { fullPermissions } = require('./permissions');

const seedAdmin = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@myindiaservice.com').toLowerCase();
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const permissions = fullPermissions();

  const existing = await Admin.findOne({ email });
  if (!existing) {
    await Admin.create({ email, password, name: 'Admin', permissions });
    console.log(`Default admin created: ${email}`);
    return;
  }

  existing.password = password;
  existing.permissions = permissions;
  existing.markModified('permissions');
  await existing.save();
  console.log(`Admin credentials synced: ${email}`);
};

module.exports = seedAdmin;
