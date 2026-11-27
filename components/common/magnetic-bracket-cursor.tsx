"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], summary, input[type="submit"], [data-magnetic]';

export function MagneticBracketCursor() {
  const pathname = usePathname();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const boxRef = useRef<HTMLDivElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);
  const hoveredRef = useRef<HTMLElement | null>(null);
  const posRef = useRef({ mx: -100, my: -100, lx: -100, ly: -100 });

  // Reset hovered target on route changes (e.g. pulling out or tucking a blog/project sheet)
  useEffect(() => {
    hoveredRef.current = null;
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!finePointer.matches) return;

    setEnabled(true);
    document.documentElement.classList.add("magnetic-cursor-active");

    let rafId = 0;

    const onMove = (e: MouseEvent) => {
      posRef.current.mx = e.clientX;
      posRef.current.my = e.clientY;

      const target = e.target as HTMLElement | null;
      if (target && target.tagName === "IFRAME") {
        setVisible(false);
        hoveredRef.current = null;
        return;
      }

      setVisible(true);

      const interactive = target?.closest(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (interactive) {
        const rect = interactive.getBoundingClientRect();
        // Avoid wrapping huge full-container wrappers; snap cleanly to buttons, tabs, cards & chips
        if (rect.width > 0 && rect.height > 0 && rect.width < 900 && rect.height < 600) {
          hoveredRef.current = interactive;
        } else {
          hoveredRef.current = null;
        }
      } else {
        hoveredRef.current = null;
      }
    };

    const onLeave = () => {
      setVisible(false);
      hoveredRef.current = null;
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);

    const tick = () => {
      const p = posRef.current;
      p.lx += (p.mx - p.lx) * 0.22;
      p.ly += (p.my - p.ly) * 0.22;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${p.mx}px, ${p.my}px, 0)`;
      }

      if (boxRef.current) {
        const el = hoveredRef.current;
        if (el && document.contains(el)) {
          const r = el.getBoundingClientRect();
          const pad = 6;
          boxRef.current.style.width = `${r.width + pad * 2}px`;
          boxRef.current.style.height = `${r.height + pad * 2}px`;
          boxRef.current.style.transform = `translate3d(${r.left - pad}px, ${r.top - pad}px, 0)`;
        } else {
          hoveredRef.current = null;
          const size = 24;
          boxRef.current.style.width = `${size}px`;
          boxRef.current.style.height = `${size}px`;
          boxRef.current.style.transform = `translate3d(${p.lx - size / 2}px, ${p.ly - size / 2}px, 0)`;
        }
      }

      rafId = window.requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    rafId = window.requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("magnetic-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 150ms ease" }}
    >
      {/* Magnetic 4-Corner Brass Brackets */}
      <div
        ref={boxRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{
          width: 24,
          height: 24,
          transition:
            "width 190ms cubic-bezier(0.22, 1, 0.36, 1), height 190ms cubic-bezier(0.22, 1, 0.36, 1), transform 110ms ease-out",
        }}
      >
        <span
          className="absolute top-0 left-0 w-2 h-2 border-t-[1.5px] border-l-[1.5px] transition-colors duration-100"
          style={{ borderColor: pressed ? "#D44D4D" : "#D9A55A" }}
        />
        <span
          className="absolute top-0 right-0 w-2 h-2 border-t-[1.5px] border-r-[1.5px] transition-colors duration-100"
          style={{ borderColor: pressed ? "#D44D4D" : "#D9A55A" }}
        />
        <span
          className="absolute bottom-0 left-0 w-2 h-2 border-b-[1.5px] border-l-[1.5px] transition-colors duration-100"
          style={{ borderColor: pressed ? "#D44D4D" : "#D9A55A" }}
        />
        <span
          className="absolute bottom-0 right-0 w-2 h-2 border-b-[1.5px] border-r-[1.5px] transition-colors duration-100"
          style={{ borderColor: pressed ? "#D44D4D" : "#D9A55A" }}
        />
      </div>

      {/* Crisp Centre Brass Pinpoint Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none rounded-full will-change-transform transition-colors duration-100"
        style={{
          width: 5,
          height: 5,
          marginLeft: -2.5,
          marginTop: -2.5,
          backgroundColor: pressed ? "#D44D4D" : "#D9A55A",
        }}
      />
    </div>
  );
}
