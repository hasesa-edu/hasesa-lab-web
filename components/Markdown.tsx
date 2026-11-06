import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { cn } from "@/lib/utils";

// Wide tables scroll sideways instead of stretching the page.
const COMPONENTS = {
  table: ({ node: _node, ...props }: React.ComponentProps<"table"> & { node?: unknown }) => (
    <div className="table-wrap">
      <table {...props} />
    </div>
  ),
};

/** Markdown with GFM tables and KaTeX maths, for content/ files. */
export function Markdown({ children, className, inline }: { children: string; className?: string; inline?: boolean }) {
  return (
    <div className={cn(inline ? "lesson-prose [&>p]:m-0" : "lesson-prose", className)}>
      <ReactMarkdown remarkPlugins={[remarkGfm, remarkMath]} rehypePlugins={[rehypeKatex]} components={COMPONENTS}>
        {children}
      </ReactMarkdown>
    </div>
  );
}
