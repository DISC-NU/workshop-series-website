/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "docs",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
