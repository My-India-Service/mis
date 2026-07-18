const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {
  permissionsSchemaFields,
  emptyPermissions,
  normalizePermissions,
} = require('../utils/permissions');

const adminSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    name: { type: String, default: 'Admin' },
    permissions: {
      type: new mongoose.Schema(permissionsSchemaFields, { _id: false }),
      default: () => emptyPermissions(),
    },
  },
  { timestamps: true }
);

adminSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

adminSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password);
};

adminSchema.methods.getPermissions = function () {
  const raw = this.permissions?.toObject?.() || this.permissions || {};
  return normalizePermissions(raw);
};

adminSchema.methods.toSafeJSON = function () {
  return {
    id: this._id.toString(),
    email: this.email,
    name: this.name,
    permissions: this.getPermissions(),
  };
};

module.exports = mongoose.model('Admin', adminSchema);
