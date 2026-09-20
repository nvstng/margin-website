import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://marginapp.in';

const staticPaths = [
  { path: '/', priority: '1.0' },
  { path: '/learn', priority: '0.8' },
  { path: '/agents', priority: '0.8' },
  { path: '/guides', priority: '0.8' },
  { path: '/blog', priority: '0.8' },
  { path: '/company', priority: '0.5' },
  { path: '/privacy-vault', priority: '0.5' },
  { path: '/terms', priority: '0.3' },
];

function url(path: string, priority: string, lastmod?: Date) {
  const loc = new URL(path, SITE).href;
  const date = lastmod ? `\n    <lastmod>${lastmod.toISOString().slice(0, 10)}</lastmod>` : '';
  return `  <url>\n    <loc>${loc}</loc>${date}\n    <priority>${priority}</priority>\n  </url>`;
}

export const GET: APIRoute = async () => {
  const [posts, guides, recipes] = await Promise.all([
    getCollection('blog'),
    getCollection('guide'),
    getCollection('recipe'),
  ]);

  const entries = [
    ...staticPaths.map((page) => url(page.path, page.priority)),
    ...posts.map((post) => url(`/blog/${post.slug}`, '0.7', post.data.publishedAt)),
    ...guides.map((guide) => url(`/guides/${guide.slug}`, '0.7', guide.data.updatedAt)),
    ...recipes.map((recipe) => url(`/agents/${recipe.slug}`, '0.7', recipe.data.updatedAt)),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join('\n')}\n</urlset>\n`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
