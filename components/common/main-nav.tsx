"use client";

import Link from "next/link";
import { usePathname, useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import { Icons } from "@/components/common/icons";
import { MobileNav } from "@/components/common/mobile-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MainNavProps {
  items?: any[];
  children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
  const segment = useSelectedLayoutSegment();
  const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setShowMobileMenu(false);
  }, [pathname]);

  return (
    <div className="flex items-center gap-4 lg:gap-8">
      <Link href="/" className="hidden items-center space-x-3 sm:flex group shrink-0">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 border border-primary/30 font-heading text-sm font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          AA
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-base lg:text-lg tracking-tight leading-none text-foreground">
            {siteConfig.authorName}
          </span>
          <span className="text-[11px] text-muted-foreground leading-tight mt-0.5">
            Molecular Bioengineering, Imperial
          </span>
        </div>
      </Link>
      {items?.length ? (
        <nav className="hidden lg:flex items-center gap-1">
          {items?.map((item, index) => {
            const isActive = segment && item.href.startsWith(`/${segment}`);
            return (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary/12 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/70",
                  item.disabled && "cursor-not-allowed opacity-80"
                )}
              >
                {item.title}
              </Link>
            );
          })}
        </nav>
      ) : null}
      <button
        className="flex items-center space-x-2 lg:hidden px-2.5 py-1.5 rounded-md border border-border/70 bg-card text-foreground hover:bg-muted transition-colors"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
        aria-label="Toggle navigation menu"
      >
        {showMobileMenu ? <Icons.close className="h-4 w-4" /> : <Icons.menu className="h-4 w-4" />}
        <span className="font-heading text-sm">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
