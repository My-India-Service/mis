const mongoose = require('mongoose');

const successStorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    challenge: { type: String, default: '' },
    solution: { type: String, default: '' },
    benefits: { type: String, default: '' },
    websiteUrl: { type: String, default: '' },
    previewImage: { type: String, default: '' },
    logoImage: { type: String, default: '' },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model('SuccessStory', successStorySchema);
