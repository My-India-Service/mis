/**
 * Print which Mongo/admin env this shell sees (password masked).
 * Usage (from app root, venv on): node server/utils/printMongoEnv.js
 */
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const maskUri = (uri) =>
  uri.replace(/:\/\/([^:]+):([^@]+)@/, '://$1:***@');

const uri = process.env.MONGODB_URI;
const root = process.cwd();

console.log(
  'MONGODB_URI:',
  uri ? maskUri(uri) : '(MISSING - would fall back to localhost/mis)'
);
console.log(
  'ADMIN_EMAIL:',
  process.env.ADMIN_EMAIL || '(default admin@myindiaservice.com)'
);
console.log('has ADMIN_PASSWORD:', !!process.env.ADMIN_PASSWORD);
console.log('.env exists:', fs.existsSync(path.join(root, '.env')));
console.log('server/.env exists:', fs.existsSync(path.join(root, 'server/.env')));
