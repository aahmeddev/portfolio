import Link from "next/link";
import * as React from "react";

import { buttonVariants } from "@/components/ui/button";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { SocialLinks } from "@/config/socials";
import { cn } from "@/lib/utils";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn("border-t border-border/60 bg-muted/20 mt-16", className)}>
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4 py-8">
        <div className="text-center sm:text-left">
          <p className="text-sm font-medium text-foreground">
            Ahmed Ahmed | MEng Molecular Bioengineering, Imperial College London
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            Nanopore Sequencing Algorithms, Diagnostic Bioassays &amp; Embedded Bioinstrumentation
          </p>
        </div>
        <div className="flex items-center gap-3">
          {SocialLinks.map((item, ind) => (
            <CustomTooltip icon={item.icon} text={item.username} key={ind}>
              <Link
                href={item.link}
                target={item.link.startsWith("mailto:") ? undefined : "_blank"}
                rel={item.link.startsWith("mailto:") ? undefined : "noreferrer"}
                aria-label={item.name}
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "sm",
                  }),
                  "h-9 w-9 p-2 rounded-full border border-border/60"
                )}
              >
                <item.icon className="h-4 w-4" />
              </Link>
            </CustomTooltip>
          ))}
        </div>
      </div>
    </footer>
  );
}
