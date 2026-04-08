/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-domain.com'],
    formats: ['image/avif', 'image/webp'],
  },
  compress: true,
  swcMinify: true,
}

module.exports = nextConfig