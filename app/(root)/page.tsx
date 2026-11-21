import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import BlogCard from "@/components/blogs/blog-card";
import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { Icons } from "@/components/common/icons";
import ProjectCard from "@/components/experience/project-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { blogsUnsorted } from "@/config/blogs";
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

const visualShowcase = [
  {
    title: "1,025-State HMM Nanopore Basecaller",
    caption: "Viterbi 5-mer decoding & Gaussian emission posteriors on 4 kHz POD5 reads",
    img: "/portfolio/projects/nanopore-hmm-basecaller/hmm_viterbi_overview.png",
    href: "/blog/nanopore-basecalling",
  },
  {
    title: "MYOWAVE 24-Bit Biopotential PCB",
    caption: "Custom KiCad ADS1299-6PAGR acquisition shield for uterine EHG diagnostics",
    img: "/portfolio/projects/myowave-ehg/pcb_angled_3d.png",
    href: "/projects/myowave-ehg-platform",
  },
  {
    title: "Custom Linear CCD Spectrophotometer",
    caption: "SolidWorks asymmetrical sawtooth ceiling baffle & 45-degree specular V-trap",
    img: "/portfolio/projects/pulse-oximeter-spectrophotometer/cad_improvements_breakdown.png",
    href: "/blog/custom-ccd-spectrophotometer",
  },
  {
    title: "Diabetic Wound Epigenetics (p = 0.002)",
    caption: "COL1A1 promoter CpG bisulphite sequencing & 35-cycle RT-PCR remodeling",
    img: "/portfolio/projects/diabetic-wound-epigenetics/cpg_methylation_summary.png",
    href: "/blog/diabetic-wound-epigenetics",
  },
];

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Molecular Bioengineering Undergraduate, Imperial College London",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper>
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* EDITORIAL HERO SECTION */}
      <section className="rounded-2xl border border-border bg-card editorial-hero-bg p-6 sm:p-10 lg:p-12 mb-12 shadow-sm">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-center">
          {/* Left column: Natural human introduction */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-4">
              <Image
                src={profileImg}
                alt="Ahmed Ahmed"
                width={88}
                height={88}
                priority
                className="rounded-full object-cover border-2 border-primary/40 shadow-sm w-16 h-16 sm:w-20 sm:h-20 shrink-0"
              />
              <div>
                <p className="text-xs sm:text-sm font-medium text-primary">
                  Imperial College London • MEng Molecular Bioengineering
                </p>
                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground mt-0.5">
                  Ahmed Ahmed
                </h1>
              </div>
            </div>

            <p className="text-base sm:text-lg text-foreground/90 leading-relaxed">
              I study Molecular Bioengineering at Imperial College London, where I split my time between wet-lab experimental biology, scientific software, and diagnostic hardware.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I enjoy working on problems where molecular physics and computation meet directly: writing algorithms to decode raw ionic current traces from nanopore sequencers, tuning peptide nucleic acid surface chemistry for point-of-care cancer assays in the Ladame Lab, building multi-core geochemical modelling tools at Nanolyse Technologies, and designing low-noise biopotential circuits and optical instruments.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/projects"
                className={cn(buttonVariants({ size: "default" }))}
              >
                Explore Projects
                <Icons.chevronRight className="w-4 h-4 ml-1.5" />
              </Link>
              <Link
                href="/blog"
                className={cn(buttonVariants({ variant: "outline", size: "default" }))}
              >
                Articles &amp; Lab Reports
              </Link>
              <Link
                href="/cv"
                className={cn(buttonVariants({ variant: "outline", size: "default" }))}
              >
                CV &amp; Transcript
              </Link>
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(buttonVariants({ variant: "ghost", size: "default" }))}
              >
                <Icons.gitHub className="w-4 h-4 mr-1.5" /> GitHub
              </Link>
            </div>
          </div>

          {/* Right column: 2x2 Visual Showcase of Real Figures & Hardware */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {visualShowcase.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group rounded-xl border border-border bg-background/80 p-3 hover:border-primary/45 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-border/70 bg-white dark:bg-slate-950/90 mb-2.5">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-1.5 group-hover:scale-[1.02] transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
                <div>
                  <h2 className="text-xs sm:text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-[11px] sm:text-xs text-muted-foreground leading-snug mt-0.5">
                    {item.caption}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS SECTION */}
      <section className="space-y-6 py-6" id="projects">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Selected Engineering &amp; Bioinformatics Work
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground">
              {pagesConfig.projects.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {pagesConfig.projects.description}
            </p>
          </div>
          <Link href="/projects" className="shrink-0">
            <Button variant="outline" size="sm">
              View All {featuredExperiences.length + 2} Projects
              <Icons.chevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredExperiences.map((exp) => (
            <ProjectCard key={exp.id} project={exp} />
          ))}
        </div>
      </section>

      {/* TECHNICAL ARTICLES & LAB REPORTS SECTION */}
      <section className="space-y-6 rounded-2xl border border-border bg-card p-6 sm:p-9 my-12 shadow-sm" id="blog">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Research Writeups &amp; Laboratory Reports
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground">
              {pagesConfig.blog.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {pagesConfig.blog.description}
            </p>
          </div>
          <Link href="/blog" className="shrink-0">
            <Button variant="default" size="sm">
              Browse All {blogsUnsorted.length} Articles
              <Icons.chevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <BlogCard blogs={blogsUnsorted.slice(0, 6)} />
      </section>

      {/* RESEARCH & INDUSTRY EXPERIENCE SECTION */}
      <section className="space-y-6 py-6" id="experience">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Wet Lab, Scientific Software &amp; Clinical Translation
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground">
              {pagesConfig.experience.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {pagesConfig.experience.description}
            </p>
          </div>
          <Link href="/experience" className="shrink-0">
            <Button variant="outline" size="sm">
              Full Timeline
              <Icons.chevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {careerExperiences.slice(0, 3).map((role) => (
            <div
              key={role.id}
              className="rounded-xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between space-y-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="rounded-md bg-primary/10 border border-primary/25 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {role.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {role.period}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground pt-1">
                  {role.position}
                </h3>
                <p className="text-sm font-medium text-primary/90">
                  {role.company}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed pt-1">
                  {role.summary}
                </p>
              </div>
              <ul className="list-disc pl-4 space-y-1.5 border-t border-border/60 pt-3">
                {role.achievements.slice(0, 2).map((a, i) => (
                  <li key={i} className="text-xs text-foreground/90 leading-relaxed">
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* TECHNICAL CAPABILITIES (4 BUBBLE GROUPS) */}
      <section className="space-y-6 py-8" id="skills">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Core Domains
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl text-foreground">
              {pagesConfig.skills.title}
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl">
              {pagesConfig.skills.description}
            </p>
          </div>
          <Link href="/skills" className="shrink-0">
            <Button variant="outline" size="sm">
              Full Capabilities Page
              <Icons.chevronRight className="ml-1.5 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skillPillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl border border-border bg-card p-6 sm:p-7 space-y-4 hover:border-primary/40 transition-colors shadow-sm"
            >
              <div className="space-y-1">
                <span className="inline-block rounded-full bg-primary/10 border border-primary/25 px-3 py-1 text-xs font-semibold text-primary">
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
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-muted/60 px-4 py-2 text-xs sm:text-sm font-medium text-foreground"
                  >
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </ClientPageWrapper>
  );
}
