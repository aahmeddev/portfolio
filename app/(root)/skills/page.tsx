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
      <div className="max-w-6xl mx-auto space-y-8 py-4">
        {skillPillars.map((pillar, index) => (
          <section
            key={pillar.id}
            className="rounded-2xl border border-border/80 bg-card/90 p-7 sm:p-10 shadow-sm hover:border-primary/45 transition-all space-y-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-border/60 pb-5">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary border border-primary/40">
                    0{index + 1}
                  </span>
                  <h2 className="font-heading text-2xl sm:text-3xl text-foreground">
                    {pillar.title}
                  </h2>
                </div>
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
              <span className="self-start md:self-center shrink-0 rounded-full bg-primary/15 border border-primary/40 px-4 py-1.5 text-xs sm:text-sm font-semibold text-primary">
                {pillar.highlight}
              </span>
            </div>

            <div className="flex flex-wrap gap-3.5 sm:gap-4 pt-1">
              {pillar.skills.map((item, idx) => (
                <div
                  key={idx}
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-primary/30 bg-primary/10 hover:bg-primary/20 hover:border-primary px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-semibold text-foreground shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-default"
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
