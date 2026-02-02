/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // If testing locally, update this to your local frontend URL
    BASE_URL: "https://hardwareapi.in-sourceit.com/", // Update based on your Next.js development URL

    // Keep the API URLs pointing to your local backend
    // API_PROD_URL: "https://hardwareapi.in-sourceit.com/api", // Local Laravel API URL
    // storageURL: "https://hardwareapi.in-sourceit.com/", // Local Laravel Storage URL
    API_PROD_URL: "https://hardwareapi.in-sourceit.com/api", // Local Laravel API URL
    storageURL: "https://hardwareapi.in-sourceit.com", // Local Laravel Storage URL
  },

  // Performance optimizations
  reactStrictMode: true,
  swcMinify: true, // Use SWC for faster minification

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production" ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "hardwareapi.in-sourceit.com",
      },
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
    // Optimize image loading
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
  },

  // Experimental features for better performance
  experimental: {
    // optimizeCss: true, // Disabled: Requires 'npm install critters'
    optimizePackageImports: ['react-icons', 'react-toastify'],
  },

  // Removing custom CSS/SCSS configuration to use built-in support
  webpack: (config, { dev, isServer }) => {
    // If additional custom loaders are necessary, keep those, but remove CSS/SCSS rules
    config.module.rules = config.module.rules.filter(
      (rule) =>
        !(
          rule.test &&
          (rule.test.toString().includes(".scss") ||
            rule.test.toString().includes(".css"))
        )
    );

    // Production optimizations
    if (!dev && !isServer) {
      // Enable module concatenation
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }

    return config;
  },
};

export default nextConfig;
