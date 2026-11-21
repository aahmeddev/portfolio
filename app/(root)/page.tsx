import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import BlogCard from "@/components/blogs/blog-card";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ProjectCard from "@/components/experience/project-card";
import SkillsCard from "@/components/skills/skills-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { featuredBlogs } from "@/config/blogs";
import { careerExperiences } from "@/config/career";
import { featuredExperiences } from "@/config/experience";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { skillPillars } from "@/config/skills";
import { cn } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

export const metadata: Metadata = {
  title: pagesConfig.home.metadata.title,
  description: pagesConfig.home.metadata.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

const impactMetrics = [
  {
    value: "81.57% / 77.95%",
    label: "First Class Honours (Yr 1 & Yr 2)",
    detail: "2x Dean's List (Top 10%), Imperial College London",
  },
  {
    value: "81% Identity",
    label: "From-Scratch HMM Basecaller",
    detail: "1,025-state Numba JIT decoder on raw POD5 reads vs Dorado",
  },
  {
    value: "30% Assay Gain",
    label: "miRFlow Cancer Diagnostics",
    detail: "50+ RP-HPLC conjugates & CytoFlex gating (Ladame Lab spinout)",
  },
  {
    value: "£40,000 Grant",
    label: "Parallel PHREEQC Speciation",
    detail: "35,232 sensor records & 3 corporate R&D partnerships (Nanolyse)",
  },
];

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "MEng Molecular Bioengineering Undergraduate, Imperial College London",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-2xl border border-border/70 biotech-grid-bg px-4 py-10 sm:px-8 sm:py-14 mb-12">
        <div className="mx-auto max-w-4xl flex flex-col items-center text-center space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3.5 py-1 text-xs font-semibold text-primary">
            <span>Imperial College London</span>
            <span>•</span>
            <span>MEng Molecular Bioengineering</span>
            <span>•</span>
            <span>2x Dean&apos;s List</span>
          </div>

          <Image
            src={profileImg}
            alt="Ahmed Ahmed"
            width={176}
            height={176}
            priority
            className="rounded-full object-cover object-center border-4 border-primary/70 shadow-xl w-28 h-28 sm:w-36 sm:h-36"
          />

          <div className="space-y-2">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Ahmed Ahmed
            </h1>
            <p className="text-base sm:text-xl font-medium text-primary">
              Nanopore Sequencing Algorithms, Diagnostic Bioassays &amp; Embedded Bioinstrumentation
            </p>
          </div>

          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            First Class Molecular Bioengineering undergraduate at Imperial College London (81.57% Year 1, 77.95% Year 2, 93.75% in Programming 2) building at the intersection of wet-lab assay chemistry and high-performance scientific software. My recent work spans a 1,025-state Numba Hidden Markov Model basecaller for raw Oxford Nanopore POD5 signals, thiol-maleimide PNA-backfiller chemistry for the miRFlow cancer diagnostic spinout, multi-core Python/C++ geochemical speciation pipelines at Nanolyse Technologies, and prize-winning ADS1299 biopotential hardware.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/projects"
              className={cn(buttonVariants({ size: "lg" }))}
            >
              Explore Projects
              <Icons.chevronRight className="w-4 h-4 ml-1.5" />
            </Link>
            <Link
              href="/cv"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              View CV &amp; Transcript
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Icons.gitHub className="w-4 h-4 mr-2" /> GitHub
            </Link>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              <Icons.linkedin className="w-4 h-4 mr-2" /> LinkedIn
            </Link>
          </div>

          {/* 4-METRIC IMPACT STRIP */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-6 text-left">
            {impactMetrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-border/80 bg-card/90 backdrop-blur p-4 space-y-1"
              >
                <p className="font-heading text-xl sm:text-2xl text-primary">
                  {m.value}
                </p>
                <p className="text-xs sm:text-sm font-semibold text-foreground">
                  {m.label}
                </p>
                <p className="text-xs text-muted-foreground leading-snug">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="space-y-6 py-8" id="projects">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Sequencing, Hardware &amp; Systems
          </span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            {pagesConfig.projects.title}
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            {pagesConfig.projects.description}
          </p>
        </div>

        <div className="mx-auto grid justify-center gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredExperiences.map((exp) => (
            <ProjectCard key={exp.id} project={exp} />
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link href="/projects">
            <Button variant="outline" className="rounded-xl">
              View All 8 Engineering Projects
              <Icons.chevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* FEATURED RESEARCH & INDUSTRY EXPERIENCE */}
      <section className="space-y-6 rounded-2xl border border-border bg-muted/30 p-6 sm:p-10 my-12" id="experience">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Wet Lab, Scientific Software &amp; Clinical Translation
          </span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            {pagesConfig.experience.title}
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            {pagesConfig.experience.description}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {careerExperiences.slice(0, 3).map((role) => (
            <div
              key={role.id}
              className="rounded-xl border border-border bg-card p-5 flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {role.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {role.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {role.position}
                </h3>
                <p className="text-sm font-medium text-muted-foreground">
                  {role.company}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {role.summary}
                </p>
              </div>
              <ul className="list-disc pl-4 space-y-1 border-t border-border/60 pt-3">
                {role.achievements.slice(0, 2).map((a, i) => (
                  <li key={i} className="text-xs text-foreground leading-relaxed">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex justify-center pt-2">
          <Link href="/experience">
            <Button variant="default" className="rounded-xl">
              View Full Research &amp; Industry Timeline
              <Icons.chevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* TECHNICAL CAPABILITIES SECTION */}
      <section className="space-y-6 py-8" id="skills">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Verified Stack
          </span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            {pagesConfig.skills.title}
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            {pagesConfig.skills.description}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {skillPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-4 hover:border-primary/45 transition-colors"
            >
              <div className="space-y-1">
                <span className="inline-block rounded-full bg-primary/15 border border-primary/35 px-3 py-1 text-xs font-semibold text-primary">
                  {pillar.highlight}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl text-foreground pt-1">
                  {pillar.title}
                </h3>
              </div>
              <div className="flex flex-wrap gap-2.5 pt-1">
                {pillar.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-xs sm:text-sm font-semibold text-foreground"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center pt-2">
          <Link href="/skills">
            <Button variant="outline" className="rounded-xl">
              Open Full Technical Capabilities View
              <Icons.chevronRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* TECHNICAL WRITING / BLOG SECTION */}
      <section className="space-y-6 rounded-2xl border border-border bg-muted/30 p-6 sm:p-10 my-12" id="blog">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-3 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-primary">
            Engineering Deep Dives
          </span>
          <h2 className="font-heading text-3xl leading-[1.1] sm:text-4xl md:text-5xl">
            {pagesConfig.blog.title}
          </h2>
          <p className="max-w-[85%] text-muted-foreground sm:text-lg">
            {pagesConfig.blog.description}
          </p>
        </div>
        <div className="mx-auto max-w-4xl">
          <BlogCard blogs={featuredBlogs} />
        </div>
      </section>
    </ClientPageWrapper>
  );
}
