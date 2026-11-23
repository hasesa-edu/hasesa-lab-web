import { cn } from "@/lib/utils";

/**
 * Light header at the top of app pages: a small mono label, the title and an
 * optional description, closed by a hairline. Put filters or actions in
 * `children`; they sit below the description.
 */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={cn("border-b border-border bg-card", className)}>
      <div className="mx-auto max-w-6xl px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
        {eyebrow && (
          <p className="font-mono text-xs tracking-[0.08em] text-muted-foreground uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-3 text-4xl leading-[1.02] font-semibold sm:text-6xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
