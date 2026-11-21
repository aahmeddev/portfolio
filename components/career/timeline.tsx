"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";

import { Icons } from "@/components/common/icons";
import ChipContainer from "@/components/ui/chip-container";
import { CareerExperienceInterface } from "@/config/career";

interface TimelineItemProps {
  experience: CareerExperienceInterface;
  isLast: boolean;
  isExpanded: boolean;
  toggleExpand: (id: string) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  experience,
  isLast,
  isExpanded,
  toggleExpand,
}) => {
  return (
    <div className="relative">
      {!isLast && (
        <div className="absolute left-5 sm:left-6 top-12 w-0.5 bg-border h-full z-0" />
      )}

      <div className="flex mb-6 relative">
        <div className="relative z-10">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/15 border border-primary/40 flex items-center justify-center shadow-sm">
            <Icons.work className="w-5 h-5 text-primary" />
          </div>
        </div>

        <div className="ml-4 sm:ml-6 flex-1">
          <div
            className={`p-5 sm:p-6 rounded-xl border bg-card transition-all duration-200 cursor-pointer ${
              isExpanded
                ? "border-primary/50 shadow-md"
                : "border-border hover:border-primary/35"
            }`}
            onClick={() => toggleExpand(experience.id)}
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
                    {experience.badge}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {experience.location}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground pt-0.5">
                  {experience.position}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-medium text-muted-foreground">
                    {experience.company}
                  </span>
                  {experience.companyUrl && (
                    <Link
                      href={experience.companyUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-muted-foreground hover:text-primary"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Icons.externalLink className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-1 sm:pt-0">
                <span className="inline-flex items-center rounded-full border border-border bg-muted/60 px-3 py-1 text-xs font-medium text-foreground whitespace-nowrap">
                  {experience.period}
                </span>
                <motion.div
                  animate={{ rotate: isExpanded ? 180 : 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <Icons.chevronDown className="w-4 h-4 text-muted-foreground" />
                </motion.div>
              </div>
            </div>

            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {experience.summary}
            </p>

            {isExpanded && (
              <div className="pt-4 mt-4 border-t border-border space-y-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
                    Key Outcomes &amp; Impact
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {experience.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-foreground leading-relaxed">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Technical &amp; Experimental Execution
                  </h4>
                  <ul className="list-disc pl-5 space-y-1.5">
                    {experience.description.map((desc, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground leading-relaxed">
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>

                {experience.skills.length > 0 && (
                  <div className="pt-1">
                    <ChipContainer textArr={experience.skills} />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface TimelineProps {
  experiences: CareerExperienceInterface[];
}

const Timeline: React.FC<TimelineProps> = ({ experiences }) => {
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    "ladame-lab-urop": true,
    "nanolyse-technologies": true,
  });

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-4xl mx-auto py-4">
      {experiences.map((experience, index) => (
        <TimelineItem
          key={experience.id}
          experience={experience}
          isLast={index === experiences.length - 1}
          isExpanded={!!expandedIds[experience.id]}
          toggleExpand={toggleExpand}
        />
      ))}
    </div>
  );
};

export default Timeline;
