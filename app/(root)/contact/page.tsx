import { Metadata } from "next";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import PageContainer from "@/components/common/page-container";
import { buttonVariants } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.contact.metadata.title,
  description: pagesConfig.contact.metadata.description,
};

export default function ContactPage() {
  return (
    <PageContainer
      title={pagesConfig.contact.title}
      description={pagesConfig.contact.description}
    >
      <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-2">
            <span className="inline-block rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Direct Email &amp; Profiles
            </span>
            <h2 className="font-heading text-2xl text-foreground">
              Get in Touch
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Whether you are hiring for computational biology, nanopore sequencing, diagnostic assay R&amp;D, or embedded bioinstrumentation roles, feel free to reach out directly by email or LinkedIn.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <a
              href="mailto:ahmed.ia.ahmed@gmail.com"
              className={cn(buttonVariants({ variant: "default", size: "lg" }), "w-full justify-start")}
            >
              <Icons.gmail className="w-4 h-4 mr-2.5" />
              ahmed.ia.ahmed@gmail.com
            </a>
            <Link
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full justify-start")}
            >
              <Icons.linkedin className="w-4 h-4 mr-2.5" />
              linkedin.com/in/ahmediaahmed
            </Link>
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full justify-start")}
            >
              <Icons.gitHub className="w-4 h-4 mr-2.5" />
              github.com/aahmeddev
            </Link>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="inline-block rounded-md bg-primary/15 px-2.5 py-0.5 text-xs font-semibold text-primary">
              Availability &amp; Details
            </span>
            <h2 className="font-heading text-2xl text-foreground">
              Placement &amp; Research Scope
            </h2>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>
                <strong className="text-foreground">Degree:</strong> MEng Molecular Bioengineering, Imperial College London (First Class Honours, Yr 1: 81.57%, Yr 2: 77.95%)
              </li>
              <li>
                <strong className="text-foreground">Base Locations:</strong> London, UK (Imperial South Kensington / W14) &amp; Oxford, UK
              </li>
              <li>
                <strong className="text-foreground">Availability:</strong> Summer 2027 internships (from June 2027) &amp; 12-month industrial placements (2027-2028)
              </li>
              <li>
                <strong className="text-foreground">Right to Work:</strong> Full right to work in the United Kingdom
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-border/60">
            <a
              href="/portfolio/Ahmed_Ahmed_CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ variant: "secondary", size: "sm" }), "w-full")}
            >
              Download 1-Page Biotech CV (PDF)
              <Icons.externalLink className="ml-2 h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
