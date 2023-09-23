/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'iaznggowygocjkwjmrtj.supabase.co',
      'https://images.pexels.com/photos',
      'images.pexels.com',
      'files.stripe.com',
    ],
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
