/** @type {import('next').NextConfig} */
const backendInternalUrl = process.env.API_INTERNAL_URL || 'http://localhost:5000';

const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${backendInternalUrl}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
