import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import { ClientPageWrapper } from "@/components/common/client-page-wrapper";
import { pagesConfig } from "@/config/pages";
import { siteConfig } from "@/config/site";
import profileImg from "@/public/profile-img.jpg";

export const metadata: Metadata = {
  title: pagesConfig.home.metadata.title,
  description: pagesConfig.home.metadata.description,
  alternates: {
    canonical: siteConfig.url,
  },
};

export default function IndexPage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: siteConfig.authorName,
    url: siteConfig.url,
    image: siteConfig.ogImage,
    jobTitle: "Molecular Bioengineering Undergraduate, Imperial College London",
    sameAs: [siteConfig.links.github, siteConfig.links.linkedin],
  };

  return (
    <ClientPageWrapper className="h-full min-h-full flex items-center">
      <Script
        id="schema-person"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      {/* EXACT 3-PLATE OXBLOOD & BRASS COVER SPREAD (VERTICALLY CENTRED) */}
      <section className="w-full py-2">
        <div className="w-full grid gap-10 lg:grid-cols-12 items-center">
          {/* Left 6 Cols: Identity, Exact Copy, Honours & Actions */}
          <div className="lg:col-span-6 space-y-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              FILE NO. 2026-AA {"//"} IMPERIAL COLLEGE LONDON
            </p>

            <h1 className="font-heading text-5xl sm:text-6xl lg:text-[4.6rem] tracking-tight text-foreground leading-[0.94]">
              Ahmed{" "}
              <span className="italic text-primary font-normal">Ahmed.</span>
            </h1>

            <p className="font-heading text-xl sm:text-[1.35rem] text-foreground/95 leading-snug">
              I study Molecular Bioengineering at Imperial College London, where I split my time between wet-lab experimental biology, scientific software, and diagnostic hardware.
            </p>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              I enjoy working on problems where molecular physics and computation meet directly: writing algorithms to decode raw ionic current traces from nanopore sequencers, tuning peptide nucleic acid surface chemistry for point-of-care cancer assays in the Ladame Lab, building multi-core geochemical modelling tools at Nanolyse Technologies, and designing low-noise biopotential circuits and optical instruments.
            </p>

            <div className="flex flex-wrap gap-2.5 pt-1">
              <span className="inline-flex items-center bg-primary text-primary-foreground px-3 py-1.5 font-mono text-[11px] font-semibold">
                IET Future Talent Boost Scholarship (2026)
              </span>
              <span className="inline-flex items-center bg-background/70 border border-primary/40 px-3 py-1.5 font-mono text-[11px] text-foreground">
                2x Imperial Dean&apos;s List (Top 10%)
              </span>
              <span className="inline-flex items-center bg-background/70 border border-primary/40 px-3 py-1.5 font-mono text-[11px] text-foreground">
                Y2 Best Design Group Project Prize
              </span>
            </div>

            {/* Bottom-Left Clickable Mini Specimen Plates (Pull Out Directly From Cover!) */}
            <div className="pt-2 space-y-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                MORE SPECIMENS TO PULL OUT &uarr;
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Link
                  href="/projects/nanopore-basecalling"
                  className="group flex items-center gap-3 p-2.5 bg-background/90 border border-primary/35 shadow-[4px_4px_0_rgba(212,77,77,0.22)] hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-primary/30 bg-[#120e10]">
                    <Image
                      src="/projects/nanopore-hmm-basecaller/nanopore_flowcell_photo.jpg"
                      alt="Oxford Nanopore MinION Flowcell"
                      fill
                      sizes="64px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.11em] text-primary truncate">
                      PLATE 03 {"//"} SEQUENCING
                    </p>
                    <p className="font-heading text-[15.5px] text-foreground group-hover:text-primary transition-colors leading-tight my-0.5 truncate">
                      HMM Basecaller
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground truncate">
                      81% vs Dorado &uarr;
                    </p>
                  </div>
                </Link>

                <Link
                  href="/projects/pulse-oximeter-spectrophotometer"
                  className="group flex items-center gap-3 p-2.5 bg-background/90 border border-primary/35 shadow-[4px_4px_0_rgba(212,77,77,0.22)] hover:border-primary hover:-translate-y-0.5 transition-all"
                >
                  <div className="relative w-14 h-14 shrink-0 overflow-hidden border border-primary/30 bg-[#120e10]">
                    <Image
                      src="/projects/pulse-oximeter-spectrophotometer/cad_isometric.png"
                      alt="Custom Linear CCD Spectrophotometer CAD"
                      fill
                      sizes="64px"
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="min-w-0">
                    <p className="font-mono text-[9.5px] uppercase tracking-[0.11em] text-primary truncate">
                      PLATE 04 {"//"} OPTICS CAD
                    </p>
                    <p className="font-heading text-[15.5px] text-foreground group-hover:text-primary transition-colors leading-tight my-0.5 truncate">
                      CCD Spectrometer
                    </p>
                    <p className="font-mono text-[10px] text-muted-foreground truncate">
                      SolidWorks + STM32 &uarr;
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: Exact 3-Plate Tactile Collage (Portrait + MYOWAVE PCB + 365 nm UV QDs) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-5 items-start">
            {/* Top-Left: Portrait Plate */}
            <Link
              href="/experience"
              className="group oxblood-plate tilt-neg bg-background/90 p-3.5 block"
            >
              <div className="relative w-full aspect-square overflow-hidden border border-primary/25 mb-2.5">
                <Image
                  src={profileImg}
                  alt="Ahmed Ahmed"
                  fill
                  priority
                  className="object-cover group-hover:scale-[1.02] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">
                PORTRAIT {"//"} LONDON
              </p>
            </Link>

            {/* Top-Right: MYOWAVE PCB Plate (Click -> Pulls Out Project Sheet!) */}
            <Link
              href="/projects/myowave-ehg-platform"
              className="group oxblood-plate tilt-pos sm:mt-5 bg-background/90 p-3.5 block"
            >
              <div className="relative w-full aspect-square overflow-hidden border border-primary/25 bg-[#120e10] mb-2.5">
                <Image
                  src="/projects/myowave-ehg/pcb_angled_3d.png"
                  alt="MYOWAVE 24-Bit Biopotential PCB"
                  fill
                  className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
              </div>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">
                PLATE 01 {"//"} MYOWAVE PCB &uarr;
              </p>
            </Link>

            {/* Bottom Full-Width: 365 nm UV Quantum Dots Plate (Click -> Pulls Out Blog Essay!) */}
            <Link
              href="/blog/nanorods-and-quantum-dots"
              className="group sm:col-span-2 oxblood-plate tilt-soft bg-background/90 p-3.5 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center"
            >
              <div className="sm:col-span-6 relative w-full aspect-[16/10] overflow-hidden border border-primary/25 bg-[#120e10]">
                <Image
                  src="/blogs/nanorods-qds/quantum_dots_uv_photo.jpg"
                  alt="Quantum Dots & Plasmonic Nanorods"
                  fill
                  className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
              </div>
              <div className="sm:col-span-6 space-y-1.5">
                <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary">
                  PLATE 02 {"//"} 365 NM UV &uarr;
                </p>
                <h2 className="font-heading text-lg sm:text-xl text-foreground group-hover:text-primary transition-colors leading-snug">
                  Quantum Dots &amp; Plasmonic Nanorods
                </h2>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Colloidal nanocrystals &amp; oleylamine surface trap passivation.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>
    </ClientPageWrapper>
  );
}
