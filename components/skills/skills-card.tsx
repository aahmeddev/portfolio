import { skillsInterface } from "@/config/skills";

interface SkillsCardProps {
  skills: skillsInterface[];
}

export default function SkillsCard({ skills }: SkillsCardProps) {
  return (
    <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {skills.map((skill, id) => (
        <div
          key={id}
          className="relative overflow-hidden rounded-xl border border-border bg-card p-5 hover:border-primary/45 transition-colors flex flex-col justify-between gap-4"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/30 text-primary">
              <skill.icon size={28} />
            </div>
            <span className="rounded-full bg-muted px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground">
              {skill.category}
            </span>
          </div>
          <div className="space-y-1.5">
            <h3 className="font-bold text-base text-foreground">{skill.name}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {skill.description}
            </p>
          </div>
          <div className="pt-2 border-t border-border/60">
            <p className="text-xs font-semibold text-primary">
              Verified: {skill.evidence}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
