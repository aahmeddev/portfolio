import { Metadata } from "next";

import { CvBinderSpread } from "@/components/cv/cv-binder-spread";
import { pagesConfig } from "@/config/pages";

export const metadata: Metadata = {
  title: pagesConfig.CV.metadata.title,
  description: pagesConfig.CV.metadata.description,
};

export default function ResumePage() {
  return <CvBinderSpread />;
}
