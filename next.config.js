/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: { unoptimized: true },
  async headers() {
    return [{
      source: '/:path*',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'Content-Security-Policy',
          value: "frame-src 'self' https://demo.readyplayer.me https://*.readyplayer.me;" }
      ]
    }];
  }
};
module.exports = nextConfig;
