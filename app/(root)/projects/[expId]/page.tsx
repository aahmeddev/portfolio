import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { Icons } from "@/components/common/icons";
import ExperienceDescription from "@/components/experience/exp-description";
import { Button, buttonVariants } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import CustomTooltip from "@/components/ui/custom-tooltip";
import { Experiences } from "@/config/experience";
import { siteConfig } from "@/config/site";
import { cn, formatDateFromObj } from "@/lib/utils";
import profileImg from "@/public/profile-img.jpg";

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
    <article className="relative mx-auto max-w-4xl py-4 sm:py-6 lg:py-8">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost", size: "sm" }),
          "mb-4 inline-flex text-muted-foreground hover:text-foreground"
        )}
      >
        <Icons.chevronLeft className="mr-1.5 h-4 w-4" />
        Back to Projects
      </Link>

      <div className="rounded-2xl border border-border bg-card p-5 sm:p-7 shadow-sm">
        <div className="flex flex-wrap items-center gap-2.5 mb-2">
          <time
            dateTime={exp.startDate.toISOString()}
            className="text-sm text-muted-foreground"
          >
            {formatDateFromObj(exp.startDate)}
          </time>
          {exp.badge && (
            <span className="rounded-md bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/25">
              {exp.badge}
            </span>
          )}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mt-1">
          <div>
            <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl leading-tight text-foreground">
              {exp.companyName}
            </h1>
            {exp.subtitle && (
              <p className="mt-1.5 text-sm sm:text-base font-medium text-primary">
                {exp.subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {exp.githubLink && (
              <CustomTooltip text="View source code on GitHub">
                <a
                  href={exp.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                  className={cn(buttonVariants({ variant: "outline", size: "sm" }))}
                >
                  <Icons.gitHub className="w-4 h-4 mr-1.5" />
                  Source Code
                </a>
              </CustomTooltip>
            )}
            {exp.websiteLink && (
              <CustomTooltip text="Open live preview or full article">
                <a
                  href={exp.websiteLink}
                  target={exp.websiteLink.startsWith("http") ? "_blank" : undefined}
                  rel={exp.websiteLink.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label="External link"
                  className={cn(buttonVariants({ variant: "default", size: "sm" }))}
                >
                  <span>Open</span>
                  <Icons.externalLink className="w-4 h-4 ml-1.5" />
                </a>
              </CustomTooltip>
            )}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-border/60">
          <ChipContainer textArr={exp.category} />
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2.5 text-sm"
          >
            <Image
              src={profileImg}
              alt="Ahmed Ahmed"
              width={34}
              height={34}
              className="rounded-full bg-background border border-border object-cover"
            />
            <div className="text-left leading-tight">
              <p className="font-medium text-xs sm:text-sm">Ahmed Ahmed</p>
              <p className="text-[11px] text-muted-foreground">
                Imperial College London
              </p>
            </div>
          </a>
        </div>
      </div>

      <figure className="my-7 overflow-hidden rounded-xl border border-border bg-white dark:bg-slate-950/85 p-3 shadow-sm">
        <Image
          src={exp.companyLogoImg}
          alt={exp.companyName}
          width={1100}
          height={620}
          className="w-full h-auto object-contain rounded-lg"
          priority
        />
      </figure>

      <div className="mb-8 rounded-xl border border-border bg-card p-5 sm:p-6">
        <h2 className="font-heading text-lg sm:text-xl leading-tight mb-3 text-foreground">
          Technologies &amp; Experimental Methods
        </h2>
        <ChipContainer textArr={exp.techStack} />
      </div>

      <div className="mb-9 rounded-2xl border border-border bg-card p-5 sm:p-7">
        <h2 className="font-heading text-xl sm:text-2xl leading-tight mb-4 text-foreground">
          Architecture, Implementation &amp; Results
        </h2>
        <ExperienceDescription
          paragraphs={exp.descriptionDetails.paragraphs}
          bullets={exp.descriptionDetails.bullets}
        />
      </div>

      {exp.pagesInfoArr.length > 0 && (
        <div className="mb-8 pt-2">
          <h2 className="font-heading text-xl sm:text-2xl leading-tight mb-5 text-foreground">
            {exp.pagesInfoTitle || "Figures & Subsystem Walkthrough"}
          </h2>
          <div className="space-y-6">
            {exp.pagesInfoArr.map((page, ind) => (
              <div key={ind} className="rounded-xl border border-border bg-card p-5 sm:p-6 shadow-sm">
                {page.title && (
                  <h3 className="font-heading text-lg sm:text-xl leading-snug text-foreground">
                    {page.title}
                  </h3>
                )}
                {page.description && (
                  <p className="text-muted-foreground text-sm sm:text-base mt-2 leading-relaxed">
                    {page.description}
                  </p>
                )}

                {page.imgArr.length > 0 && (
                  <div className={cn("mt-4 grid gap-4", page.imgArr.length > 1 ? "md:grid-cols-2" : "grid-cols-1")}>
                    {page.imgArr.map((img, imgInd) => (
                      <div
                        key={imgInd}
                        className="overflow-hidden rounded-lg border border-border bg-white dark:bg-slate-950/85 p-2 flex items-center justify-center"
                      >
                        <Image
                          src={img}
                          alt={page.title || exp.companyName}
                          width={900}
                          height={540}
                          className="w-full h-auto object-contain rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {page.linkURL && (
                  <div className="mt-4">
                    <Button asChild variant="default" size="sm">
                      <a
                        href={page.linkURL}
                        target={page.linkURL.startsWith("http") ? "_blank" : undefined}
                        rel={page.linkURL.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        Open Resource
                        <Icons.externalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
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
