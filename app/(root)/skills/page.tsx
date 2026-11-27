import { Metadata } from "next";

import { SkillsWorkbench } from "@/components/skills/skills-workbench";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.skills.metadata.title,
  description: pagesConfig.skills.description,
};

export default function SkillsPage() {
  return <SkillsWorkbench />;
}
