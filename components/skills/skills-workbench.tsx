"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type IconKey =
  | "code"
  | "zap"
  | "brain"
  | "eye"
  | "wave"
  | "dna"
  | "flask"
  | "chart"
  | "cell"
  | "target"
  | "grid"
  | "chip"
  | "cube"
  | "db"
  | "git"
  | "doc"
  | "award";

interface AtomicSkill {
  name: string;
  icon: IconKey;
  proof: string;
}

interface SkillDomain {
  id: "seq" | "wet" | "hdw" | "str";
  code: string;
  num: string;
  tiltClass: string;
  title: string;
  highlight: string;
  img: string;
  imgFit?: "cover" | "contain";
  skills: AtomicSkill[];
}

function SkillSvg({ name, className = "w-[14.5px] h-[14.5px]" }: { name: IconKey; className?: string }) {
  const props = {
    className: cn("shrink-0", className),
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "code":
      return (
        <svg {...props}>
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      );
    case "zap":
      return (
        <svg {...props}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      );
    case "brain":
      return (
        <svg {...props}>
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="18" cy="18" r="2.5" />
          <line x1="8.3" y1="10.8" x2="15.7" y2="7.2" />
          <line x1="8.3" y1="13.2" x2="15.7" y2="16.8" />
        </svg>
      );
    case "eye":
      return (
        <svg {...props}>
          <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z" />
          <circle cx="12" cy="12" r="2.5" />
        </svg>
      );
    case "wave":
      return (
        <svg {...props}>
          <polyline points="2 12 6 12 9 4 14 20 17 12 22 12" />
        </svg>
      );
    case "dna":
      return (
        <svg {...props}>
          <path d="M6 3c0 5 12 5 12 9s-12 4-12 9" />
          <path d="M18 3c0 5-12 5-12 9s12 4 12 9" />
          <line x1="8" y1="6" x2="16" y2="6" />
          <line x1="8" y1="18" x2="16" y2="18" />
        </svg>
      );
    case "flask":
      return (
        <svg {...props}>
          <path d="M9 3h6" />
          <path d="M10 3v6.5L4.5 19a2 2 0 0 0 1.7 3h11.6a2 2 0 0 0 1.7-3L14 9.5V3" />
          <line x1="7.5" y1="15" x2="16.5" y2="15" />
        </svg>
      );
    case "chart":
      return (
        <svg {...props}>
          <line x1="4" y1="20" x2="20" y2="20" />
          <rect x="6" y="11" width="3" height="9" />
          <rect x="11" y="6" width="3" height="14" />
          <rect x="16" y="9" width="3" height="11" />
        </svg>
      );
    case "cell":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="11" cy="11" r="2.5" />
          <circle cx="15.5" cy="15" r="1" />
        </svg>
      );
    case "target":
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <line x1="12" y1="2" x2="12" y2="5" />
          <line x1="12" y1="19" x2="12" y2="22" />
        </svg>
      );
    case "grid":
      return (
        <svg {...props}>
          <rect x="3" y="3" width="7" height="7" />
          <rect x="14" y="3" width="7" height="7" />
          <rect x="3" y="14" width="7" height="7" />
          <rect x="14" y="14" width="7" height="7" />
        </svg>
      );
    case "chip":
      return (
        <svg {...props}>
          <rect x="6" y="6" width="12" height="12" rx="1" />
          <line x1="9" y1="2" x2="9" y2="6" />
          <line x1="15" y1="2" x2="15" y2="6" />
          <line x1="9" y1="18" x2="9" y2="22" />
          <line x1="15" y1="18" x2="15" y2="22" />
          <line x1="2" y1="9" x2="6" y2="9" />
          <line x1="2" y1="15" x2="6" y2="15" />
          <line x1="18" y1="9" x2="22" y2="9" />
          <line x1="18" y1="15" x2="22" y2="15" />
        </svg>
      );
    case "cube":
      return (
        <svg {...props}>
          <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
          <polyline points="3 7 12 12 21 7" />
          <line x1="12" y1="12" x2="12" y2="22" />
        </svg>
      );
    case "db":
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5" rx="8" ry="3" />
          <path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
          <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
        </svg>
      );
    case "git":
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="2.5" />
          <circle cx="18" cy="6" r="2.5" />
          <circle cx="6" cy="18" r="2.5" />
          <line x1="6" y1="8.5" x2="6" y2="15.5" />
          <path d="M18 8.5c0 4-4 5-12 5" />
        </svg>
      );
    case "doc":
      return (
        <svg {...props}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="8" y1="13" x2="16" y2="13" />
          <line x1="8" y1="17" x2="13" y2="17" />
        </svg>
      );
    case "award":
      return (
        <svg {...props}>
          <circle cx="12" cy="9" r="5.5" />
          <polyline points="8.5 14 7 22 12 19.5 17 22 15.5 14" />
        </svg>
      );
  }
}

