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
      const data = await response.json();

      // ✅ FIX: direct mapping
      dynamicPages = data.map((item) => ({
        url: item.url,
        lastModified: item.lastmod
          ? new Date(item.lastmod).toISOString()
          : new Date().toISOString(),
        changeFrequency: item.changefreq || 'weekly',
        priority: item.priority || 0.5,
      }));
    }
  } catch (error) {
    console.error("Sitemap fetch error:", error);
  }

  // Static pages
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