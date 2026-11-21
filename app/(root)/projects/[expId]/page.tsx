import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import ExperienceDescription from "@/components/experience/exp-description";
import { Button, buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { Experiences } from "@/config/experience";
import { cn, formatDateFromObj } from "@/lib/utils";

export async function generateStaticParams() {
  return Experiences.map((project) => ({
    expId: project.id,
  }));
}

interface ExperiencePageProps {
  params: {
    expId: string;
  };
}

export default function Experience({ params }: ExperiencePageProps) {
  const exp = Experiences.find((val) => val.id === params.expId);
  if (!exp) {
    redirect("/projects");
  }

  return (
    <article className="relative mx-auto max-w-5xl py-4 sm:py-6 lg:py-8">
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "inline-flex text-muted-foreground hover:text-foreground"
          )}
        >
          <Icons.chevronLeft className="mr-1.5 h-4 w-4" />
          Back to All Projects
        </Link>
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          Technical Specification &amp; Results Sheet
        </span>
      </div>

      {/* CONCISE TECHNICAL DATASHEET HEADER */}
      <div className="rounded-xl border-2 border-primary/25 bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5">
          <div className="space-y-2.5 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded bg-primary/15 px-2.5 py-0.5 text-xs font-mono font-semibold text-primary">
                {exp.type}
              </span>
              {exp.badge && (
                <span className="rounded bg-muted px-2.5 py-0.5 text-xs font-mono font-semibold text-foreground border border-border">
                  {exp.badge}
                </span>
              )}
              <time
                dateTime={exp.startDate.toISOString()}
                className="text-xs font-mono text-muted-foreground"
              >
                {formatDateFromObj(exp.startDate)}
              </time>
            </div>

            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground">
              {exp.companyName}
            </h1>

            {exp.subtitle && (
              <p className="text-sm sm:text-base font-medium text-primary">
                {exp.subtitle}
              </p>
            )}

            <p className="text-sm text-muted-foreground leading-relaxed pt-1">
              {exp.shortDescription}
            </p>
          </div>

          <div className="flex flex-wrap lg:flex-col gap-2.5 shrink-0 lg:w-56">
            {exp.blogLink && (
              <Link
                href={exp.blogLink}
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full justify-between")}
              >
                <span>Development Blog</span>
                <Icons.chevronRight className="w-4 h-4 ml-1.5" />
              </Link>
            )}
            {exp.githubLink && (
              <a
                href={exp.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline", size: "sm" }), "w-full justify-between")}
              >
                <span className="flex items-center">
                  <Icons.gitHub className="w-4 h-4 mr-1.5" />
                  GitHub Repository
                </span>
                <Icons.externalLink className="w-3.5 h-3.5" />
              </a>
            )}
            {exp.websiteLink && !exp.blogLink && (
              <a
                href={exp.websiteLink}
                target={exp.websiteLink.startsWith("http") ? "_blank" : undefined}
                rel={exp.websiteLink.startsWith("http") ? "noopener noreferrer" : undefined}
                className={cn(buttonVariants({ variant: "default", size: "sm" }), "w-full justify-between")}
              >
                <span>Live App / Report</span>
                <Icons.externalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            )}
          </div>
        </div>

        {/* KEY QUANTITATIVE METRICS GRID */}
        {exp.keyMetrics && exp.keyMetrics.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-6 pt-5 border-t border-border">
            {exp.keyMetrics.map((m, idx) => (
              <div
                key={idx}
                className="rounded-lg border border-border bg-muted/40 p-3.5 space-y-1"
              >
                <p className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">
                  {m.label}
                </p>
                <p className="font-heading text-lg sm:text-xl text-primary leading-tight">
                  {m.value}
                </p>
                {m.detail && (
                  <p className="text-xs text-muted-foreground leading-snug">
                    {m.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SKILLS & METHODS BAR */}
        <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mr-2">
            Skills &amp; Stack:
          </span>
          <ChipContainer textArr={exp.techStack} />
        </div>
      </div>

      {/* CONCISE TECHNICAL ARCHITECTURE & IMPLEMENTATION SPECS */}
      <section className="my-7 rounded-xl border border-border bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <h2 className="font-heading text-lg sm:text-xl text-foreground">
            System Architecture &amp; Quantitative Results
          </h2>
          <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
            Implementation Summary
          </span>
        </div>
        <ExperienceDescription
          paragraphs={exp.descriptionDetails.paragraphs}
          bullets={exp.descriptionDetails.bullets}
        />
      </section>

      {/* RESULTS, PLOTS & HARDWARE RENDERS GALLERY */}
      {exp.pagesInfoArr.length > 0 && (
        <section className="my-7 space-y-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h2 className="font-heading text-xl sm:text-2xl text-foreground">
              {exp.pagesInfoTitle || "Diagnostic Plots & Visual Results"}
            </h2>
            <span className="text-xs font-mono text-muted-foreground hidden sm:inline">
              Figures &amp; Captions
            </span>
          </div>

          <div className="space-y-5">
            {exp.pagesInfoArr.map((page, ind) => (
              <div
                key={ind}
                className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  {page.title && (
                    <h3 className="font-heading text-base sm:text-lg text-foreground">
                      <span className="font-mono text-xs text-primary mr-2">
                        [Fig. {ind + 1}]
                      </span>
                      {page.title}
                    </h3>
                  )}
                  {page.linkURL && (
                    <Button asChild variant="default" size="sm" className="shrink-0">
                      <a
                        href={page.linkURL}
                        target={page.linkURL.startsWith("http") ? "_blank" : undefined}
                        rel={page.linkURL.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        Open Interactive Output
                        <Icons.externalLink className="ml-2 h-3.5 w-3.5" />
                      </a>
                    </Button>
                  )}
                </div>

                {page.description && (
                  <p className="text-muted-foreground text-xs sm:text-sm mt-1.5 leading-relaxed">
                    {page.description}
                  </p>
                )}

                {page.imgArr.length > 0 && (
                  <div
                    className={cn(
                      "mt-4 grid gap-4",
                      page.imgArr.length > 1 ? "md:grid-cols-2" : "grid-cols-1"
                    )}
                  >
                    {page.imgArr.map((img, imgInd) => (
                      <div
                        key={imgInd}
                        className="overflow-hidden rounded-lg border border-border bg-white dark:bg-slate-950/90 p-2 flex items-center justify-center"
                      >
                        <Image
                          src={img}
                          alt={page.title || exp.companyName}
                          width={1000}
                          height={580}
                          className="w-full h-auto object-contain rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CALLOUT TO LONG-FORM DEVELOPMENT BLOG */}
      {exp.blogLink && (
        <div className="my-8 rounded-xl border border-primary/35 bg-primary/10 p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-mono uppercase tracking-wider text-primary font-semibold">
              Want the Full Development Story?
            </p>
            <h3 className="font-heading text-lg sm:text-xl text-foreground">
              Read the behind-the-scenes journey, design trade-offs, limitations &amp; future ideas
            </h3>
          </div>
          <Link
            href={exp.blogLink}
            className={cn(buttonVariants({ variant: "default" }), "shrink-0")}
          >
            Read Full Blog Article
            <Icons.chevronRight className="ml-1.5 h-4 w-4" />
          </Link>
        </div>
      )}

      <div className="flex justify-center pt-6 border-t border-border">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "outline" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}
