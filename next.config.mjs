/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  transpilePackages: ['three'],
  async rewrites() {
    return [
      {
        source: '/scene.bin',
        destination: '/model/3d/the_great_drawing_room/scene.bin',
      },
      {
        source: '/textures/:path*',
        destination: '/model/3d/the_great_drawing_room/textures/:path*',
      },
      {
        source: '/the_great_drawing_room/:path*',
        destination: '/model/3d/the_great_drawing_room/:path*',
      },
      {
        source: '/api/:path*',
        destination: '/api/index.py',
      },
      {
        source: '/__zau/:path*',
        destination: '/api/index.py',
      },
    ];
  },
  webpack: (config) => {
    return config;
  },
};

export default nextConfig;
