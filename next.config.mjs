/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['open.api.nexon.com'], // 여기에 도메인 추가
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'open.api.nexon.com',
        pathname: '/static/maplestory/Character/**',
      },
      {
        protocol: 'https',
        hostname: 'file.nexon.com',
      },
    ],
  },
}

export default nextConfig
