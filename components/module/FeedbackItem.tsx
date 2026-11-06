"use client";

import { useState } from "react";
import { Check, MessageSquareQuote } from "lucide-react";
import { apiFeedbackRead } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function FeedbackItem({ id, body, context, date, unread }: { id: string; body: string; context?: string; date: string; unread: boolean }) {
  const [isUnread, setUnread] = useState(unread);
  return (
    <li className={cn("flex gap-3 rounded-2xl p-4 ring-1", isUnread ? "bg-sun-soft ring-sun/40" : "bg-card shadow-soft ring-border")}>
      <MessageSquareQuote aria-hidden className={cn("mt-0.5 size-5 shrink-0", isUnread ? "text-amber-700 dark:text-sun" : "text-subtle-foreground")} />
      <div className="min-w-0 flex-1">
        <p className="text-xs text-subtle-foreground">
          {date}
          {context ? ` · ${context}` : ""}
        </p>
        <p className="mt-1 whitespace-pre-wrap text-foreground">{body}</p>
        {isUnread && (
          <Button
            size="sm"
            variant="link"
            className="mt-1 h-auto p-0 text-xs"
            onClick={() => {
              setUnread(false);
              apiFeedbackRead(id).catch(() => setUnread(true));
            }}
          >
            <Check aria-hidden /> Mark as read
          </Button>
        )}
      </div>
    </li>
  );
}
