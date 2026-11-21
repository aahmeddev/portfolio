import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { MainNav } from "@/components/common/main-nav";
import { ModeToggle } from "@/components/common/mode-toggle";
import { SiteFooter } from "@/components/common/site-footer";
import { buttonVariants } from "@/components/ui/button";
import { routesConfig } from "@/config/routes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <MainNav items={routesConfig.mainNav} />
          <nav className="flex items-center gap-2">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-9 w-9 px-0 rounded-full border border-border/60"
              )}
            >
              <Icons.gitHub className="w-4 h-4" />
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "h-9 w-9 px-0 rounded-full border border-border/60"
              )}
            >
              <Icons.linkedin className="w-4 h-4" />
            </Link>
            <ModeToggle />
          </nav>
        </div>
      </header>
      <main className="container flex-1 py-6">{children}</main>
      <SiteFooter />
    </div>
  );
}
