/**
 * Connect and print which MongoDB database this shell would hit.
 * Usage (from app root, venv on): node server/utils/checkMongoDb.js
 */
require('dotenv').config();
const mongoose = require('mongoose');

const COUNT_COLLECTIONS = ['admins', 'successstories', 'blogs', 'events'];

const run = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error(
      'No MONGODB_URI in this shell. Export the real URI from Setup Node.js App, or put it in ~/mis/.env (not the placeholder text).'
    );
    process.exit(1);
  }

  await mongoose.connect(uri);

  console.log('host:', mongoose.connection.host);
  console.log('db name:', mongoose.connection.name);

  const cols = await mongoose.connection.db.listCollections().toArray();
  console.log(
    'collections:',
    cols
      .map((c) => c.name)
      .sort()
      .join(', ')
  );

  for (const name of COUNT_COLLECTIONS) {
    try {
      const count = await mongoose.connection.collection(name).countDocuments();
      console.log(`${name}:`, count);
    } catch {
      console.log(`${name}: (missing)`);
    }
  }

  const admins = await mongoose.connection
    .collection('admins')
    .find({}, { projection: { email: 1 } })
    .toArray();
  console.log(
    'admin emails:',
    admins.map((a) => a.email)
  );
};

run()
  .then(async () => {
    await mongoose.connection.close();
    process.exit(0);
  })
  .catch(async (err) => {
    console.error(err.message);
    await mongoose.connection.close().catch(() => {});
    process.exit(1);
  });
