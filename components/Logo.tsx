import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The Hasesa "peek": two amber eyes looking over a line, one a little higher,
 * like a head tilting at something curious. The line is ink; `tone="light"`
 * makes it white so it reads on the dark footer.
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
  const ink = tone === "light" ? "#FFFFFF" : "var(--foreground)";
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

export function Logo({ className = "", tone = "brand" }: { className?: string; tone?: "brand" | "light" }) {
  return (
    <Link href="/" aria-label={`${BRAND} home`} className={cn("inline-flex min-h-10 items-center gap-2 group", className)}>
      <LogoMark size={36} tone={tone} className="mt-0.5" />
      <span
        className={cn(
          "font-display text-lg leading-none font-semibold tracking-[-0.02em]",
          tone === "light" ? "text-white" : "text-foreground"
        )}
      >
        {BRAND}
      </span>
    </Link>
  );
}
