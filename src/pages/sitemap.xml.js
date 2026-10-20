import studios from '../data/studios.json';

const site = 'https://www.clasedeyoga.com.mx';
const escapeXml = (value) => value.replace(/[<>&'\"]/g, (char) => ({'<':'&lt;','>':'&gt;','&':'&amp;',"'":'&apos;','"':'&quot;'}[char]));

export function GET() {
  const pages = [
    { loc: `${site}/` },
    { loc: `${site}/cdmx` },
    ...studios.map((studio) => ({ loc: `${site}/estudios/${studio.slug}`, lastmod: studio.verifiedAt }))
  ];
  const urls = pages.map(({ loc, lastmod }) => `<url><loc>${escapeXml(loc)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`).join('');
  return new Response(`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
