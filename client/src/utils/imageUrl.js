/**
 * Route external images through our proxy so WordPress/CDN
 * hotlink protection doesn't break previews in the browser.
 * Cloudinary and other trusted CDNs are used directly.
 */
export function getDisplayImage(url) {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('data:')) return url;
  if (/^https?:\/\/res\.cloudinary\.com\//i.test(url)) return url;
  if (/^https?:\/\//i.test(url)) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}

export function isUploadedImage(url) {
  if (!url) return false;
  return url.startsWith('/uploads/') || /res\.cloudinary\.com/i.test(url);
}
