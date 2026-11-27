import { Metadata } from "next";

import { ExperienceDossier } from "@/components/career/experience-dossier";
import { careerExperiences } from "@/config/career";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.experience.metadata.title,
  description: pagesConfig.experience.metadata.description,
};

export default function CareerExperiencePage() {
  return (
    <section className="space-y-4">
      <div className="space-y-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
          04 // Research &amp; Industry Dossier
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl text-foreground">
          {pagesConfig.experience.title}
        </h1>
      </div>
      <ExperienceDossier experiences={careerExperiences} />
    </section>
  );
}
