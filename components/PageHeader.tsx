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
      <div aria-hidden className="absolute -bottom-40 left-1/2 h-72 w-[60rem] -translate-x-1/2 rounded-[50%] bg-signal/20 blur-3xl" />
      <div className="relative mx-auto max-w-5xl px-4 pt-10 pb-8 sm:pt-14 sm:pb-10">
        {eyebrow && (
          <p className="text-sm font-bold text-sun">{eyebrow}</p>
        )}
        <h1 className="font-dial mt-2 text-5xl font-extrabold sm:text-7xl leading-[0.95]">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-base text-deep-foreground/80">{description}</p>}
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
