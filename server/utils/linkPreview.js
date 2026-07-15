function normalizeUrl(url) {
  const trimmed = (url || '').trim();
  if (!trimmed) return '';
  return trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
}

function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)));
}

function resolveUrl(imgUrl, baseUrl) {
  if (!imgUrl) return null;
  let clean = decodeHtmlEntities(imgUrl.trim());
  if (clean.startsWith('//')) clean = `https:${clean}`;
  if (clean.startsWith('http')) return clean;
  try {
    return new URL(clean, baseUrl).href;
  } catch {
    return null;
  }
}

function getMeta(html, prop) {
  const patterns = [
    new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, 'i'),
    new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${prop}["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return null;
}

function getLinkHref(html, rel) {
  const patterns = [
    new RegExp(`<link[^>]+rel=["'][^"']*${rel}[^"']*["'][^>]+href=["']([^"']+)["']`, 'i'),
    new RegExp(`<link[^>]+href=["']([^"']+)["'][^>]+rel=["'][^"']*${rel}[^"']*["']`, 'i'),
  ];
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return decodeHtmlEntities(match[1]);
  }
  return null;
}

function screenshotFallbacks(url) {
  const encoded = encodeURIComponent(url);
  return [
    `https://image.thum.io/get/width/800/crop/600/noanimate/${url}`,
    `https://s.wordpress.com/mshots/v1/${encoded}?w=800`,
    `https://api.microlink.io/?url=${encoded}&screenshot=true&meta=false&embed=screenshot.url`,
  ];
}

async function fetchHtml(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15000);

  try {
    const res = await fetch(url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Cache-Control': 'no-cache',
      },
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return { html: await res.text(), finalUrl: res.url || url };
  } catch (err) {
    clearTimeout(timeout);
    throw err;
  }
}

async function fetchWordPressPreview(baseUrl) {
  try {
    const origin = new URL(baseUrl).origin;

    // Prefer latest post featured image (full-size preview)
    try {
      const postsRes = await fetch(`${origin}/wp-json/wp/v2/posts?per_page=1&_embed=1&status=publish`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(10000),
      });
      if (postsRes.ok) {
        const posts = await postsRes.json();
        const post = posts?.[0];
        const media = post?._embedded?.['wp:featuredmedia']?.[0];
        const featured =
          media?.source_url ||
          media?.media_details?.sizes?.large?.source_url ||
          media?.media_details?.sizes?.medium_large?.source_url ||
          media?.media_details?.sizes?.full?.source_url;

        if (featured) {
          return {
            previewImage: resolveUrl(featured, origin),
            title: post?.title?.rendered
              ? decodeHtmlEntities(String(post.title.rendered).replace(/<[^>]+>/g, ''))
              : null,
            websiteUrl: baseUrl,
            source: 'wp-post',
          };
        }
      }
    } catch {
      // ignore and try site info
    }

    // Site icon from wp-json root
    try {
      const siteRes = await fetch(`${origin}/wp-json/`, {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
          Accept: 'application/json',
        },
        signal: AbortSignal.timeout(8000),
      });
      if (siteRes.ok) {
        const site = await siteRes.json();
        const icon =
          site?.site_icon_url ||
          site?.icon?.img ||
          (Array.isArray(site?.icons) ? site.icons.find((i) => i?.href)?.href : null);

        if (icon) {
          return {
            previewImage: resolveUrl(icon, origin),
            title: site?.name || site?.description || null,
            websiteUrl: baseUrl,
            source: 'wp-json',
          };
        }

        return {
          previewImage: null,
          title: site?.name || null,
          websiteUrl: baseUrl,
          source: 'wp-json',
        };
      }
    } catch {
      // not WordPress or blocked
    }
  } catch {
    // invalid URL
  }
  return null;
}

async function fetchLinkPreview(url) {
  const normalizedUrl = normalizeUrl(url);
  if (!normalizedUrl) {
    throw new Error('Invalid URL');
  }

  const fallbacks = screenshotFallbacks(normalizedUrl);
  let title = null;
  let previewImage = null;
  let finalUrl = normalizedUrl;
  let source = 'screenshot';

  // 1) Try HTML meta tags (og:image / twitter:image)
  try {
    const { html, finalUrl: landed } = await fetchHtml(normalizedUrl);
    finalUrl = landed || normalizedUrl;

    const og =
      getMeta(html, 'og:image') ||
      getMeta(html, 'og:image:secure_url') ||
      getMeta(html, 'twitter:image') ||
      getMeta(html, 'twitter:image:src');

    previewImage = resolveUrl(og, finalUrl);
    if (previewImage) source = 'og:image';

    title =
      getMeta(html, 'og:title') ||
      getMeta(html, 'twitter:title') ||
      (() => {
        const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
        return m ? decodeHtmlEntities(m[1].trim()) : null;
      })();

    // icons only as weak fallback — often too small for success story cards
    if (!previewImage) {
      const icon = resolveUrl(
        getLinkHref(html, 'apple-touch-icon') || getLinkHref(html, 'icon'),
        finalUrl
      );
      if (icon && /apple-touch-icon/i.test(icon)) {
        previewImage = icon;
        source = 'apple-touch-icon';
      }
    }
  } catch (err) {
    console.warn('HTML preview fetch failed:', err.message);
  }

  // 2) WordPress REST API — featured image from latest post
  if (!previewImage || source === 'apple-touch-icon') {
    const wpPreview = await fetchWordPressPreview(finalUrl);
    if (wpPreview?.previewImage && wpPreview.source === 'wp-post') {
      previewImage = wpPreview.previewImage;
      title = title || wpPreview.title;
      source = wpPreview.source;
      console.log('WordPress preview source:', wpPreview.source);
    } else if (!previewImage && wpPreview?.previewImage) {
      // keep WP icon only if we have nothing else; still prefer screenshot below
      title = title || wpPreview.title;
    }
  }

  // 3) Screenshot fallback — best for WordPress homepage look
  if (!previewImage || source === 'apple-touch-icon' || source === 'wp-json') {
    previewImage = fallbacks[0];
    source = 'screenshot';
  }

  console.log(`Preview for ${finalUrl} → ${source}`);

  return {
    previewImage,
    title: title || null,
    websiteUrl: finalUrl,
    fallbacks,
    source,
  };
}

module.exports = { fetchLinkPreview, normalizeUrl };
