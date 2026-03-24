export default async function sitemap() {
  const baseUrl = 'https://www.thehardwarebox.com';

  // Basic pages
  const staticPages = [
    '',
    '/about-us',
    '/contact-us',
    '/faq',
    '/blog',
    '/collections',
    '/category',
    '/product',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));

  return [...staticPages];
}
