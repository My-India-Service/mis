const mongoose = require('mongoose');

const FORM_TYPES = ['contact', 'book-call', 'project-inquiry'];

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    country: { type: String, default: 'All' },
    message: { type: String, default: '' },
    company: { type: String, default: '' },
    servicesInterest: { type: String, default: '' },
    marketingGoals: { type: String, default: '' },
    budget: { type: String, default: '' },
    comments: { type: String, default: '' },
    formType: { type: String, enum: FORM_TYPES, default: 'contact' },
  },
  { timestamps: true }
);

contactSchema.statics.FORM_TYPES = FORM_TYPES;

module.exports = mongoose.model('Contact', contactSchema);
