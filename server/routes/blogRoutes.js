const express = require('express');
const Blog = require('../models/Blog');
const auth = require('../middleware/auth');
const { requirePermission, authWithPermission } = auth;
const slugify = require('../utils/slugify');

const router = express.Router();

router.get('/', async (req, res, next) => {
  if (req.query.admin === 'true') return authWithPermission('manage_blogs')(req, res, next);
  next();
}, async (req, res) => {
  try {
    const filter = req.query.admin === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, published: true });
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post('/', auth, requirePermission('manage_blogs'), async (req, res) => {
  try {
    const { title, excerpt, content, image, author, published } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content required' });
    }

    let slug = slugify(title);
    const existing = await Blog.findOne({ slug });
    if (existing) slug = `${slug}-${Date.now()}`;

    const blog = await Blog.create({
      title,
      slug,
      excerpt: excerpt || '',
      content,
      image: image || '',
      author: author || 'My India Service',
      published: published ?? false,
    });

    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/:id', auth, requirePermission('manage_blogs'), async (req, res) => {
  try {
    const { title, excerpt, content, image, author, published } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });

    if (title) {
      const titleChanged = title !== blog.title;
      blog.title = title;
      if (titleChanged) {
        let slug = slugify(title);
        const existing = await Blog.findOne({ slug, _id: { $ne: blog._id } });
        if (existing) slug = `${slug}-${Date.now()}`;
        blog.slug = slug;
      }
    }
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (content !== undefined) blog.content = content;
    if (image !== undefined) blog.image = image;
    if (author !== undefined) blog.author = author;
    if (published !== undefined) blog.published = published;

    await blog.save();
    res.json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.delete('/:id', auth, requirePermission('manage_blogs'), async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
