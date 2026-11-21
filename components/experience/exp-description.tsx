import React from "react";
import MathText from "@/components/common/math-text";

const ExperienceDescription: React.FC<{
  paragraphs: string[];
  bullets: string[];
}> = ({ paragraphs, bullets }) => {
  return (
    <div className="space-y-4">
      {paragraphs.map((paragraph, index) => (
        <div className="text-sm sm:text-base text-muted-foreground leading-relaxed" key={index}>
          <MathText text={paragraph} />
        </div>
      ))}
      <ul className="space-y-2.5 pt-2">
        {bullets.map((bullet, index) => (
          <li
            key={index}
            className="flex items-start gap-2.5 text-sm sm:text-base text-foreground/95 leading-relaxed rounded-lg border border-border/70 bg-muted/30 px-4 py-3"
          >
            <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
            <div className="flex-1">
              <MathText text={bullet} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExperienceDescription;
