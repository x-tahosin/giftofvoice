/**
 * Utility to resolve asset URLs correctly across any deployment environment
 * (e.g., custom domains, GitHub Pages subpaths, Vercel root paths).
 */
export function getAssetUrl(path) {
  if (!path) return '';
  if (path.startsWith('data:') || path.startsWith('blob:') || path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  if (base === './' || base === '') {
    return `./${clean}`;
  }
  return base.endsWith('/') ? `${base}${clean}` : `${base}/${clean}`;
}
