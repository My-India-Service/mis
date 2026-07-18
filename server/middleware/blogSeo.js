const fs = require('fs');
const path = require('path');
const Blog = require('../models/Blog');

const SITE_NAME = 'My India Service';
const DEFAULT_IMAGE_PATH = '/images/logo my india 22-01.jpg';
const DEFAULT_DESCRIPTION =
  'My India Service — digital marketing, web development, and business growth services across India.';

const getSiteUrl = () => (process.env.SITE_URL || process.env.CLIENT_URL || 'https://myindiaservice.com').replace(/\/$/, '');

const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const truncate = (text, max = 160) => {
  if (!text) return '';
  const clean = String(text).replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).trim()}…`;
};

const absoluteUrl = (siteUrl, pathOrUrl) => {
  if (!pathOrUrl) return `${siteUrl}${DEFAULT_IMAGE_PATH}`;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
};

const upsertMetaByName = (html, name, content) => {
  const tag = `<meta name="${name}" content="${escapeHtml(content)}" />`;
  const re = new RegExp(`<meta\\s+name=["']${name}["'][^>]*>`, 'i');
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
};

const upsertMetaByProperty = (html, property, content) => {
  const tag = `<meta property="${property}" content="${escapeHtml(content)}" />`;
  const re = new RegExp(`<meta\\s+property=["']${property}["'][^>]*>`, 'i');
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
};

const upsertTitle = (html, title) => {
  if (/<title>[\s\S]*?<\/title>/i.test(html)) {
    return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  }
  return html.replace(/<\/head>/i, `    <title>${escapeHtml(title)}</title>\n  </head>`);
};

const upsertCanonical = (html, href) => {
  const tag = `<link rel="canonical" href="${escapeHtml(href)}" />`;
  const re = /<link\s+rel=["']canonical["'][^>]*>/i;
  if (re.test(html)) return html.replace(re, tag);
  return html.replace(/<\/head>/i, `    ${tag}\n  </head>`);
};

const injectBlogMeta = (html, blog, siteUrl) => {
  const title = `${blog.title} | ${SITE_NAME}`;
  const description = truncate(blog.excerpt || blog.content) || DEFAULT_DESCRIPTION;
  const canonical = `${siteUrl}/blogs/${blog.slug}`;
  const image = absoluteUrl(siteUrl, blog.image || DEFAULT_IMAGE_PATH);

  let out = html;
  out = upsertTitle(out, title);
  out = upsertMetaByName(out, 'description', description);
  out = upsertCanonical(out, canonical);
  out = upsertMetaByProperty(out, 'og:site_name', SITE_NAME);
  out = upsertMetaByProperty(out, 'og:type', 'article');
  out = upsertMetaByProperty(out, 'og:title', title);
  out = upsertMetaByProperty(out, 'og:description', description);
  out = upsertMetaByProperty(out, 'og:url', canonical);
  out = upsertMetaByProperty(out, 'og:image', image);
  out = upsertMetaByName(out, 'twitter:card', 'summary_large_image');
  out = upsertMetaByName(out, 'twitter:title', title);
  out = upsertMetaByName(out, 'twitter:description', description);
  out = upsertMetaByName(out, 'twitter:image', image);
  return out;
};

const notFoundHtml = (siteUrl) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Blog not found | ${SITE_NAME}</title>
  <meta name="robots" content="noindex, nofollow" />
  <meta name="description" content="This blog post could not be found." />
</head>
<body style="font-family: system-ui, sans-serif; max-width: 40rem; margin: 4rem auto; padding: 0 1rem;">
  <h1>Blog not found</h1>
  <p>The post you requested does not exist or is not published.</p>
  <p><a href="${escapeHtml(siteUrl)}/blogs">Back to blogs</a></p>
</body>
</html>`;

/**
 * Express middleware: for GET /blogs/:slug inject SEO meta into SPA index.html.
 * Unknown / unpublished slugs get HTTP 404.
 */
const createBlogSeoMiddleware = (clientDist) => {
  const indexPath = path.join(clientDist, 'index.html');
  let cachedIndex = null;

  const readIndex = () => {
    if (cachedIndex && process.env.NODE_ENV === 'production') return cachedIndex;
    cachedIndex = fs.readFileSync(indexPath, 'utf8');
    return cachedIndex;
  };

  return async (req, res, next) => {
    if (req.method !== 'GET') return next();

    const match = req.path.match(/^\/blogs\/([^/]+)\/?$/);
    if (!match) return next();

    const slug = decodeURIComponent(match[1]).toLowerCase();
    if (!slug || slug.includes('.')) return next();

    const siteUrl = getSiteUrl();

    try {
      const blog = await Blog.findOne({ slug, published: true }).lean();
      if (!blog) {
        res.status(404).type('html').send(notFoundHtml(siteUrl));
        return;
      }

      const html = injectBlogMeta(readIndex(), blog, siteUrl);
      res.status(200).type('html').send(html);
    } catch (err) {
      console.error('Blog SEO middleware error:', err.message);
      next();
    }
  };
};

module.exports = { createBlogSeoMiddleware };
