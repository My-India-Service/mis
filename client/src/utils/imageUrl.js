/**
 * Route external images through our proxy so WordPress/CDN
 * hotlink protection doesn't break previews in the browser.
 */
export function getDisplayImage(url) {
  if (!url) return '';
  if (url.startsWith('/') || url.startsWith('data:')) return url;
  if (/^https?:\/\//i.test(url)) {
    return `/api/image-proxy?url=${encodeURIComponent(url)}`;
  }
  return url;
}
