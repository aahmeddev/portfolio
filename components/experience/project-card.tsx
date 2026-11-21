import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { Button } from "@/components/ui/button";
import ChipContainer from "@/components/ui/chip-container";
import { ProjectInterface } from "@/config/experience";

interface ProjectCardProps {
  project: ProjectInterface;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const detailLink = `/projects/${project.id}`;

  return (
    <div className="group relative flex flex-col justify-between p-5 h-full bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-lg transition-all duration-200">
      <div>
        <div className="relative w-full h-[185px] overflow-hidden rounded-lg border border-border bg-muted/40">
          <Image
            className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
            src={project.companyLogoImg}
            alt={project.companyName}
            fill
          />
          {project.badge && (
            <span className="absolute top-2.5 left-2.5 rounded-md bg-background/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-primary border border-primary/40 shadow-sm">
              {project.badge}
            </span>
          )}
        </div>

        <div className="pt-4 space-y-2">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {project.companyName}
            </h3>
          </div>
          {project.subtitle && (
            <p className="text-xs font-medium text-primary/90">
              {project.subtitle}
            </p>
          )}
          <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-border/60 space-y-3">
        <div className="flex gap-1.5 flex-wrap">
          <ChipContainer textArr={project.techStack.slice(0, 5)} />
        </div>

        <div className="flex items-center justify-between gap-2 pt-1">
          <Link href={detailLink} className="flex-1">
            <Button variant="default" size="sm" className="w-full">
              Technical Case Study
              <Icons.chevronRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.companyName} GitHub repository`}
            >
              <Button variant="outline" size="sm" className="px-2.5">
                <Icons.gitHub className="w-4 h-4" />
              </Button>
            </a>
          )}
          {project.websiteLink && (
            <a
              href={project.websiteLink}
              target={project.websiteLink.startsWith("http") ? "_blank" : undefined}
              rel={project.websiteLink.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={`${project.companyName} live preview`}
            >
              <Button variant="outline" size="sm" className="px-2.5">
                <Icons.externalLink className="w-4 h-4" />
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
