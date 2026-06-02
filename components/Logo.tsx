import Link from "next/link";

export function LogoMark({ size = 28, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <rect x="1.5" y="1.5" width="37" height="37" rx="10" fill="rgb(var(--brand))" />
      {/* Open book — two pages meeting at the spine */}
      <path
        d="M8 13.5c3.2-1.2 6.8-1.2 10 0v15.5c-3.2-1.2-6.8-1.2-10 0V13.5Z"
        fill="rgb(var(--brand-on))"
        fillOpacity="0.95"
      />
      <path
        d="M22 13.5c3.2-1.2 6.8-1.2 10 0v15.5c-3.2-1.2-6.8-1.2-10 0V13.5Z"
        fill="rgb(var(--brand-on))"
        fillOpacity="0.95"
      />
      {/* Spine */}
      <rect x="19.4" y="13" width="1.2" height="16.6" rx="0.6" fill="rgb(var(--brand-on))" fillOpacity="0.55" />
      {/* Amber spark above */}
      <path
        d="M20 4.4l1.05 2.55L23.6 8l-2.55 1.05L20 11.6l-1.05-2.55L16.4 8l2.55-1.05L20 4.4Z"
        fill="#f59e0b"
      />
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={"inline-flex items-center gap-2.5 group " + className}>
      <LogoMark size={28} className="transition group-hover:scale-105" />
      <span className="flex flex-col leading-none">
        <span className="font-semibold text-[15px] tracking-tight text-ink">
          Hasesa
        </span>
        <span className="hidden md:block text-[10px] uppercase tracking-[0.14em] text-ink-subtle mt-0.5">
          Personal AI Tutor
        </span>
      </span>
    </Link>
  );
}
