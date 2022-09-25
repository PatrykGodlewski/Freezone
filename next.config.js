/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['cdn1.epicgames.com', 'cdn.akamai.steamstatic.com'],
  },
  i18n: {
    locales: ['en-US', 'pl'],
    defaultLocale: 'en-US',
  },
};

module.exports = nextConfig;
