// export default function robots() {
//   return {
//     rules: {
//       userAgent: '*',
//       allow: '/',
//       disallow: '/private/',
//     },
//     sitemap: 'https://www.thehardwarebox.com/sitemap.xml',
//   }
// }
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/private/',

          // Block junk query URLs
          '/*?add-to-cart=',
          '/*?filter_brand=',
          '/*?shop_view=',
          '/*?query_type_brand=',
          '/*?per_page=',
          '/*?orderby=',
          '/*?s=',

          // Block old WordPress pagination
          '/shop/page/',
        ],
      },
    ],
    sitemap: 'https://www.thehardwarebox.com/sitemap.xml',
  }
}
