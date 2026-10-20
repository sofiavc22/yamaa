export function GET() {
  return new Response(
    `User-agent: *\nAllow: /\nDisallow: /auth/\nDisallow: /login\nDisallow: /registro\n\nSitemap: https://www.clasedeyoga.com.mx/sitemap.xml\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  );
}
