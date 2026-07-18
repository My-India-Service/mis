const express = require('express');
const nodemailer = require('nodemailer');
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const { requirePermission } = auth;

const router = express.Router();

const FORM_LABELS = {
  contact: 'Contact / Inquiry',
  'book-call': 'Book a Call',
  'project-inquiry': 'Project Discussion',
};

const MARKETING_FORM_TYPES = ['book-call', 'project-inquiry'];

const createTransporter = () => {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

const buildEmailBody = (type, data) => {
  const label = FORM_LABELS[type] || 'Inquiry';
  let body = `Form: ${label}\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone || 'N/A'}`;

  if (MARKETING_FORM_TYPES.includes(type)) {
    body += `\nCompany: ${data.company || 'N/A'}`;
    body += `\nDigital Marketing Services of Interest: ${data.servicesInterest || 'N/A'}`;
    body += `\nCurrent Marketing Challenges/Goals: ${data.marketingGoals || 'N/A'}`;
    body += `\nBudget: ${data.budget || 'N/A'}`;
    body += `\nAdditional Comments/Questions: ${data.comments || 'N/A'}`;
  } else {
    body += `\nCountry: ${data.country || 'All'}`;
    body += `\nMessage: ${data.message || 'N/A'}`;
  }

  return body;
};

router.get('/', auth, requirePermission('manage_submissions'), async (req, res) => {
  try {
    const filter = {};
    if (req.query.formType) filter.formType = req.query.formType;

    const submissions = await Contact.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: submissions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      country,
      message,
      formType,
      company,
      servicesInterest,
      marketingGoals,
      budget,
      comments,
    } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: 'Name and email are required.',
      });
    }

    const type = Contact.schema.path('formType').enumValues.includes(formType) ? formType : 'contact';

    if (MARKETING_FORM_TYPES.includes(type) && !phone) {
      return res.status(400).json({
        success: false,
        message: 'Phone number is required.',
      });
    }

    const payload = {
      name,
      email,
      phone: phone || '',
      formType: type,
      country: country || 'All',
      message: message || '',
      company: company || '',
      servicesInterest: servicesInterest || '',
      marketingGoals: marketingGoals || '',
      budget: budget || '',
      comments: comments || '',
    };

    const contact = await Contact.create(payload);

    const emailTo = process.env.EMAIL_TO || 'myindiaservice1@gmail.com';
    const body = buildEmailBody(type, payload);

    const transporter = createTransporter();
    if (transporter) {
      await transporter.sendMail({
        from: process.env.EMAIL_FROM || process.env.SMTP_USER,
        to: emailTo,
        replyTo: email,
        subject: `${FORM_LABELS[type] || 'Inquiry'} - My India Service`,
        text: body,
      });
    }

    res.status(201).json({
      success: true,
      message: 'Thanks we will reach shortly...',
      data: contact,
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Try again! going something wrong...',
    });
  }
});

router.delete('/:id', auth, requirePermission('manage_submissions'), async (req, res) => {
  try {
    const submission = await Contact.findByIdAndDelete(req.params.id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }
    res.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
