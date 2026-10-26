import { cn } from "@/lib/utils";

/**
 * Deep-teal band at the top of app pages, with the lab-notebook grid.
 * Put filters or actions in `children`; they sit below the description.
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
    <header className={cn("relative overflow-hidden bg-deep text-deep-foreground", className)}>
      <div aria-hidden className="absolute inset-0 bg-grid text-primary-soft opacity-60" />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 size-72 rounded-full bg-primary/40 blur-3xl"
      />
      <div aria-hidden className="absolute -bottom-32 left-1/4 size-64 rounded-full bg-sun/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
        {eyebrow && (
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sun">{eyebrow}</p>
        )}
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-deep-foreground/80">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
