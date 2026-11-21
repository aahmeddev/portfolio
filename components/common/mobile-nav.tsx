import Link from "next/link";
import * as React from "react";

import { siteConfig } from "@/config/site";
import { useLockBody } from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";

interface MobileNavProps {
  items: any[];
  children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
  useLockBody();

  return (
    <div
      className={cn(
        "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-10 md:hidden bg-background/95 backdrop-blur"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-xl border border-border bg-card p-5 text-card-foreground shadow-xl">
        <Link href="/" className="flex items-center space-x-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/40 font-heading text-sm font-bold text-primary">
            AA
          </span>
          <span className="font-heading text-lg">
            {siteConfig.authorName}
          </span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm gap-1">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2.5 text-sm font-medium hover:bg-muted",
                item.disabled && "cursor-not-allowed opacity-60"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
}
