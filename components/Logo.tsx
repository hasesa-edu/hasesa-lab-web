import Link from "next/link";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * The Hasesa sprout: a teal stem with an outlined leaf and an amber leaf.
 * `tone="light"` swaps the teal for a pale mint so it reads on deep-teal backgrounds.
 */
export function LogoMark({
  size = 28,
  tone = "brand",
  className = "",
}: {
  size?: number;
  tone?: "brand" | "light";
  className?: string;
}) {
  const ink = tone === "light" ? "var(--primary-soft)" : "var(--primary)";
  return (
    <svg
      width={size}
      height={size}
      viewBox="96 104 320 320"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path d="M256 424V250" stroke={ink} strokeWidth="44" />
      <path d="M256 262C256 184 204 136 128 136C128 214 180 262 256 262Z" stroke={ink} strokeWidth="40" />
      <path d="M256 262C256 184 308 136 384 136C384 214 332 262 256 262Z" fill="var(--sun)" />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex min-h-10 items-center gap-2 group", className)}>
      <LogoMark size={28} className="transition group-hover:-rotate-6" />
      <span className="font-heading text-lg leading-none font-extrabold tracking-tight text-foreground">{BRAND}</span>
    </Link>
  );
}
