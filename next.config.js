/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/agency' },
      ],
    }
  },
}

module.exports = nextConfig
