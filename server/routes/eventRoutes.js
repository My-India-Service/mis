const express = require('express');
const Event = require('../models/Event');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (req.query.admin === 'true') return auth(req, res, next);
  next();
}, async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { published: true };
    const events = await Event.find(filter).sort({ eventDate: 1 });
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const event = await Event.findOne({ _id: req.params.id, published: true });
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, description, image, eventDate, location, published } = req.body;
    if (!title || !description || !eventDate) {
      return res.status(400).json({ success: false, message: 'Title, description and event date required' });
    }

    const event = await Event.create({
      title,
      description,
      image: image || '',
      eventDate,
      location: location || '',
      published: published ?? false,
    });

    res.status(201).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });

    const { title, description, image, eventDate, location, published } = req.body;
    if (title !== undefined) event.title = title;
    if (description !== undefined) event.description = description;
    if (image !== undefined) event.image = image;
    if (eventDate !== undefined) event.eventDate = eventDate;
    if (location !== undefined) event.location = location;
    if (published !== undefined) event.published = published;

    await event.save();
    res.json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ success: false, message: 'Event not found' });
    res.json({ success: true, message: 'Event deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
