const { v2: cloudinary } = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const isConfigured = () =>
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET
  );

/**
 * Upload a local file path or buffer to Cloudinary.
 * @param {string|Buffer} source - file path or buffer
 * @param {object} options
 * @param {string} options.folder - subfolder under CLOUDINARY_FOLDER
 * @param {string} [options.publicId]
 */
const uploadImage = (source, { folder, publicId } = {}) => {
  if (!isConfigured()) {
    return Promise.reject(new Error('Cloudinary is not configured. Check server/.env'));
  }

  const baseFolder = process.env.CLOUDINARY_FOLDER || 'mis';
  const fullFolder = folder ? `${baseFolder}/${folder}` : baseFolder;

  const options = {
    folder: fullFolder,
    resource_type: 'image',
    overwrite: false,
  };
  if (publicId) options.public_id = publicId;

  if (Buffer.isBuffer(source)) {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(options, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
      stream.end(source);
    });
  }

  return cloudinary.uploader.upload(source, options);
};

module.exports = {
  cloudinary,
  isConfigured,
  uploadImage,
};
