const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, default: '' },
    content: { type: String, required: true },
    metaTitle: { type: String, default: '', trim: true },
    metaDescription: { type: String, default: '', trim: true },
    image: { type: String, default: '' },
    author: { type: String, default: 'My India Service' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Blog', blogSchema);