const DOMAIN_ICONS: Record<SkillDomain["id"], IconKey> = {
  seq: "dna",
  wet: "flask",
  hdw: "chip",
  str: "award",
};

const DOMAINS: SkillDomain[] = [
  {
    id: "seq",
    code: "SEQ",
    num: "01",
    tiltClass: "lg:-rotate-[0.8deg]",
    title: "Sequencing, Bioinformatics & ML",
    highlight: "81% HMM Nanopore Basecaller (vs Dorado) & Multi-Threaded FASTQ QC Suite",
    img: "/projects/nanopore-hmm-basecaller/nanopore_flowcell_photo.jpg",
    imgFit: "cover",
    skills: [
      { name: "Python 3", icon: "code", proof: "Log-space 1,025-state HMM nanopore basecaller & SciPy 250 Hz pipelines (93.75% in Programming 2)." },
      { name: "Numba JIT", icon: "zap", proof: "Compiled Baum-Welch & Viterbi decoding loops powering the 81% HMM Nanopore Basecaller vs Dorado." },
      { name: "PyTorch", icon: "brain", proof: "Custom MedResNet residual CNN with AdamW & cosine annealing (0.9673 Held-Out ROC-AUC, PneumoniaMNIST)." },
      { name: "Grad-CAM", icon: "eye", proof: "Pure-PyTorch class activation saliency heatmaps for medical imaging interpretability." },
      { name: "HMMs", icon: "wave", proof: "1,025-state Hidden Markov Model (Baum-Welch, Viterbi) decoding raw nanopore ionic current." },
      { name: "POD5 / FASTQ", icon: "dna", proof: "Raw Oxford Nanopore POD5 signal parsing and multi-threaded FASTQ/FASTA quality control (QCToolkit)." },
      { name: "Biopython", icon: "dna", proof: "Bio.SeqIO, Bio.Align sequence pipelines and automated Dorado basecaller benchmarking." },
      { name: "Java 22", icon: "code", proof: "Multi-threaded desktop FASTQ QC suite using ExecutorService worker pools and JavaFX (QCToolkit)." },
      { name: "SciPy / NumPy", icon: "chart", proof: "Pandas, NumPy, SciPy & statsmodels (Tukey HSD) statistical analysis across lab and signal pipelines." },
      { name: "DTW Alignment", icon: "wave", proof: "Dynamic Time Warping ionic current-to-reference alignment for nanopore basecalling validation." },
      { name: "PHREEQC", icon: "flask", proof: "Multi-core phreeqpy & USGS IPhreeqc C++ chemical speciation batch runners." },
      { name: "CodonCode Aligner", icon: "dna", proof: "Bisulphite CpG methylation chromatogram analysis (COL1A1 hypermethylation, p = 0.002)." },
      { name: "Streamlit / Plotly", icon: "chart", proof: "Interactive Gene Expression Explorer, NiceGUI dashboards, Seaborn & Matplotlib visualisations." },
    ],
  },
  {
    id: "wet",
    code: "WET",
    num: "02",
    tiltClass: "lg:rotate-[0.9deg] lg:translate-y-1",
    title: "Wet-Lab Bioassays & Molecular Biology",
    highlight: "30% miRFlow Cancer Assay Gain & 50+ Conjugates Purified via RP-HPLC",
    img: "/blogs/nanorods-qds/quantum_dots_uv_photo.jpg",
    imgFit: "cover",
    skills: [
      { name: "RP-HPLC", icon: "flask", proof: "Reverse-Phase HPLC (C18 column, UV 280 nm) purifying 50+ PNA-backfiller conjugates (Ladame Lab)." },
      { name: "Flow Cytometry", icon: "cell", proof: "Beckman Coulter CytoFlex acquisition (CytExpert) for miRFlow cancer diagnostic bioassays." },
      { name: "FlowJo", icon: "target", proof: "Singlet and microbead conjugate gating analysis driving 30% miRFlow assay sensitivity gain." },
      { name: "Bioconjugation", icon: "flask", proof: "Thiol-maleimide Michael addition chemistry synthesising diagnostic PNA-backfiller probes." },
      { name: "PNA Assays", icon: "dna", proof: "Peptide Nucleic Acid & streptavidin microbead assays for Ladame Lab spinout diagnostics." },
      { name: "Factorial DoE", icon: "grid", proof: "Full-factorial 3x3x3 buffer Design of Experiments matrix for diagnostic signal-to-noise optimisation." },
      { name: "Cell Culture", icon: "cell", proof: "Aseptic mammalian cell culture of primary human dermal fibroblasts." },
      { name: "RT-PCR & cDNA", icon: "dna", proof: "Qiagen RNeasy RNA extraction, SuperScript IV cDNA synthesis & agarose gel electrophoresis." },
      { name: "600 MHz NMR", icon: "wave", proof: "600 MHz 1H NMR, UV-Vis, fluorescence & FTIR spectroscopy characterisation." },
      { name: "Bisulphite Seq", icon: "dna", proof: "Epigenetic CpG methylation profiling identifying COL1A1 hypermethylation (p = 0.002)." },
      { name: "GLP SOPs", icon: "doc", proof: "Automated liquid handling, centrifugation workflows & GLP standard operating procedure authorship." },
    ],
  },
  {
    id: "hdw",
    code: "HDW",
    num: "03",
    tiltClass: "lg:rotate-[0.65deg] lg:-translate-y-0.5",
    title: "Embedded Bioinstrumentation & 3D CAD",
    highlight: "Year 2 Prize for Best Design Group Project (MYOWAVE KiCad/ADS1299 Platform)",
    img: "/projects/myowave-ehg/pcb_angled_3d.png",
    imgFit: "contain",
    skills: [
      { name: "C++17", icon: "code", proof: "Structure-of-Arrays, std::thread, CMake & SFML 3.0 powering 120 FPS soft-body & Boids solvers." },
      { name: "Embedded C", icon: "code", proof: "Real-time SPI/I2C acquisition firmware for 8-channel pulse oximeter & biopotential hardware." },
      { name: "ADS1299", icon: "chip", proof: "Texas Instruments 24-bit biopotential ADC front-end for MYOWAVE wearable EHG platform." },
      { name: "KiCad PCB", icon: "chip", proof: "Multi-board schematic & PCB layout winning Year 2 Best Design Group Project Prize (MYOWAVE)." },
      { name: "SolidWorks CAD", icon: "cube", proof: "Wearable medical enclosures & stray-light-baffled linear CCD spectrophotometer housings." },
      { name: "MATLAB / Simulink", icon: "wave", proof: "Butterworth/Welch biosignal DSP, PID control & ODEs (100% Signals & Control Progress Tests)." },
      { name: "SPI / I2C / UART", icon: "zap", proof: "PySerial telemetry & Bluetooth RFCOMM streaming from embedded medical prototypes." },
      { name: "STM32", icon: "chip", proof: "STM32 Nucleo-F401RE firmware & Toshiba TCD1304 linear CCD timing control." },
      { name: "Arduino Due", icon: "chip", proof: "12-bit DAC waveform synthesis & Arduino Uno physiological sensor prototyping." },
      { name: "LTspice & Quartus", icon: "wave", proof: "Analogue front-end SPICE circuit simulation & Intel Quartus digital logic synthesis." },
    ],
  },
  {
    id: "str",
    code: "STR",
    num: "04",
    tiltClass: "lg:-rotate-[0.7deg] lg:translate-y-0.5",
    title: "Full-Stack Engineering & R&D Strategy",
    highlight: "£40k STFC/Harwell R&D Grant, 3 Corporate Partnerships & £26k Club Budget",
    img: "/projects/pulse-oximeter-spectrophotometer/cad_isometric.png",
    imgFit: "contain",
    skills: [
      { name: "Next.js & React", icon: "code", proof: "Dual researcher/patient clinical portals (MYOWAVE) & interactive scientific web platforms." },
      { name: "TypeScript", icon: "code", proof: "Typed clinical front-ends, Tailwind CSS & component architecture." },
      { name: "Git & CI/CD", icon: "git", proof: "GitHub Actions automated workflows & Apache Maven multi-module project builds." },
      { name: "XeLaTeX", icon: "doc", proof: "Publication-grade scientific & technical typesetting (1-Page CV & Imperial monographs)." },
      { name: "Grant Writing", icon: "award", proof: "£40,000 STFC/Harwell R&D grant secured & commercial biosensor market strategy." },
      { name: "Excel Modelling", icon: "chart", proof: "Financial forecasting, decision modelling & £26,000 executive club budget governance." },
      { name: "Firebase & SQLite", icon: "db", proof: "Firebase Firestore cloud clinical sync & local SQLite data persistence." },
      { name: "R&D Business Cases", icon: "doc", proof: "AI/ML chemical speciation business cases, functional specs & 3 corporate partnerships." },
      { name: "Structured Problem Solving", icon: "target", proof: "McKinsey Forward Programme Graduate (2026) — hypothesis-driven issue trees & analytical framing." },
      { name: "Executive Communication", icon: "award", proof: "McKinsey Forward Programme Graduate (2026) — pyramid-principle synthesis, Figma & dual-layer executive decks." },
    ],
  },
];

