import { ImageResponse } from "next/og";
import { BRAND, MOTTO } from "@/lib/brand";

export const runtime = "edge";
export const alt = `${BRAND} · ${MOTTO}`;
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
            "radial-gradient(ellipse at 50% 120%, #14A09855 0%, #0E3B4A 60%)",
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
            {/* Hasesa peek */}
            <svg width="60" height="25" viewBox="64 194 384 160" fill="none">
              <path d="M96 330H416" stroke="#14A098" strokeWidth="48" strokeLinecap="round" />
              <circle cx="214" cy="270" r="38" fill="#f59e0b" />
              <circle cx="306" cy="246" r="38" fill="#f59e0b" />
            </svg>
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em" }}>{BRAND}</div>
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
          Don't memorize. Build it.
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
          Start by doing. Build a radio, control a robot claw, catch food fakers.
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
            Hands-on Academy modules
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
