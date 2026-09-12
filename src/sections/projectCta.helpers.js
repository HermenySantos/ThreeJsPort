/**
 * Honest project CTA copy from a URL.
 * @param {string | null | undefined} href
 * @returns {null | 'View repo' | 'Visit site'}
 */
export const getProjectCtaLabel = (href) => {
  if (href == null) return null;

  const value = String(href).trim();
  if (!value || value === '#') return null;

  let url;
  try {
    url = new URL(value);
  } catch {
    return null;
  }

  if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;

  const host = url.hostname.replace(/^www\./, '').toLowerCase();

  if (host === 'github.com') {
    const segments = url.pathname.split('/').filter(Boolean);
    // /owner/repo[/...] is a repository; /owner is a profile (not a demo)
    return segments.length >= 2 ? 'View repo' : null;
  }

  return 'Visit site';
};