export function SkillsWorkbench() {
  const [active, setActive] = useState<{
    domCode: string;
    domTitle: string;
    name: string;
    proof: string;
  }>({
    domCode: DOMAINS[0].code,
    domTitle: DOMAINS[0].title,
    name: DOMAINS[0].skills[0].name,
    proof: DOMAINS[0].skills[0].proof,
  });

  const renderPlate = (domain: SkillDomain) => (
    <article
      key={domain.id}
      className={cn(
        "relative bg-[#181215] border border-primary/30 shadow-[5px_5px_0_rgba(14,10,12,0.55)] px-3.5 py-2.5 flex flex-col justify-between transition-all duration-200 hover:rotate-0 hover:-translate-y-0.5 hover:border-primary hover:bg-[#1C1419] hover:shadow-[7px_7px_0_rgba(212,77,77,0.24)] hover:z-10",
        domain.tiltClass
      )}
    >
      {/* Tactile Brass Corner Pin */}
      <span
        aria-hidden="true"
        className="absolute top-2 right-2.5 w-1.5 h-1.5 rounded-full bg-primary/70 ring-2 ring-primary/15"
      />

      {/* Compact Domain Header */}
      <div className="flex items-center gap-2.5 pb-1.5 mb-1.5 pr-3 border-b border-primary/20">
        <div className="relative w-9 h-7 border border-primary/40 bg-[#120e10] overflow-hidden shrink-0">
          <Image
            src={domain.img}
            alt={domain.title}
            fill
            sizes="48px"
            className={domain.imgFit === "contain" ? "object-contain p-0.5" : "object-cover"}
          />
        </div>
        <div className="w-6 h-6 flex items-center justify-center border border-primary/35 bg-primary/10 text-primary shrink-0">
          <SkillSvg name={DOMAIN_ICONS[domain.id]} className="w-3.5 h-3.5" />
        </div>
        <div className="min-w-0">
          <p className="font-mono text-[10px] uppercase tracking-[0.11em] text-primary leading-none mb-1">
            {domain.num} {"//"} {domain.code} · {domain.skills.length} SKILLS
          </p>
          <h2 className="font-heading text-[20px] sm:text-[22px] text-foreground leading-tight truncate">
            {domain.title}
          </h2>
        </div>
      </div>

      {/* Unorganised, Oversized Skill Cloud — Chaotic Yet Zero Overlap */}
      <div className="flex-1 flex flex-wrap items-center justify-evenly content-evenly gap-x-2.5 gap-y-3 py-2 px-1.5">
        {domain.skills.map((skill, idx) => {
          const isSelected = active.name === skill.name && active.domCode === domain.code;
          const chaosStyles = [
            "text-[17.5px] px-3.5 py-1.5 -rotate-[3.2deg] -translate-y-[3px]",
            "text-[15px] px-3 py-1.5 rotate-[2.9deg] translate-y-[3px]",
            "text-[16.5px] px-3.5 py-1.5 -rotate-[1.6deg] translate-y-[1.5px]",
            "text-[18px] px-4 py-2 rotate-[3.5deg] -translate-y-[3px]",
            "text-[15px] px-3 py-1.5 -rotate-[3.6deg] translate-y-[2.5px]",
            "text-[17px] px-3.5 py-1.5 rotate-[2.1deg] -translate-y-[2px]",
            "text-[15.5px] px-3 py-1.5 -rotate-[2.4deg] translate-y-[2px]",
          ];
          const chaosClass = chaosStyles[(idx * 3 + domain.id.charCodeAt(0)) % chaosStyles.length];

          return (
            <button
              key={skill.name}
              type="button"
              onMouseEnter={() =>
                setActive({
                  domCode: domain.code,
                  domTitle: domain.title,
                  name: skill.name,
                  proof: skill.proof,
                })
              }
              onClick={() =>
                setActive({
                  domCode: domain.code,
                  domTitle: domain.title,
                  name: skill.name,
                  proof: skill.proof,
                })
              }
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full border font-medium leading-none transition-all duration-150 cursor-pointer shadow-[2px_2px_0_rgba(10,7,9,0.55)]",
                chaosClass,
                isSelected
                  ? "bg-primary border-primary text-primary-foreground !rotate-0 !-translate-y-0.5 scale-[1.06] shadow-[4px_4px_0_rgba(212,77,77,0.45)] z-20"
                  : "bg-[#241A20] border-primary/45 text-foreground hover:bg-primary hover:border-primary hover:text-primary-foreground hover:!rotate-0 hover:!-translate-y-0.5 hover:scale-[1.05] hover:z-20"
              )}
            >
              <SkillSvg
                name={skill.icon}
                className={cn(
                  "w-[16px] h-[16px]",
                  isSelected ? "text-primary-foreground" : "text-primary"
                )}
              />
              <span>{skill.name}</span>
            </button>
          );
        })}
      </div>

      {/* Compact Domain Proof Footer */}
      <p className="mt-1.5 pt-1 border-t border-dashed border-primary/20 font-mono text-[9.5px] text-muted-foreground truncate">
        PROOF {"//"} {domain.highlight}
      </p>
    </article>
  );

  return (
    <div className="min-h-full flex flex-col justify-between gap-2.5">
      {/* Compact Header */}
      <header className="flex flex-wrap items-end justify-between gap-3 pb-1.5 border-b border-primary/25 shrink-0">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.13em] text-primary">
            05 {"//"} Technical Stack &amp; Lab Workbench
          </p>
          <h1 className="font-heading text-2xl sm:text-[26px] text-foreground leading-tight mt-0.5">
            Capabilities <span className="italic text-primary font-normal">Across Four Disciplines</span>
          </h1>
        </div>
        <span className="font-mono text-[10.5px] text-primary tracking-wide">
          Hover or click any skill for verified proof
        </span>
      </header>

      {/* Compact Asymmetric Organic Pinned Workbench */}
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1.24fr_1fr] gap-3.5">
          {renderPlate(DOMAINS[0])}
          {renderPlate(DOMAINS[1])}
        </div>
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.16fr] gap-3.5">
          {renderPlate(DOMAINS[2])}
          {renderPlate(DOMAINS[3])}
        </div>
      </div>

      {/* Bigger, Clearer, Taller Verified Skill Explanation Box */}
      <footer className="shrink-0 px-5 py-3.5 bg-[#181215] border border-primary/65 shadow-[5px_5px_0_rgba(212,77,77,0.2)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="bg-primary text-primary-foreground font-mono text-[10.5px] font-semibold px-2.5 py-0.5 tracking-wider shrink-0">
              {active.domCode} {"//"} VERIFIED PROOF
            </span>
            <strong className="font-heading text-lg sm:text-[20px] text-foreground leading-none">
              {active.name}
            </strong>
            <span className="font-mono text-[10.5px] text-muted-foreground uppercase hidden md:inline">
              · {active.domTitle}
            </span>
          </div>
          <p className="text-[14.5px] sm:text-[15px] text-foreground/90 leading-snug">
            {active.proof}
          </p>
        </div>
      </footer>
    </div>
  );
}
