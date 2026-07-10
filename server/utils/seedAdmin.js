const Admin = require('../models/Admin');

const seedAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || 'admin@myindiaservice.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  const exists = await Admin.findOne({ email });
  if (!exists) {
    await Admin.create({ email, password, name: 'Admin' });
    console.log(`Default admin created: ${email}`);
  }
};

module.exports = seedAdmin;
