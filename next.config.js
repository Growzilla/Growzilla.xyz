/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Note: '/' previously rewrote to '/email'. The homepage is now the
  // email-reactivation landing in pages/index.tsx; '/email' stays reachable
  // directly. Re-add a beforeFiles rewrite here to repoint the root again.
}

module.exports = nextConfig
