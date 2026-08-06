"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

// Handwriting line widths to simulate student answer text (increased line count for taller paper)
const LINE_WIDTHS = [
  88, 95, 70, 91, 84, 60, 93, 77, 96, 65, 89, 80, 94, 72, 90, 58, 87, 96, 75, 88, 62, 90
];

export default function GradedScript() {
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // Gather animated elements
    const paper = el.querySelector(".script-paper");
    const lines = el.querySelectorAll(".script-line");
    const circleAnnot = el.querySelector(".circle-annot");
    const underlines = el.querySelectorAll(".red-underline-el");
    const comments = el.querySelectorAll(".margin-comment-el");
    const ticks = el.querySelectorAll(".red-tick-el");
    const stamp = el.querySelector(".grade-stamp-el");
    const caption = el.querySelector(".caption-tag-el");

    // Paper entrance (runs once on mount)
    gsap.fromTo(
      paper,
      { y: 40, opacity: 0, rotate: 2 },
      { y: 0, opacity: 1, rotate: 0, duration: 0.8, ease: "power3.out" }
    );

    // Caption fade-in (runs once on mount)
    gsap.fromTo(
      caption,
      { y: 10, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );

    // Looping timeline for the writing and grading animation
    const tl = gsap.timeline({
      repeat: -1,
      delay: 0.6,
    });

    // Step 0: Set initial state at the start of each loop
    tl.set(lines, { scaleX: 0, opacity: 1, transformOrigin: "left center" })
      .set(circleAnnot, { strokeDashoffset: 320, opacity: 0 })
      .set(underlines, { scaleX: 0, opacity: 1, transformOrigin: "left center" })
      .set(comments, { x: 20, opacity: 0 })
      .set(ticks, { scale: 0, opacity: 0 })
      .set(stamp, { scale: 3, opacity: 0, rotate: -15 });

    // Step 1: Lines write in (staggered)
    tl.to(lines, {
      scaleX: 1,
      duration: 0.06,
      ease: "power1.out",
      stagger: 0.05,
    });

    // Step 2: Circle annotation draws
    tl.to(
      circleAnnot,
      {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 0.6,
        ease: "power2.inOut",
      },
      "-=0.2"
    );

    // Step 3: Red underlines draw in
    tl.to(
      underlines,
      {
        scaleX: 1,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.2,
      },
      "-=0.2"
    );

    // Step 4: Margin comments slide in
    tl.to(
      comments,
      {
        x: 0,
        opacity: 1,
        duration: 0.35,
        ease: "power2.out",
        stagger: 0.15,
      },
      "-=0.1"
    );

    // Step 5: Checkmarks pop
    tl.to(
      ticks,
      {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(3)",
        stagger: 0.12,
      },
      "-=0.1"
    );

    // Step 6: Grade stamp SLAMS in
    tl.to(stamp, {
      scale: 1,
      opacity: 1,
      rotate: 0,
      duration: 0.5,
      ease: "back.out(2.5)",
    });

    // Subtle paper shake on stamp impact
    tl.to(
      paper,
      {
        x: -2,
        duration: 0.05,
        ease: "power1.inOut",
        yoyo: true,
        repeat: 3,
      },
      "-=0.2"
    );

    // Step 7: Display final state for 4 seconds
    tl.to({}, { duration: 4 });

    // Step 8: Fade out graded markings for a clean reset
    tl.to([lines, circleAnnot, underlines, comments, ticks, stamp], {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
    });

    // Short pause before starting the next loop
    tl.to({}, { duration: 0.5 });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-97.5 mx-auto">
      {/* Paper Card with Increased Height */}
      <div className="script-paper rounded-2xl border-2 border-on-background shadow-[10px_10px_0_0_var(--color-on-background)] bg-[#faf8f2] relative overflow-hidden p-6 pb-8 md:p-8 md:pb-10 min-h-117.5 sm:min-h-127.5 flex flex-col justify-between">
        {/* Ruled-line texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
          {Array.from({ length: 35 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-on-background"
              style={{ marginTop: i === 0 ? "28px" : "20px" }}
            />
          ))}
        </div>

        {/* Left margin line */}
        <div className="absolute top-0 bottom-0 left-11 w-px bg-red-300/30" />

        {/* Grade Stamp — top right */}
        <div className="grade-stamp-el absolute top-6 right-6 w-14 h-14 md:w-16 md:h-16 rounded-full border-[3px] border-[#c0392b] flex items-center justify-center z-10 bg-[#faf8f2]">
          <span className="font-['Archivo_Black'] text-xl md:text-2xl text-[#c0392b] leading-none">
            A*
          </span>
        </div>

        {/* Handwriting Lines with increased count and spacing */}
        <div className="flex flex-col gap-3 pt-4 relative z-1 pl-5 flex-1">
          {LINE_WIDTHS.map((w, i) => (
            <div
              key={i}
              className="script-line h-0.75 rounded-full bg-on-background/15"
              style={{ width: `${w}%` }}
            />
          ))}
        </div>

        {/* Red Circle Annotation — around lines 3-5 area */}
        <svg
          className="absolute z-2 pointer-events-none"
          style={{
            top: "95px",
            left: "55px",
            width: "160px",
            height: "45px",
          }}
          viewBox="0 0 160 45"
          fill="none"
        >
          <ellipse
            className="circle-annot"
            cx="80"
            cy="22"
            rx="75"
            ry="18"
            stroke="#c0392b"
            strokeWidth="2"
            strokeDasharray="320"
            strokeDashoffset="320"
            strokeLinecap="round"
            transform="rotate(-3 80 22)"
          />
        </svg>

        {/* Red Underlines */}
        <div
          className="red-underline-el absolute h-0.75 bg-[#c0392b] rounded-full z-2"
          style={{ top: "185px", left: "56px", width: "110px" }}
        />
        <div
          className="red-underline-el absolute h-0.75 bg-[#c0392b] rounded-full z-2"
          style={{ top: "275px", left: "130px", width: "75px" }}
        />

        {/* Margin Comments */}
        <span
          className="margin-comment-el absolute font-['Work_Sans'] italic text-[11px] text-[#c0392b] z-3 select-none"
          style={{ top: "170px", right: "16px" }}
        >
          nice link&nbsp;↑
        </span>
        <span
          className="margin-comment-el absolute font-['Work_Sans'] italic text-[11px] text-[#c0392b] z-3 select-none"
          style={{ top: "305px", right: "16px" }}
        >
          explain more
        </span>

        {/* Red Ticks */}
        <span
          className="red-tick-el absolute text-[#c0392b] text-lg font-bold z-3 select-none"
          style={{ top: "370px", left: "56px" }}
        >
          ✓
        </span>
        <span
          className="red-tick-el absolute text-[#c0392b] text-lg font-bold z-3 select-none"
          style={{ top: "370px", left: "200px" }}
        >
          ✓
        </span>
      </div>

      {/* Caption Tag */}
      <div className="caption-tag-el flex items-center justify-between mt-4 px-1 font-['IBM_Plex_Mono'] text-[10px] md:text-[11px] uppercase tracking-wider text-on-surface-variant">
        <span>Economics · Paper 2 · Q7</span>
        <span className="text-[#c0392b] font-semibold">Marked by Alinea</span>
      </div>
    </div>
  );
}
