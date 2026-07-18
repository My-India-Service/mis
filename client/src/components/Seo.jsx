import { Helmet } from 'react-helmet-async';

const SITE_NAME = 'My India Service';
const DEFAULT_DESCRIPTION =
  'My India Service — digital marketing, web development, and business growth services across India.';
const DEFAULT_IMAGE = '/images/logo my india 22-01.jpg';

function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl) return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://myindiaservice.com';
  return `${origin}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

/**
 * Per-page SEO tags (title, description, canonical, Open Graph).
 * Meta keywords are intentionally omitted — search engines ignore them.
 */
function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  type = 'website',
  noindex = false,
  appendSiteName = true,
}) {
  const fullTitle = title
    ? appendSiteName
      ? `${title} | ${SITE_NAME}`
      : title
    : SITE_NAME;
  const canonical =
    path != null
      ? absoluteUrl(path)
      : typeof window !== 'undefined'
        ? window.location.href.split('?')[0]
        : undefined;
  const ogImage = absoluteUrl(image) || absoluteUrl(DEFAULT_IMAGE);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : null}
      {canonical ? <link rel="canonical" href={canonical} /> : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      {ogImage ? <meta property="og:image" content={ogImage} /> : null}
      {canonical ? <meta property="og:url" content={canonical} /> : null}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {ogImage ? <meta name="twitter:image" content={ogImage} /> : null}
    </Helmet>
  );
}

export default Seo;
export { SITE_NAME, DEFAULT_DESCRIPTION, DEFAULT_IMAGE };
