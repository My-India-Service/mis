require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Admin = require('../models/Admin');

const run = async () => {
  const email = (process.env.ADMIN_EMAIL || 'admin@myindiaservice.com').toLowerCase();
  const password = process.argv[2] || process.env.ADMIN_PASSWORD || 'admin123';

  await connectDB();

  const admin = await Admin.findOne({ email });
  if (admin) {
    admin.password = password;
    await admin.save();
    console.log(`Admin password reset for: ${email}`);
  } else {
    await Admin.create({ email, password, name: 'Admin' });
    console.log(`Admin created: ${email}`);
  }
};

run()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error('Failed to reset admin password:', err.message);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
