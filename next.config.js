/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/', destination: '/email' },
      ],
    }
  },
}

module.exports = nextConfig
