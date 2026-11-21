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
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mb-4 inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </Link>

      <div>
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <time
            dateTime={exp.startDate.toISOString()}
            className="text-sm text-muted-foreground"
          >
            {formatDateFromObj(exp.startDate)}
          </time>
          {exp.badge && (
            <span className="rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary border border-primary/30">
              {exp.badge}
            </span>
          )}
        </div>

        <h1 className="flex items-center justify-between mt-1 font-heading text-3xl leading-tight sm:text-4xl lg:text-5xl">
          <span>{exp.companyName}</span>
          <div className="flex items-center gap-3">
            {exp.githubLink && (
              <CustomTooltip text="View source code on GitHub">
                <a
                  href={exp.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub repository"
                >
                  <Icons.gitHub className="w-6 text-muted-foreground hover:text-primary" />
                </a>
              </CustomTooltip>
            )}
            {exp.websiteLink && (
              <CustomTooltip text="Open live preview or article">
                <a
                  href={exp.websiteLink}
                  target={exp.websiteLink.startsWith("http") ? "_blank" : undefined}
                  rel={exp.websiteLink.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label="External link"
                >
                  <Icons.externalLink className="w-6 text-muted-foreground hover:text-primary" />
                </a>
              </CustomTooltip>
            )}
          </div>
        </h1>

        {exp.subtitle && (
          <p className="mt-2 text-base font-medium text-primary">
            {exp.subtitle}
          </p>
        )}

        <div className="mt-3">
          <ChipContainer textArr={exp.category} />
        </div>

        <div className="mt-4 flex space-x-4">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt="Ahmed Ahmed"
              width={40}
              height={40}
              className="rounded-full bg-background border border-primary/50"
            />
            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">Ahmed Ahmed</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username} • Imperial College London
              </p>
            </div>
          </a>
        </div>
      </div>

      <Image
        src={exp.companyLogoImg}
        alt={exp.companyName}
        width={720}
        height={405}
        className="my-8 rounded-xl border border-border bg-muted transition-colors w-full object-cover"
        priority
      />

      <div className="mb-7">
        <h2 className="inline-block font-heading text-2xl leading-tight lg:text-3xl mb-3">
          Tech Stack &amp; Methods
        </h2>
        <ChipContainer textArr={exp.techStack} />
      </div>

      <div className="mb-8">
        <h2 className="inline-block font-heading text-2xl leading-tight lg:text-3xl mb-3">
          Engineering Architecture &amp; Outcomes
        </h2>
        <ExperienceDescription
          paragraphs={exp.descriptionDetails.paragraphs}
          bullets={exp.descriptionDetails.bullets}
        />
      </div>

      {exp.pagesInfoArr.length > 0 && (
        <div className="mb-7 border-t border-border pt-8">
          <h2 className="font-heading text-2xl leading-tight lg:text-3xl mb-6">
            {exp.pagesInfoTitle || "Key Features & Visuals"}
          </h2>
          {exp.pagesInfoArr.map((page, ind) => (
            <div key={ind} className="mb-8 rounded-xl border border-border bg-card p-5">
              {page.title && (
                <h3 className="flex items-center font-heading text-lg leading-tight lg:text-xl text-foreground">
                  <Icons.star className="h-4 w-4 mr-2 text-primary" /> {page.title}
                </h3>
              )}
              {page.description && (
                <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                  {page.description}
                </p>
              )}

              {page.imgArr.map((img, imgInd) => (
                <Image
                  src={img}
                  key={imgInd}
                  alt={page.title || exp.companyName}
                  width={720}
                  height={405}
                  className="my-4 rounded-lg border border-border bg-muted w-full object-cover"
                  priority
                />
              ))}

              {page.linkURL && (
                <div className="mt-3">
                  <Button asChild variant="default" size="sm">
                    <a
                      href={page.linkURL}
                      target={page.linkURL.startsWith("http") ? "_blank" : undefined}
                      rel={page.linkURL.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      Open Interactive Resource
                      <Icons.externalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <hr className="mt-10 border-border" />
      <div className="flex justify-center py-6">
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
