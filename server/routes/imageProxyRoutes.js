const express = require('express');

const router = express.Router();

/**
 * Proxy remote images so WordPress / CDN hotlink protection
 * and mixed-content issues don't break preview display.
 */
router.get('/', async (req, res) => {
  try {
    const target = req.query.url;
    if (!target) {
      return res.status(400).json({ success: false, message: 'url query param required' });
    }

    let decoded;
    try {
      decoded = decodeURIComponent(target);
    } catch {
      decoded = target;
    }

    if (!/^https?:\/\//i.test(decoded)) {
      return res.status(400).json({ success: false, message: 'Only http/https URLs allowed' });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const upstream = await fetch(decoded, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'image/avif,image/webp,image/apng,image/*,*/*;q=0.8',
        Referer: new URL(decoded).origin,
      },
    });
    clearTimeout(timeout);

    if (!upstream.ok) {
      return res.status(upstream.status).json({ success: false, message: 'Failed to fetch image' });
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg';
    if (!contentType.startsWith('image/') && !contentType.includes('octet-stream')) {
      // thum.io / microlink sometimes return HTML error pages
      return res.status(502).json({ success: false, message: 'Remote URL is not an image' });
    }

    const buffer = Buffer.from(await upstream.arrayBuffer());
    res.setHeader('Content-Type', contentType);
    res.setHeader('Cache-Control', 'public, max-age=86400');
    res.send(buffer);
  } catch (error) {
    console.error('Image proxy error:', error.message);
    res.status(500).json({ success: false, message: 'Image proxy failed' });
  }
});

module.exports = router;
