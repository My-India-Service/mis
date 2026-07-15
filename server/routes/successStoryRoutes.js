const express = require('express');
const SuccessStory = require('../models/SuccessStory');
const auth = require('../middleware/auth');
const { fetchLinkPreview } = require('../utils/linkPreview');

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (req.query.admin === 'true') return auth(req, res, next);
  next();
}, async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { published: true };
    const stories = await SuccessStory.find(filter).sort({ order: 1, createdAt: -1 });
    res.json({ success: true, data: stories });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/preview', auth, async (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ success: false, message: 'Website URL is required' });
    }
    const preview = await fetchLinkPreview(url);
    res.json({ success: true, data: preview });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, challenge, solution, benefits, websiteUrl, previewImage, logoImage, published, order } =
      req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Title is required' });
    }

    let image = previewImage || '';
    let url = websiteUrl || '';

    if (websiteUrl && !previewImage) {
      const preview = await fetchLinkPreview(websiteUrl);
      image = preview.previewImage;
      url = preview.websiteUrl;
    }

    const story = await SuccessStory.create({
      title,
      challenge: challenge || '',
      solution: solution || '',
      benefits: benefits || '',
      websiteUrl: url,
      previewImage: image,
      logoImage: logoImage || '',
      published: published ?? false,
      order: order ?? 0,
    });

    res.status(201).json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const story = await SuccessStory.findById(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });

    const { title, challenge, solution, benefits, websiteUrl, previewImage, logoImage, published, order, refetchPreview } =
      req.body;

    if (title !== undefined) story.title = title;
    if (challenge !== undefined) story.challenge = challenge;
    if (solution !== undefined) story.solution = solution;
    if (benefits !== undefined) story.benefits = benefits;
    if (logoImage !== undefined) story.logoImage = logoImage;
    if (published !== undefined) story.published = published;
    if (order !== undefined) story.order = order;

    if (websiteUrl !== undefined) story.websiteUrl = websiteUrl;

    if (refetchPreview && websiteUrl) {
      const preview = await fetchLinkPreview(websiteUrl);
      story.previewImage = preview.previewImage;
      story.websiteUrl = preview.websiteUrl;
    } else if (previewImage !== undefined) {
      story.previewImage = previewImage;
    }

    await story.save();
    res.json({ success: true, data: story });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const story = await SuccessStory.findByIdAndDelete(req.params.id);
    if (!story) return res.status(404).json({ success: false, message: 'Story not found' });
    res.json({ success: true, message: 'Story deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
