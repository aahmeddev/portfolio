"use client";

import React, { useState } from "react";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import { CareerExperienceInterface } from "@/config/career";
import { cn } from "@/lib/utils";

export function ExperienceDossier({
  experiences,
}: {
  experiences: CareerExperienceInterface[];
}) {
  const [selectedId, setSelectedId] = useState(experiences[0]?.id ?? "");
  const active =
    experiences.find((e) => e.id === selectedId) ?? experiences[0];

  if (!active) return null;

  return (
    <div className="space-y-6">
      {/* Compact Imperial Academic Anchor Strip */}
      <div className="border-b border-primary/30 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">
            Academic Foundation · 2024 – 2028
          </span>
          <h2 className="font-heading text-xl sm:text-2xl text-foreground">
            Imperial College London — MEng Molecular Bioengineering
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
            First Class Honours (Y1: 81.57%, Y2: 77.95%) · 2x Dean&apos;s List · Y2 Best Design Group Project Prize (MYOWAVE) · IET Boost Scholar (2026)
          </p>
        </div>
        <Link
          href="/cv"
          className="shrink-0 font-mono text-xs uppercase tracking-wider text-primary border border-primary/45 px-3 py-2 hover:bg-primary hover:text-primary-foreground transition-colors inline-flex items-center gap-1.5"
        >
          06 · CV &amp; Transcript
          <Icons.chevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Interactive Split-Desk Role Index + Live Inspection Plate */}
      <div className="grid gap-7 lg:grid-cols-12 items-start">
        {/* Left 5 Cols: Clickable Stamped Role Index */}
        <div className="lg:col-span-5 space-y-3">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground mb-1">
            Select a role dossier ({experiences.length} entries) &darr;
          </p>
          {experiences.map((role, idx) => {
            const isSelected = role.id === active.id;
            return (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedId(role.id)}
                className={cn(
                  "w-full text-left p-4 border transition-all duration-150 block",
                  isSelected
                    ? "bg-background border-primary shadow-[5px_5px_0_rgba(212,77,77,0.3)] translate-x-1"
                    : "bg-background/45 border-primary/25 hover:border-primary/65 hover:bg-background/75"
                )}
              >
                <div className="flex items-center justify-between gap-2 font-mono text-[10.5px]">
                  <span className="text-primary font-semibold">
                    0{idx + 1} {"//"} {role.period}
                  </span>
                  {isSelected && (
                    <span className="text-accent font-semibold">ACTIVE</span>
                  )}
                </div>
                <h3 className="font-heading text-base sm:text-lg text-foreground mt-1 leading-snug">
                  {role.position}
                </h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {role.company}
                </p>
              </button>
            );
          })}
        </div>

        {/* Right 7 Cols: Live Oxblood Inspection Plate */}
        <article className="lg:col-span-7 bg-background/90 oxblood-plate p-6 sm:p-7 space-y-5">
          <div className="border-b border-primary/30 pb-4 space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-[11px]">
              <span className="bg-primary text-primary-foreground px-2.5 py-0.5 font-semibold">
                {active.badge}
              </span>
              <span className="text-muted-foreground">
                {active.period} · {active.location}
              </span>
            </div>
            <h3 className="font-heading text-2xl sm:text-3xl text-foreground pt-1 leading-tight">
              {active.position}
            </h3>
            <p className="text-sm font-medium text-primary">{active.company}</p>
            <p className="text-sm text-foreground/90 leading-relaxed pt-1">
              {active.summary}
            </p>
          </div>

          <div className="space-y-2.5">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
              Key Impact &amp; Outcomes
            </h4>
            <ul className="space-y-2 border-l-2 border-accent pl-4">
              {active.achievements.map((item, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-foreground/95 leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h4 className="font-mono text-[11px] uppercase tracking-[0.12em] text-primary">
              Technical Scope
            </h4>
            <ul className="list-disc pl-4 space-y-1.5">
              {active.description.map((d, i) => (
                <li
                  key={i}
                  className="text-xs sm:text-sm text-muted-foreground leading-relaxed"
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-primary/25 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[11px] text-muted-foreground">
            {active.skills.map((s, i) => (
              <span key={i}>
                <span className="text-primary">/ </span>
                {s}
              </span>
            ))}
          </div>
        </article>
      </div>
    </div>
  );
}
