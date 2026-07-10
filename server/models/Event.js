const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    image: { type: String, default: '' },
    eventDate: { type: Date, required: true },
    location: { type: String, default: '' },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);
