const PERMISSION_KEYS = [
  'manage_blogs',
  'manage_events',
  'manage_stories',
  'manage_submissions',
  'manage_users',
  'manage_uploads',
];

const emptyPermissions = () =>
  Object.fromEntries(PERMISSION_KEYS.map((key) => [key, false]));

const fullPermissions = () =>
  Object.fromEntries(PERMISSION_KEYS.map((key) => [key, true]));

const normalizePermissions = (input = {}) => {
  const base = emptyPermissions();
  for (const key of PERMISSION_KEYS) {
    if (typeof input[key] === 'boolean') base[key] = input[key];
  }
  return base;
};

const permissionsSchemaFields = Object.fromEntries(
  PERMISSION_KEYS.map((key) => [key, { type: Boolean, default: false }])
);

module.exports = {
  PERMISSION_KEYS,
  emptyPermissions,
  fullPermissions,
  normalizePermissions,
  permissionsSchemaFields,
};
