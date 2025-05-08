/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // If testing locally, update this to your local frontend URL
    BASE_URL: "http://hardware.in-sourceit.com/", // Update based on your Next.js development URL
    
    // Keep the API URLs pointing to your local backend
    API_PROD_URL: "http://api.in-sourceit.com/api", // Local Laravel API URL
    storageURL: "https://api.in-sourceit.com/", // Local Laravel Storage URL
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.in-sourceit.com",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  // Removing custom CSS/SCSS configuration to use built-in support
  webpack: (config) => {
    // If additional custom loaders are necessary, keep those, but remove CSS/SCSS rules
    config.module.rules = config.module.rules.filter(
      (rule) =>
        !(
          rule.test &&
          (rule.test.toString().includes(".scss") ||
            rule.test.toString().includes(".css"))
        )
    );

    return config;
  },
};

export default nextConfig;
