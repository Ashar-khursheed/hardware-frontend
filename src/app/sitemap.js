const baseUrl = 'https://www.thehardwarebox.com';
const apiUrl = 'https://hardware.sparccpk.org/api';

/**
 * Helper function to fetch all data from a paginated API endpoint
 */
async function fetchAllData(endpoint) {
  let allData = [];
  let currentPage = 1;
  let lastPage = 1;

  try {
    do {
      // status=1 means active items
      const url = `${apiUrl}/${endpoint}?status=1&paginate=100&page=${currentPage}`;
      const response = await fetch(url, { next: { revalidate: 3600 } }); // Cache for 1 hour
      
      if (!response.ok) break;
      
      const json = await response.json();
      
      // Standard Laravel pagination structure: json.data.data is the array, json.data.last_page is total pages
      const items = json?.data?.data || [];
      allData = [...allData, ...items];
      
      lastPage = json?.data?.last_page || 1;
      currentPage++;
      
    } while (currentPage <= lastPage);
  } catch (error) {
    console.error(`Error fetching dynamic sitemap data for ${endpoint}:`, error);
  }
  
  return allData;
}

export default async function sitemap() {
  // Fetch everything in parallel
  const [products, categories, blogs] = await Promise.all([
    fetchAllData('product'),
    fetchAllData('category'),
    fetchAllData('blog'),
  ]);

  // 1. Static Pages
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

  // 2. Dynamic Categories
  const categoryPages = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(cat.updated_at || new Date()).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  // 3. Dynamic Products
  const productPages = products.map((prod) => ({
    url: `${baseUrl}/product/${prod.slug}`,
    lastModified: new Date(prod.updated_at || new Date()).toISOString(),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // 4. Dynamic Blogs
  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updated_at || new Date()).toISOString(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...blogPages];
}
