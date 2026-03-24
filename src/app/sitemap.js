const baseUrl = 'https://www.thehardwarebox.com';
const apiUrl = 'https://hardware.sparccpk.org/api';

export const revalidate = 3600;

export default async function sitemap() {
  let dynamicPages = [];

  try {
    const response = await fetch(`${apiUrl}/sitemap`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const xmlText = await response.text(); // ✅ JSON nahi, text lo

      const urlMatches = [...xmlText.matchAll(/<url>([\s\S]*?)<\/url>/g)];

      dynamicPages = urlMatches
        .map((match) => {
          const block = match[1];
          const loc = block.match(/<loc>(.*?)<\/loc>/)?.[1]?.trim();
          const lastmod = block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1]?.trim();
          const changefreq = block.match(/<changefreq>(.*?)<\/changefreq>/)?.[1]?.trim();
          const priority = block.match(/<priority>(.*?)<\/priority>/)?.[1]?.trim();

          if (!loc) return null;

          return {
            url: loc,
            lastModified: lastmod
              ? new Date(lastmod).toISOString()
              : new Date().toISOString(),
            changeFrequency: changefreq || 'weekly',
            priority: priority ? parseFloat(priority) : 0.5,
          };
        })
        .filter(Boolean); // null entries hata do

      console.log(`✅ Sitemap: ${dynamicPages.length} dynamic URLs loaded`);
    }
  } catch (error) {
    console.error('❌ Sitemap fetch error:', error);
  }

  const staticPages = [
    '',
    '/about-us',
    '/contact-us',
    '/faq',
    '/blog',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticPages, ...dynamicPages];
}