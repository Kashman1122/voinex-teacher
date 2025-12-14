/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  
  // Reduce memory usage during build
  experimental: {
    workerThreads: false,
    cpus: 1
  },
  
  // If using webpack
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
}

module.exports = nextConfig