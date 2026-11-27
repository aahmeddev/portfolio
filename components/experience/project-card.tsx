import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { ProjectInterface } from "@/config/experience";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: ProjectInterface;
  index?: number;
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const detailLink = `/projects/${project.id}`;
  const isPhoto = String(project.companyLogoImg).endsWith(".jpg");

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between h-full bg-card oxblood-plate p-5 rounded-sm",
        index % 3 === 0 ? "tilt-neg" : index % 3 === 1 ? "tilt-pos" : "tilt-soft"
      )}
    >
      <div>
        <Link href={detailLink} className="block">
          <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-border/80 bg-[#120e10]">
            <Image
              className={cn(
                "group-hover:scale-[1.02] transition-transform duration-300",
                isPhoto ? "object-cover" : "object-contain p-2 bg-[#120e10]"
              )}
              src={project.companyLogoImg}
              alt={project.companyName}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            {project.badge && (
              <span className="absolute top-2.5 left-2.5 bg-background/95 px-2.5 py-1 text-[11px] font-mono font-semibold text-primary border border-primary/40">
                {project.badge}
              </span>
            )}
          </div>
        </Link>

        {project.subtitle && (
          <p className="text-xs font-mono text-primary/90 mb-2 leading-snug line-clamp-1">
            {project.subtitle}
          </p>
        )}

        <Link href={detailLink} className="block">
          <h3 className="font-heading text-lg sm:text-xl leading-snug text-foreground group-hover:text-primary transition-colors">
            {project.companyName}
          </h3>
        </Link>

        <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.shortDescription}
        </p>
      </div>

      <div className="pt-4 mt-4 border-t border-border/60 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-muted px-2 py-0.5 text-[11px] font-mono text-muted-foreground border border-border/50"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.companyName} GitHub repository`}
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Icons.gitHub className="w-3.5 h-3.5" />
            </a>
          )}
          <Link
            href={detailLink}
            className="inline-flex items-center text-xs font-mono font-semibold text-primary group-hover:translate-x-0.5 transition-transform"
          >
            View Specs
            <Icons.chevronRight className="w-3.5 h-3.5 ml-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
