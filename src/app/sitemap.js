const baseUrl = 'https://www.thehardwarebox.com';
const apiUrl = 'https://hardware.sparccpk.org/api';

// This ensures Next.js/Amplify re-generates the sitemap periodically
export const revalidate = 3600; 

export default async function sitemap() {
  let dynamicPages = [];

  try {
    // 1. Fetch from the new dedicated sitemap API
    const response = await fetch(`${apiUrl}/sitemap`, { 
      next: { revalidate: 3600 },
      headers: {
        'Accept': 'application/json'
      }
    });
    
    if (response.ok) {
      const data = await response.json();
      
      /**
       * Hum assume kar rahe hain ke API ka structure kuch is tarah hoga:
       * { data: { products: [...], categories: [...], blogs: [...] } }
       * Ya phir direct array of URLs.
       */
      
      const products = data?.data?.products || [];
      const categories = data?.data?.categories || [];
      const blogs = data?.data?.blogs || [];

      // Map Categories
      const categoryLinks = categories.map((cat) => ({
        url: `${baseUrl}/category/${cat.slug}`,
        lastModified: new Date(cat.updated_at || new Date()).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));

      // Map Products
      const productLinks = products.map((prod) => ({
        url: `${baseUrl}/product/${prod.slug}`,
        lastModified: new Date(prod.updated_at || new Date()).toISOString(),
        changeFrequency: 'daily',
        priority: 0.9,
      }));

      // Map Blogs
      const blogLinks = blogs.map((blog) => ({
        url: `${baseUrl}/blog/${blog.slug}`,
        lastModified: new Date(blog.updated_at || new Date()).toISOString(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));

      dynamicPages = [...categoryLinks, ...productLinks, ...blogLinks];
    }
  } catch (error) {
    console.error("Error fetching dynamic sitemap from /api/sitemap:", error);
  }

  // 2. Static Pages
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
    changeFrequency: 'daily',
    priority: route === '' ? 1.0 : 0.8,
  }));

  return [...staticPages, ...dynamicPages];
}
