import { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import { pagesConfig } from "@/config/pages";
import { skillPillars } from "@/config/skills";

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.description,
};

export default function SkillsPage() {
  return (
    <PageContainer
      title={pagesConfig.skills.title}
      description={pagesConfig.skills.description}
    >
      <div className="max-w-6xl mx-auto space-y-7 py-4">
        {skillPillars.map((pillar) => (
          <section
            key={pillar.id}
            className="rounded-2xl border border-border bg-card p-6 sm:p-9 shadow-sm hover:border-primary/40 transition-all space-y-5"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-border/60 pb-4">
              <div className="space-y-1">
                <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                  {pillar.title}
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
              <span className="self-start md:self-center shrink-0 rounded-full bg-primary/10 border border-primary/25 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
                {pillar.highlight}
              </span>
            </div>

            <div className="flex flex-wrap gap-3 sm:gap-3.5 pt-1">
              {pillar.skills.map((item, idx) => (
                <div
                  key={idx}
                  className="group inline-flex items-center gap-2.5 rounded-full border border-border bg-muted/60 hover:bg-primary/10 hover:border-primary/40 px-4 py-2 sm:px-5 sm:py-2.5 text-sm sm:text-base font-medium text-foreground shadow-sm transition-all duration-200 cursor-default"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-primary group-hover:scale-125 transition-transform" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </PageContainer>
  );
}
