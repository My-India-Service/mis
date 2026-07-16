/**
 * Migrate local /uploads/... images to Cloudinary and update MongoDB URLs.
 *
 * Usage: node utils/migrateUploadsToCloudinary.js
 */
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const { uploadImage, isConfigured } = require('../config/cloudinary');
const Blog = require('../models/Blog');
const Event = require('../models/Event');
const SuccessStory = require('../models/SuccessStory');

const uploadsRoot = path.join(__dirname, '../uploads');

const isLocalUpload = (url) => typeof url === 'string' && url.startsWith('/uploads/');

const resolveLocalPath = (url) => {
  // /uploads/blogs/file.jpg -> server/uploads/blogs/file.jpg
  const relative = url.replace(/^\//, '');
  return path.join(__dirname, '..', relative);
};

async function migrateField(doc, field, folderHint) {
  const value = doc[field];
  if (!isLocalUpload(value)) return false;

  const localPath = resolveLocalPath(value);
  if (!fs.existsSync(localPath)) {
    console.warn(`  Missing file for ${doc._id} ${field}: ${localPath}`);
    return false;
  }

  const folder = folderHint || value.split('/')[2] || 'misc';
  const baseName = path.basename(localPath, path.extname(localPath));

  console.log(`  Uploading ${localPath} → Cloudinary (${folder})`);
  const result = await uploadImage(localPath, {
    folder,
    publicId: baseName,
  });

  doc[field] = result.secure_url;
  await doc.save();
  console.log(`  Updated ${doc._id}.${field} → ${result.secure_url}`);
  return true;
}

async function migrateCollection(Model, fields, label) {
  const docs = await Model.find({});
  let migrated = 0;

  console.log(`\n${label}: ${docs.length} documents`);
  for (const doc of docs) {
    for (const { field, folder } of fields) {
      try {
        if (await migrateField(doc, field, folder)) migrated += 1;
      } catch (err) {
        console.error(`  Failed ${doc._id}.${field}:`, err.message);
      }
    }
  }
  console.log(`${label}: migrated ${migrated} image field(s)`);
  return migrated;
}

async function migrateLooseFiles() {
  if (!fs.existsSync(uploadsRoot)) {
    console.log('\nNo local uploads directory found.');
    return 0;
  }

  let count = 0;
  const folders = fs.readdirSync(uploadsRoot, { withFileTypes: true }).filter((d) => d.isDirectory());

  for (const dir of folders) {
    const folderPath = path.join(uploadsRoot, dir.name);
    const files = fs.readdirSync(folderPath).filter((f) => /\.(jpe?g|png|gif|webp|avif)$/i.test(f));

    for (const file of files) {
      const fullPath = path.join(folderPath, file);
      const publicId = path.basename(file, path.extname(file));
      try {
        console.log(`  Uploading loose file ${fullPath}`);
        await uploadImage(fullPath, { folder: dir.name, publicId });
        count += 1;
      } catch (err) {
        console.error(`  Failed ${fullPath}:`, err.message);
      }
    }
  }

  console.log(`Loose files uploaded: ${count}`);
  return count;
}

async function run() {
  if (!isConfigured()) {
    console.error('Cloudinary env vars missing. Set them in server/.env');
    process.exit(1);
  }

  await connectDB();

  let total = 0;
  total += await migrateCollection(Blog, [{ field: 'image', folder: 'blogs' }], 'Blogs');
  total += await migrateCollection(Event, [{ field: 'image', folder: 'events' }], 'Events');
  total += await migrateCollection(
    SuccessStory,
    [
      { field: 'previewImage', folder: 'success-stories' },
      { field: 'logoImage', folder: 'success-stories' },
    ],
    'Success Stories'
  );

  // Also upload any leftover files not referenced (or already migrated)
  await migrateLooseFiles();

  console.log(`\nDone. Migrated ${total} DB image field(s) to Cloudinary.`);
  await mongoose.connection.close();
  process.exit(0);
}

run().catch(async (err) => {
  console.error(err);
  try {
    await mongoose.connection.close();
  } catch (_) {
    /* ignore */
  }
  process.exit(1);
});
