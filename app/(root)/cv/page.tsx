import { Metadata } from "next";
import Link from "next/link";

import { Icons } from "@/components/common/icons";
import PageContainer from "@/components/common/page-container";
import { Button, buttonVariants } from "@/components/ui/button";
import { pagesConfig } from "@/config/pages";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: pagesConfig.CV.metadata.title,
  description: pagesConfig.CV.metadata.description,
};

const year2Modules = [
  { name: "Programming 2", mark: "93.75%", ects: "5.00" },
  { name: "Mathematics and Engineering 2", mark: "79.38%", ects: "15.00" },
  { name: "Medical and Biochemical Science 2", mark: "78.86%", ects: "15.00" },
  { name: "Design and Professional Practice 2", mark: "74.30%", ects: "10.00" },
  { name: "Molecules, Materials and Measurement 2", mark: "72.77%", ects: "15.00" },
];

const year1Modules = [
  { name: "Molecules and Energetics 1", mark: "83.85%", ects: "15.00" },
  { name: "Medical and Biochemical Science 1", mark: "82.51%", ects: "15.00" },
  { name: "Computer Fundamentals and Programming 1", mark: "80.85%", ects: "10.00" },
  { name: "Mathematics and Engineering 1", mark: "79.90%", ects: "15.00" },
  { name: "Design and Professional Practice 1", mark: "78.40%", ects: "5.00" },
  { name: "Arabic Level 1", mark: "Pass with Distinction", ects: "7.50" },
];

export default function ResumePage() {
  return (
    <PageContainer
      title={pagesConfig.CV.title}
      description={pagesConfig.CV.description}
    >
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Top Action Banner */}
        <div className="rounded-xl border border-primary/40 bg-primary/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-heading text-xl sm:text-2xl text-foreground">
              Download 1-Page Biotech &amp; Computational Biology CV
            </h2>
            <p className="text-sm text-muted-foreground">
              Typeset in XeLaTeX and reconciled against the official Imperial College London pre-award academic transcript.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild size="lg">
              <a
                href="/portfolio/Ahmed_Ahmed_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open / Download PDF
                <Icons.externalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        {/* Academic Record & Awards */}
        <div className="rounded-xl border border-border bg-card p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-border pb-4">
            <div>
              <h3 className="font-heading text-2xl text-foreground">
                Imperial College London
              </h3>
              <p className="text-sm font-medium text-primary">
                MEng Molecular Bioengineering (Department of BioEngineering)
              </p>
            </div>
            <span className="rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium">
              Sep 2024 - Jun 2028 (Expected)
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-border bg-muted/40 p-3.5">
              <p className="text-xs text-muted-foreground">Overall Standing</p>
              <p className="font-heading text-lg text-primary mt-0.5">
                First Class Honours
              </p>
              <p className="text-xs text-muted-foreground">
                Year 1: 81.57% • Year 2: 77.95%
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3.5">
              <p className="text-xs text-muted-foreground">Academic Distinction</p>
              <p className="font-heading text-lg text-primary mt-0.5">
                2x Dean&apos;s List
              </p>
              <p className="text-xs text-muted-foreground">
                Year 1 &amp; Year 2 (Top 10% of Cohort)
              </p>
            </div>
            <div className="rounded-lg border border-border bg-muted/40 p-3.5">
              <p className="text-xs text-muted-foreground">Departmental Prize</p>
              <p className="font-heading text-lg text-primary mt-0.5">
                Best Design Project
              </p>
              <p className="text-xs text-muted-foreground">
                Year 2 Molecular Bioengineering Prize (MYOWAVE)
              </p>
            </div>
          </div>

          {/* Verified Module Tables */}
          <div className="grid gap-6 md:grid-cols-2 pt-2">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
                Year 2 Verified Marks (2025-2026 | Overall: 77.95%)
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="p-2.5 font-medium">Module</th>
                      <th className="p-2.5 font-medium text-right">Mark</th>
                      <th className="p-2.5 font-medium text-right">ECTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {year2Modules.map((m) => (
                      <tr key={m.name}>
                        <td className="p-2.5">{m.name}</td>
                        <td className="p-2.5 text-right font-semibold text-primary">
                          {m.mark}
                        </td>
                        <td className="p-2.5 text-right text-muted-foreground">
                          {m.ects}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-primary mb-2.5">
                Year 1 Verified Marks (2024-2025 | Overall: 81.57%)
              </h4>
              <div className="rounded-lg border border-border overflow-hidden">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-muted/60 text-muted-foreground">
                    <tr>
                      <th className="p-2.5 font-medium">Module</th>
                      <th className="p-2.5 font-medium text-right">Mark</th>
                      <th className="p-2.5 font-medium text-right">ECTS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {year1Modules.map((m) => (
                      <tr key={m.name}>
                        <td className="p-2.5">{m.name}</td>
                        <td className="p-2.5 text-right font-semibold text-primary">
                          {m.mark}
                        </td>
                        <td className="p-2.5 text-right text-muted-foreground">
                          {m.ects}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-border/60 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs sm:text-sm text-muted-foreground">
            <span>
              <strong className="text-foreground">Cheney School, Oxford (2022 - 2024):</strong> A-Levels in Biology (A*), Chemistry (A*), Mathematics (A*) • Extended Project Qualification (A*) • 11 Grade 9 GCSEs
            </span>
          </div>
        </div>

        {/* Embedded PDF Preview */}
        <div className="rounded-xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Inline 1-Page PDF Preview
            </span>
            <Link
              href="/experience"
              className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
            >
              Interactive Experience Timeline
              <Icons.chevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <iframe
            src="/portfolio/Ahmed_Ahmed_CV.pdf"
            title="Ahmed Ahmed 1-Page CV PDF"
            className="w-full h-[820px] rounded-lg border border-border bg-white"
          />
        </div>
      </div>
    </PageContainer>
  );
}
