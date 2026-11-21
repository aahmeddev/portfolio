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
    <div className="flex gap-6 items-center md:gap-10">
      <Link href="/" className="hidden items-center space-x-2.5 md:flex group">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 border border-primary/40 font-heading text-sm font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
          AA
        </span>
        <div className="flex flex-col">
          <span className="font-heading text-lg tracking-tight leading-none">
            {siteConfig.authorName}
          </span>
          <span className="text-[11px] text-muted-foreground leading-tight">
            Imperial Bioengineering
          </span>
        </div>
      </Link>
      {items?.length ? (
        <nav className="hidden gap-1 md:flex items-center">
          {items?.map((item, index) => {
            const isActive = segment && item.href.startsWith(`/${segment}`);
            return (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/15 text-primary font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/60",
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
        className="flex items-center space-x-2 md:hidden"
        onClick={() => setShowMobileMenu(!showMobileMenu)}
      >
        {showMobileMenu ? <Icons.close /> : <Icons.menu />}
        <span className="font-heading text-sm">Menu</span>
      </button>
      {showMobileMenu && items && (
        <MobileNav items={items}>{children}</MobileNav>
      )}
    </div>
  );
}
