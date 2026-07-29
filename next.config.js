/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Logos/screenshots — no need to generate 3840-wide variants.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    // Baseline security headers applied to every response.
    // CSP allows 'unsafe-inline' scripts because the app ships an inline theme
    // bootstrap and Next.js hydration scripts; tighten to a nonce-based policy
    // via middleware if stricter script control is needed.
    const securityHeaders = [
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
      {
        key: "Strict-Transport-Security",
        value: "max-age=63072000; includeSubDomains; preload",
      },
      {
        key: "Content-Security-Policy",
        value: [
          "default-src 'self'",
          "script-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob: https:",
          "font-src 'self' data:",
          "connect-src 'self'",
          "frame-ancestors 'none'",
          "base-uri 'self'",
          "form-action 'self'",
          "object-src 'none'",
        ].join("; "),
      },
    ];
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
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
