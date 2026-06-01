/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Logos/screenshots — no need to generate 3840-wide variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        // Hashed Next.js build assets are immutable; cache for a year.
        source: "/_next/static/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
      {
        // Partner logos and the hero video / poster rarely change.
        source: "/:asset(partners/.*|hero-demo\\..*|icon\\..*|manifest\\.json)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
