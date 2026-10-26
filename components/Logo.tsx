import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The Hasesa "peek": two amber eyes looking over a teal line, one a little higher,
 * like a head tilting at something curious. `tone="light"` swaps the teal for a
 * pale mint so it reads on deep-teal backgrounds.
 */
export function LogoMark({
  size = 40,
  tone = "brand",
  className = "",
}: {
  /** Width in px. The mark is wide and short (about 2.4 : 1). */
  size?: number;
  tone?: "brand" | "light";
  className?: string;
}) {
  const ink = tone === "light" ? "var(--primary-soft)" : "var(--primary)";
  return (
    <svg
      width={size}
      height={Math.round(size / 2.4)}
      viewBox="64 194 384 160"
      overflow="visible"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M96 330H416" stroke={ink} strokeWidth="48" strokeLinecap="round" />
      {/* Eyes rise a little on hover: peeking higher. */}
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-4">
        <circle cx="214" cy="270" r="38" fill="var(--sun)" />
        <circle cx="306" cy="246" r="38" fill="var(--sun)" />
      </g>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex min-h-10 items-center gap-2 group", className)}>
      <LogoMark size={40} className="mt-1" />
      <span className="font-heading text-lg leading-none font-extrabold tracking-tight text-foreground">{BRAND}</span>
    </Link>
  );
}
