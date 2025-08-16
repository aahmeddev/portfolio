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
  let exp = Experiences.find((val) => val.id === params.expId);
  if (!exp) {
    redirect("/projects");
  }

  return (
    <article className="container relative max-w-3xl py-6 lg:py-10">
      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute left-[-200px] top-14 hidden xl:inline-flex"
        )}
      >
        <Icons.chevronLeft className="mr-2 h-4 w-4" />
        Project List
      </Link>
      <div>
        <time
          dateTime={Date.now().toString()}
          className="block text-sm text-muted-foreground"
        >
          {formatDateFromObj(exp.startDate)}
        </time>
        <h1 className="flex items-center justify-between mt-2 font-heading text-4xl leading-tight lg:text-5xl">
          {exp.companyName}
          <div className="flex items-center">
            {exp.githubLink && (
              <CustomTooltip text="Link to the source code.">
                <Link href={exp.githubLink} target="_blank">
                  <Icons.gitHub className="w-6 ml-4 text-muted-foreground hover:text-foreground" />
                </Link>
              </CustomTooltip>
            )}
            {exp.websiteLink && (
              <CustomTooltip text="Please note that some project links may be temporarily unavailable.">
                <Link href={exp.websiteLink} target="_blank">
                  <Icons.externalLink className="w-6 ml-4 text-muted-foreground hover:text-foreground " />
                </Link>
              </CustomTooltip>
            )}
          </div>
        </h1>
        <ChipContainer textArr={exp.category} />
        <div className="mt-4 flex space-x-4">
          <Link
            href={siteConfig.links.github}
            className="flex items-center space-x-2 text-sm"
          >
            <Image
              src={profileImg}
              alt={"Ahmed Ahmed"}
              width={42}
              height={42}
              className="rounded-full bg-background"
            />

            <div className="flex-1 text-left leading-tight">
              <p className="font-medium">{"Ahmed Ahmed"}</p>
              <p className="text-[12px] text-muted-foreground">
                @{siteConfig.username}
              </p>
            </div>
          </Link>
        </div>
      </div>

      <Image
        src={exp.companyLogoImg}
        alt={exp.companyName}
        width={720}
        height={405}
        className="my-8 rounded-md border bg-muted transition-colors"
        priority
      />

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Tech Stack
        </h2>
        <ChipContainer textArr={exp.techStack} />
      </div>

      <div className="mb-7 ">
        <h2 className="inline-block font-heading text-3xl leading-tight lg:text-3xl mb-2">
          Description
        </h2>
        <ExperienceDescription
          paragraphs={exp.descriptionDetails.paragraphs}
          bullets={exp.descriptionDetails.bullets}
        />
      </div>

      {/* --- THIS IS THE UPDATED SECTION --- */}
      <div className="mb-7">
        <h2 className="text-center font-heading text-3xl leading-tight lg:text-3xl mb-5">
          {exp.pagesInfoTitle || 'Key Features'}
        </h2>
        {exp.pagesInfoArr.map((page, ind) => (
          <div key={ind} className="mb-8 text-center">
            <h3 className="flex items-center justify-center font-heading text-xl leading-tight lg:text-xl">
              <Icons.star className="h-5 w-5 mr-2" /> {page.title}
            </h3>
            <p className="text-muted-foreground mt-1 max-w-xl mx-auto">{page.description}</p>

            {page.imgArr.map((img, imgInd) => (
              <Image
                src={img}
                key={imgInd}
                alt={page.title}
                width={720}
                height={405}
                className="my-4 rounded-md border bg-muted transition-colors"
                priority
              />
            ))}

            {page.linkURL && (
              <div className="mt-3">
                <Button asChild variant="outline">
                  <a href={page.linkURL} target="_blank" rel="noopener noreferrer">
                    View Preview <Icons.externalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>

      <hr className="mt-12" />
      <div className="flex justify-center py-6 lg:py-10">
        <Link
          href="/projects"
          className={cn(buttonVariants({ variant: "ghost" }))}
        >
          <Icons.chevronLeft className="mr-2 h-4 w-4" />
          All Projects
        </Link>
      </div>
    </article>
  );
}