const express = require('express');
const Blog = require('../models/Blog');

const router = express.Router();

const getSiteUrl = () => (process.env.SITE_URL || 'https://myindiaservice.com').replace(/\/$/, '');

// Public, indexable static routes with crawl hints
const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blogs', changefreq: 'daily', priority: '0.9' },
  { path: '/events', changefreq: 'weekly', priority: '0.8' },
  { path: '/faq', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'yearly', priority: '0.6' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/refund', changefreq: 'yearly', priority: '0.3' },
];

const escapeXml = (value) =>
  String(value).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '&':
        return '&amp;';
      case "'":
        return '&apos;';
      case '"':
        return '&quot;';
      default:
        return c;
    }
  });

const buildUrlEntry = ({ loc, lastmod, changefreq, priority }) => {
  const parts = [`    <loc>${escapeXml(loc)}</loc>`];
  if (lastmod) parts.push(`    <lastmod>${lastmod}</lastmod>`);
  if (changefreq) parts.push(`    <changefreq>${changefreq}</changefreq>`);
  if (priority) parts.push(`    <priority>${priority}</priority>`);
  return `  <url>\n${parts.join('\n')}\n  </url>`;
};

router.get('/sitemap.xml', async (_req, res) => {
  try {
    const siteUrl = getSiteUrl();
    const urls = STATIC_ROUTES.map((route) =>
      buildUrlEntry({
        loc: `${siteUrl}${route.path}`,
        changefreq: route.changefreq,
        priority: route.priority,
      })
    );

    try {
      const blogs = await Blog.find({ published: true }).select('slug updatedAt createdAt').sort({ createdAt: -1 });
      blogs.forEach((blog) => {
        urls.push(
          buildUrlEntry({
            loc: `${siteUrl}/blogs/${blog.slug}`,
            lastmod: (blog.updatedAt || blog.createdAt || new Date()).toISOString().split('T')[0],
            changefreq: 'monthly',
            priority: '0.7',
          })
        );
      });
    } catch (dbErr) {
      // If DB is unavailable, still return the static sitemap
      console.error('Sitemap blog fetch error:', dbErr.message);
    }

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join(
      '\n'
    )}\n</urlset>`;

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  } catch (error) {
    res.status(500).send('Failed to generate sitemap');
  }
});

router.get('/robots.txt', (_req, res) => {
  const siteUrl = getSiteUrl();
  const body = [
    'User-agent: *',
    'Allow: /',
    '',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /book-call',
    'Disallow: /project-inquiry',
    '',
    `Sitemap: ${siteUrl}/sitemap.xml`,
    '',
  ].join('\n');

  res.header('Content-Type', 'text/plain');
  res.send(body);
});

module.exports = router;
