"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const year2Modules = [
  { name: "Programming 2", mark: "93.75%" },
  { name: "Mathematics and Engineering 2", mark: "79.38%" },
  { name: "Medical and Biochemical Science 2", mark: "78.86%" },
  { name: "Design and Professional Practice 2", mark: "74.30%" },
  { name: "Molecules, Materials and Measurement 2", mark: "72.77%" },
];

const year1Modules = [
  { name: "Molecules and Energetics 1", mark: "83.85%" },
  { name: "Medical and Biochemical Science 1", mark: "82.51%" },
  { name: "Computer Fundamentals and Programming 1", mark: "80.85%" },
  { name: "Mathematics and Engineering 1", mark: "79.90%" },
  { name: "Design and Professional Practice 1", mark: "78.40%" },
  { name: "Arabic Level 1", mark: "Pass with Distinction" },
];

export function CvBinderSpread() {
  const [sleeveOpen, setSleeveOpen] = useState(false);
  const [tucking, setTucking] = useState(false);

  const openSleeve = () => {
    setTucking(false);
    setSleeveOpen(true);
  };

  const closeSleeve = () => {
    if (!sleeveOpen || tucking) return;
    setTucking(true);
    window.setTimeout(() => {
      setSleeveOpen(false);
      setTucking(false);
    }, 260);
  };

  useEffect(() => {
    if (!sleeveOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSleeve();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sleeveOpen, tucking]);

  return (
    <>
      <div className="min-h-full flex flex-col justify-between gap-5">
        {/* FULL-WIDTH MASTHEAD HEADER SPANNING ENTIRE FOLDER */}
        <header className="w-full flex flex-wrap items-end justify-between gap-4 pb-3 border-b border-primary/35 shrink-0">
          <div>
            <p className="font-mono text-[10.5px] uppercase tracking-[0.13em] text-primary">
              06 {"//"} Curriculum Vitae, Honours &amp; Direct Contact
            </p>
            <h1 className="font-heading text-3xl sm:text-[36px] text-foreground leading-tight mt-0.5">
              CV, Honours{" "}
              <span className="italic text-primary font-normal">&amp; Contact</span>
            </h1>
            <p className="text-[13.5px] text-muted-foreground mt-0.5">
              MEng Molecular Bioengineering · Imperial College London · First Class Standing
            </p>
          </div>

          <div className="flex items-baseline gap-6 text-right">
            <div>
              <p className="font-heading text-[32px] sm:text-[36px] text-primary leading-none tabular-nums">
                81.57%
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.09em] text-muted-foreground mt-1">
                Year 1 Average
              </p>
            </div>
            <div className="w-px h-9 bg-primary/25" />
            <div>
              <p className="font-heading text-[32px] sm:text-[36px] text-primary leading-none tabular-nums">
                77.95%
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.09em] text-muted-foreground mt-1">
                Year 2 Average
              </p>
            </div>
          </div>
        </header>

        {/* MIDDLE ZONE: DOMINANT AWARDS LEFT | COMPACT PULL-OUT CV SLIPCASE RIGHT */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_276px] gap-8 items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-9 gap-y-5">
            <article className="border-l-[3px] border-primary pl-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">
                <span>2026</span>
                <span>·</span>
                <span>National Scholarship</span>
              </div>
              <h2 className="font-heading text-[21px] sm:text-[23px] text-foreground leading-snug">
                IET Future Talent Boost Scholarship
              </h2>
              <p className="text-[13.5px] text-muted-foreground leading-snug">
                Awarded by the Institution of Engineering and Technology (2026).
              </p>
            </article>

            <article className="border-l-[3px] border-primary pl-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">
                <span>2024 &amp; 2025</span>
                <span>·</span>
                <span>Top 10% Cohort</span>
              </div>
              <h2 className="font-heading text-[21px] sm:text-[23px] text-foreground leading-snug">
                2× Imperial Dean&apos;s List
              </h2>
              <p className="text-[13.5px] text-muted-foreground leading-snug">
                Ranked in the top 10% of Molecular Bioengineering across both Year 1 and Year 2.
              </p>
            </article>

            <article className="border-l-[3px] border-primary pl-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">
                <span>2025</span>
                <span>·</span>
                <span>Departmental Prize</span>
              </div>
              <h2 className="font-heading text-[21px] sm:text-[23px] text-foreground leading-snug">
                Y2 Best Design Group Project Prize
              </h2>
              <p className="text-[13.5px] text-muted-foreground leading-snug">
                Awarded for the MYOWAVE wearable ADS1299/KiCad EHG hardware &amp; clinical platform.
              </p>
            </article>

            <article className="border-l-[3px] border-primary pl-4 flex flex-col gap-1">
              <div className="flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.1em] text-primary">
                <span>2026</span>
                <span>·</span>
                <span>Strategy &amp; Leadership</span>
              </div>
              <h2 className="font-heading text-[21px] sm:text-[23px] text-foreground leading-snug">
                McKinsey Forward Programme Graduate
              </h2>
              <p className="text-[13.5px] text-muted-foreground leading-snug">
                Completed McKinsey&apos;s structured problem-solving and executive leadership programme.
              </p>
            </article>
          </div>

          {/* Right: Compact Fixed-Proportion Pull-Out CV Slipcase (Never Stretched!) */}
          <aside className="flex flex-col justify-center gap-2.5">
            <div
              onClick={openSleeve}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") openSleeve();
              }}
              aria-label="Pull out 1-Page CV PDF"
              className="group h-[234px] shrink-0 relative bg-[#181215] border border-primary shadow-[6px_6px_0_rgba(212,77,77,0.2)] hover:shadow-[8px_8px_0_rgba(212,77,77,0.28)] cursor-pointer overflow-hidden flex flex-col justify-end items-center pt-9 transition-shadow"
            >
              <div className="absolute top-2 inset-x-3.5 flex items-center justify-between font-mono text-[9.5px] tracking-[0.1em] text-muted-foreground">
                <span>1-PAGE XELATEX</span>
                <span className="text-primary font-semibold">PDF</span>
              </div>

              {/* Peeking Mini XeLaTeX Sheet */}
              <div className="w-[82%] bg-[#faf6f0] text-[#171215] border-t-[3px] border-primary px-3.5 pt-2.5 pb-4 shadow-[0_-6px_20px_rgba(0,0,0,0.5)] translate-y-2 group-hover:-translate-y-0.5 transition-transform duration-300 ease-out">
                <p className="font-heading text-[11px] font-semibold tracking-tight">AHMED AHMED</p>
                <p className="font-mono text-[6.5px] text-[#6b5c55]">
                  Imperial College London · Molecular Bioengineering
                </p>
                <div className="h-[1.5px] bg-primary my-1.5" />
                <p className="font-mono text-[6px] font-semibold text-[#A36E28]">
                  EDUCATION &amp; HONOURS
                </p>
                <div className="h-[2px] bg-[#171215]/15 my-1" />
                <div className="h-[2px] w-4/5 bg-[#171215]/15 my-1" />
                <p className="font-mono text-[6px] font-semibold text-[#A36E28] mt-1.5">
                  RESEARCH &amp; ENGINEERING
                </p>
                <div className="h-[2px] bg-[#171215]/15 my-1" />
                <div className="h-[2px] w-3/5 bg-[#171215]/15 my-1" />
                <div className="h-[2px] w-4/5 bg-[#171215]/15 my-1" />
                <p className="font-mono text-[6px] font-semibold text-[#A36E28] mt-1.5">
                  TECHNICAL PROJECTS
                </p>
                <div className="h-[2px] w-4/5 bg-[#171215]/15 my-1" />
                <div className="h-[2px] bg-[#171215]/15 my-1" />
              </div>

              {/* Recessed Pocket Front */}
              <div className="relative z-10 w-full bg-[#1C1419] border-t border-primary/50 py-3 px-4 flex flex-col items-center justify-center gap-0.5">
                <span className="font-mono text-[10.5px] font-semibold text-primary tracking-[0.1em]">
                  ↑ PULL OUT 1-PAGE CV
                </span>
                <span className="font-mono text-[9.5px] text-muted-foreground">
                  Ahmed_Ahmed_CV.pdf
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={openSleeve}
                className="bg-primary text-primary-foreground py-2 px-2 font-mono text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
              >
                Pull Out ↑
              </button>
              <a
                href="/Ahmed_Ahmed_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-primary/40 text-foreground py-2 px-2 font-mono text-[10.5px] uppercase tracking-wider text-center hover:border-primary hover:text-primary transition-colors"
              >
                Direct PDF ↗
              </a>
            </div>
          </aside>
        </div>

        {/* MASSIVE FULL-WIDTH DIRECT CONTACT SHOWCASE */}
        <section className="bg-[#181215] border border-primary/55 shadow-[6px_6px_0_rgba(212,77,77,0.2)] px-6 py-5 flex flex-col lg:flex-row lg:items-center justify-between gap-5 shrink-0">
          <div className="space-y-1">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
              DIRECT CONTACT {"//"} LONDON &amp; OXFORD, UK
            </p>
            <a
              href="mailto:ahmed.ia.ahmed@gmail.com"
              className="block font-heading text-2xl sm:text-[32px] lg:text-[36px] text-foreground hover:text-primary transition-colors leading-none tracking-tight"
            >
              ahmed.ia.ahmed<span className="italic text-primary font-normal">@gmail.com</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="mailto:ahmed.ia.ahmed@gmail.com"
              className="bg-primary text-primary-foreground px-5 py-3 font-mono text-xs font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
            >
              Email Directly ↗
            </a>
            <a
              href="https://www.linkedin.com/in/ahmediaahmed"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/50 bg-[#1F171C] text-foreground px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              LinkedIn ↗
            </a>
            <a
              href="https://github.com/aahmeddev"
              target="_blank"
              rel="noopener noreferrer"
              className="border border-primary/50 bg-[#1F171C] text-foreground px-5 py-3 font-mono text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </section>

        {/* QUIET, LOW-CONTRAST SUPPORTING MODULE TRANSCRIPT */}
        <div className="pt-3 border-t border-primary/25 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 shrink-0">
          <div className="flex flex-col justify-between">
            <div className="flex items-baseline justify-between pb-2 mb-2 border-b border-primary/20">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                Year 2 Verified Modules
              </span>
              <span className="font-mono text-[11px] text-primary tabular-nums">
                77.95% · First Class
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-around gap-1">
              {year2Modules.map((m) => (
                <div
                  key={m.name}
                  className="flex items-baseline justify-between gap-4 py-1 border-b border-primary/10 last:border-0 text-[13px]"
                >
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-mono text-[12px] text-foreground/90 tabular-nums shrink-0">
                    {m.mark}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex items-baseline justify-between pb-2 mb-2 border-b border-primary/20">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted-foreground">
                Year 1 Verified Modules
              </span>
              <span className="font-mono text-[11px] text-primary tabular-nums">
                81.57% · First Class
              </span>
            </div>
            <div className="flex-1 flex flex-col justify-around gap-1">
              {year1Modules.map((m) => (
                <div
                  key={m.name}
                  className="flex items-baseline justify-between gap-4 py-1 border-b border-primary/10 last:border-0 text-[13px]"
                >
                  <span className="text-muted-foreground">{m.name}</span>
                  <span className="font-mono text-[12px] text-foreground/90 tabular-nums shrink-0">
                    {m.mark}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* VERTICAL SLEEVE PULL-OUT SHEET FOR 1-PAGE XELATEX CV (PORTALED ABOVE FOLDER TABS) */}
      {sleeveOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) closeSleeve();
            }}
            className={cn(
              "fixed inset-0 z-[100] flex justify-center items-start pt-6 sm:pt-10 px-3 sm:px-6 pb-6 bg-black/60 backdrop-blur-[1px] transition-opacity duration-300",
              tucking ? "opacity-0" : "opacity-100"
            )}
          >
            <article
              role="dialog"
              aria-modal="true"
              aria-label="Ahmed Ahmed 1-Page CV"
              className={cn(
                "w-full max-w-[940px] h-[calc(100vh-52px)] sm:h-[calc(100vh-72px)] bg-[#22191E] border border-primary shadow-[0_28px_70px_rgba(0,0,0,0.78),10px_10px_0_rgba(212,77,77,0.28)] flex flex-col overflow-hidden",
                tucking ? "animate-sleeve-tuckin" : "animate-sleeve-pullout"
              )}
            >
              <div className="bg-[#181215] border-b border-primary/40 px-5 sm:px-7 py-3.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-primary shrink-0">
                    PULLED FROM SLEEVE {"//"} 06
                  </span>
                  <span className="font-mono text-xs text-foreground truncate">
                    Ahmed_Ahmed_CV.pdf — 1-Page XeLaTeX
                  </span>
                </div>
                <div className="flex items-center gap-2.5 shrink-0">
                  <a
                    href="/Ahmed_Ahmed_CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border border-primary/40 text-foreground px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
                  >
                    Open Full Tab ↗
                  </a>
                  <button
                    type="button"
                    onClick={closeSleeve}
                    className="bg-primary text-primary-foreground px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider hover:opacity-90 transition-opacity"
                  >
                    ↓ Tuck Back Into Folder [ESC]
                  </button>
                </div>
              </div>

              <iframe
                src="/Ahmed_Ahmed_CV.pdf#toolbar=0&navpanes=0&view=FitH"
                title="Ahmed Ahmed 1-Page CV"
                className="flex-1 w-full border-0 bg-white"
              />
            </article>
          </div>,
          document.body
        )}
    </>
  );
}
