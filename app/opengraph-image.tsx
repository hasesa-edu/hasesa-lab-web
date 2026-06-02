import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hasesa — Quality Education for Ethiopian High Schools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background:
            "linear-gradient(135deg, #042f2e 0%, #0d9488 60%, #14b8a6 100%)",
          padding: "64px",
          color: "#f5fffd",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Logo + brand name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: 22,
              background: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            {/* book + spark mark, simplified */}
            <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
              <path
                d="M8 13.5c3.2-1.2 6.8-1.2 10 0v15.5c-3.2-1.2-6.8-1.2-10 0V13.5Z"
                fill="#0d9488"
              />
              <path
                d="M22 13.5c3.2-1.2 6.8-1.2 10 0v15.5c-3.2-1.2-6.8-1.2-10 0V13.5Z"
                fill="#0d9488"
              />
              <rect x="19.4" y="13" width="1.2" height="16.6" rx="0.6" fill="#0d9488" opacity="0.55" />
              <path
                d="M20 4.4l1.05 2.55L23.6 8l-2.55 1.05L20 11.6l-1.05-2.55L16.4 8l2.55-1.05L20 4.4Z"
                fill="#f59e0b"
              />
            </svg>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>
              Hasesa
            </div>
            <div
              style={{
                fontSize: 16,
                opacity: 0.8,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                marginTop: 4,
              }}
            >
              Personal AI Tutor
            </div>
          </div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 80,
            fontSize: 76,
            fontWeight: 800,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
          }}
        >
          Don't memorize. Do it. Learn your way.
        </div>

        {/* Subhead */}
        <div
          style={{
            marginTop: 28,
            fontSize: 30,
            lineHeight: 1.35,
            opacity: 0.92,
            maxWidth: 980,
            fontWeight: 400,
          }}
        >
          An at-home experiment for every lesson, plus a tutor that learns at your pace.
        </div>

        {/* Footer row */}
        <div
          style={{
            position: "absolute",
            bottom: 56,
            left: 64,
            right: 64,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            fontSize: 22,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "rgba(255,255,255,0.14)",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "8px 16px",
              borderRadius: 999,
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            <div style={{ width: 8, height: 8, borderRadius: 999, background: "#f59e0b" }} />
            Free during pilot
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
