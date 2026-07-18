const express = require('express');
const multer = require('multer');
const auth = require('../middleware/auth');
const { requirePermission } = auth;
const { uploadImage, isConfigured } = require('../config/cloudinary');

const router = express.Router();

const ALLOWED_TYPES = {
  'success-stories': 'success-stories',
  blogs: 'blogs',
  events: 'events',
};

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only image files are allowed'));
  },
});

const handleUpload = (req, res) => {
  const folder = ALLOWED_TYPES[req.params.type];
  if (!folder) {
    return res.status(400).json({ success: false, message: 'Invalid upload type' });
  }

  if (!isConfigured()) {
    return res.status(500).json({
      success: false,
      message: 'Cloudinary is not configured on the server',
    });
  }

  upload.single('image')(req, res, async (err) => {
    if (err) {
      const message = err.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5MB or smaller' : err.message;
      return res.status(400).json({ success: false, message });
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file provided' });
    }

    try {
      const result = await uploadImage(req.file.buffer, { folder });
      res.json({
        success: true,
        data: {
          url: result.secure_url,
          publicId: result.public_id,
        },
      });
    } catch (error) {
      console.error('Cloudinary upload error:', error.message);
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to upload image to Cloudinary',
      });
    }
  });
};

router.post('/success-story-image', auth, requirePermission('manage_uploads'), (req, res) => {
  req.params.type = 'success-stories';
  handleUpload(req, res);
});

router.post('/:type', auth, requirePermission('manage_uploads'), handleUpload);

module.exports = router;
