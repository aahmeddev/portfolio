"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Icons } from "@/components/common/icons";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

const MAIN_TABS = [
  { id: "about", label: "01 · About", href: "/" },
  { id: "projects", label: "02 · Projects", href: "/projects" },
  { id: "blog", label: "03 · Lab Blogs", href: "/blog" },
  { id: "experience", label: "04 · Experience", href: "/experience" },
  { id: "skills", label: "05 · Skills", href: "/skills" },
  { id: "cv", label: "06 · CV & Contact", href: "/cv" },
];

function getPulloutMeta(pathname: string): { label: string; parentHref: string; parentTabId: string } | null {
  if (pathname.startsWith("/blog/") && pathname.length > 6) {
    const slug = pathname.replace("/blog/", "").replace(/\/$/, "");
    return {
      label: `LAB JOURNAL // ${slug.replace(/-/g, " ").toUpperCase()}`,
      parentHref: "/blog",
      parentTabId: "blog",
    };
  }
  if (pathname.startsWith("/projects/") && pathname.length > 10) {
    const slug = pathname.replace("/projects/", "").replace(/\/$/, "");
    return {
      label: `PROJECT FILE // ${slug.replace(/-/g, " ").toUpperCase()}`,
      parentHref: "/projects",
      parentTabId: "projects",
    };
  }
  return null;
}

export function ArchiveBinderShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [tucking, setTucking] = useState(false);

  const pullout = getPulloutMeta(pathname);
  const activeTab =
    MAIN_TABS.find((t) =>
      pullout
        ? t.id === pullout.parentTabId
        : t.href === "/"
          ? pathname === "/"
          : pathname === t.href
    ) || MAIN_TABS[0];

  const handleTuckBack = () => {
    if (!pullout || tucking) return;
    setTucking(true);
    window.setTimeout(() => {
      setTucking(false);
      router.push(pullout.parentHref);
    }, 260);
  };

  useEffect(() => {
    setTucking(false);
  }, [pathname]);

  useEffect(() => {
    if (!pullout) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleTuckBack();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pullout, tucking]);

  return (
    /* Equal breathing space above and below the physical folder (py-6 sm:py-9) */
    <div className="min-h-screen lg:h-screen lg:overflow-hidden flex flex-col px-3 sm:px-6 lg:px-10 py-6 sm:py-9">
      <div
        className={cn(
          "w-full max-w-[1300px] mx-auto flex-1 flex flex-col min-h-0 transition-all duration-500 ease-out",
          pullout && !tucking && "scale-[0.96] brightness-[0.45] blur-[1px] pointer-events-none select-none"
        )}
      >
        {/* Clean Archival Masthead */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-1 pb-2.5 font-mono text-[11px] text-muted-foreground shrink-0">
          <div className="flex items-center gap-2">
            <Link href="/" className="font-semibold text-foreground hover:text-primary transition-colors">
              AHMED AHMED
            </Link>
            <span className="text-primary">{"//"}</span>
            <span className="hidden sm:inline">IMPERIAL COLLEGE LONDON · MOLECULAR BIOENGINEERING</span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="h-8 w-8 inline-flex items-center justify-center border border-primary/35 bg-card hover:border-primary hover:text-primary transition-colors"
            >
              <Icons.gitHub className="w-3.5 h-3.5" />
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="h-8 w-8 inline-flex items-center justify-center border border-primary/35 bg-card hover:border-primary hover:text-primary transition-colors"
            >
              <Icons.linkedin className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Unified Oxblood Folder Tabs (Active seamlessly fuses with folder; inactive cleanly recessed) */}
        <header className="relative z-40 shrink-0">
          <nav
            aria-label="Archive Binder Tabs"
            className="flex flex-wrap items-end gap-1 pl-1"
          >
            {MAIN_TABS.map((tab) => {
              const isActive = tab.id === activeTab.id;
              return (
                <Link
                  key={tab.id}
                  href={tab.href}
                  className={cn(
                    "font-mono text-[11px] sm:text-xs tracking-wide px-3.5 sm:px-4 py-2 border border-b-0 transition-all relative",
                    isActive
                      ? "bg-[#1F171C] text-primary border-primary font-semibold pt-3 -mb-[1px] pb-[9px] z-30 after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[2px] after:h-[3px] after:bg-[#1F171C]"
                      : "bg-[#191217] text-muted-foreground border-primary/35 hover:text-foreground hover:border-primary/70 z-10"
                  )}
                >
                  {tab.label}
                </Link>
              );
            })}
          </nav>
        </header>

        {/* Unified Oxblood Folder Body with Symmetrical Top & Bottom Breathing Room */}
        <main className="relative z-20 flex-1 min-h-0 bg-[#1F171C] border border-primary shadow-[10px_10px_0_rgba(212,77,77,0.24)] px-6 sm:px-10 lg:px-12 py-7 sm:py-9 lg:overflow-y-auto binder-scroll">
          {!pullout ? (
            children
          ) : (
            <div className="h-full flex items-center justify-center font-mono text-xs text-muted-foreground">
              Document pulled out of {activeTab.label} sleeve...
            </div>
          )}
        </main>
      </div>

      {/* VERTICAL SLEEVE PULL-OUT SHEET */}
      {pullout && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) handleTuckBack();
          }}
          className={cn(
            "fixed inset-0 z-50 flex justify-center items-start pt-6 sm:pt-10 px-3 sm:px-6 pb-6 bg-black/50 transition-opacity duration-300",
            tucking ? "opacity-0" : "opacity-100"
          )}
        >
          <article
            className={cn(
              "w-full max-w-[960px] h-[calc(100vh-52px)] sm:h-[calc(100vh-72px)] bg-[#22191E] border border-primary shadow-[0_28px_70px_rgba(0,0,0,0.75),10px_10px_0_rgba(212,77,77,0.28)] flex flex-col overflow-hidden",
              tucking ? "animate-sleeve-tuckin" : "animate-sleeve-pullout"
            )}
          >
            <div className="bg-[#181215] border-b border-primary/40 px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
              <div className="min-w-0">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary truncate">
                  {pullout.label}
                </p>
                <p className="font-mono text-[10.5px] text-muted-foreground truncate">
                  ahmedahmed.me{pathname}
                </p>
              </div>
              <button
                type="button"
                onClick={handleTuckBack}
                className="bg-primary text-primary-foreground px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity shrink-0"
              >
                ↓ Tuck Back Into Folder [ESC]
              </button>
            </div>

            <div className="flex-1 overflow-y-auto binder-scroll px-6 sm:px-10 lg:px-12 py-6 sm:py-8">
              {children}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
