import { Metadata } from "next";
import Link from "next/link";

import Timeline from "@/components/career/timeline";
import { Icons } from "@/components/common/icons";
import PageContainer from "@/components/common/page-container";
import { buttonVariants } from "@/components/ui/button";
import { careerExperiences } from "@/config/career";
import { pagesConfig } from "@/config/pages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.experience.metadata.title,
  description: pagesConfig.experience.metadata.description,
};

export default function CareerExperiencePage() {
  return (
    <PageContainer
      title={pagesConfig.experience.title}
      description={pagesConfig.experience.description}
    >
      {/* Academic Anchor Card */}
      <div className="max-w-4xl mx-auto mb-8 rounded-xl border border-primary/40 bg-primary/5 p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Academic Foundation
            </span>
            <h2 className="text-xl font-bold text-foreground">
              Imperial College London | MEng Molecular Bioengineering (2024 - 2028)
            </h2>
            <p className="text-sm text-muted-foreground">
              First Class Honours (Year 1: 81.57%, Year 2: 77.95%) • Dean&apos;s List (Year 1 &amp; Year 2, Top 10%) • Year 2 Prize for Best Design Group Project (MYOWAVE) • McKinsey Forward Programme Graduate (2026)
            </p>
          </div>
          <Link
            href="/cv"
            className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0")}
          >
            Full Transcript &amp; CV
            <Icons.chevronRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      </div>

      <Timeline experiences={careerExperiences} />
    </PageContainer>
  );
}
