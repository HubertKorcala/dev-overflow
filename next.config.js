/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    mdxRs: true,
    serverComponentsExternalPackages: ["mongoose"],
  },
  images: {
    remotePatterns: [
      {
        protocol: `https`,
        hostname: `*`,
      },
      {
        protocol: `https`,
        hostname: `img.clerk.com`,
      },
      {
        protocol: `https`,
        hostname: `vignette2.wikia.nocookie.net`,
      },
    ],
  },
};

module.exports = nextConfig;
