/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'https://backend-kc92.onrender.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  swcMinify: true,
}

module.exports = nextConfig