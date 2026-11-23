import { ImageResponse } from "next/og";
import { BRAND, MOTTO } from "@/lib/brand";

export const runtime = "edge";
export const alt = `${BRAND} · ${MOTTO}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview in the site's look: paper, ink, a hairline and one teal accent.
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#FAFAF8",
          padding: "72px 80px",
          color: "#13171C",
          fontFamily: "sans-serif",
        }}
      >
        {/* Logo + brand name row */}
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <svg width="84" height="35" viewBox="64 194 384 160" fill="none">
            <path d="M96 330H416" stroke="#13171C" strokeWidth="48" strokeLinecap="round" />
            <circle cx="214" cy="270" r="38" fill="#F59E0B" />
            <circle cx="306" cy="246" r="38" fill="#F59E0B" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: "-0.02em" }}>{BRAND}</div>
        </div>

        {/* Headline */}
        <div
          style={{
            marginTop: 96,
            fontSize: 84,
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            maxWidth: 980,
          }}
        >
          Education for the world of tomorrow.
        </div>

        {/* Footer row: hairline, then the motto and the first program */}
        <div
          style={{
            marginTop: "auto",
            paddingTop: 24,
            borderTop: "1px solid #E4E4DF",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5B6470",
          }}
        >
          <div style={{ display: "flex" }}>{MOTTO}</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#0B7A73", fontWeight: 600 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: "#0B7A73" }} />
            Hasesa Academy · first program
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
