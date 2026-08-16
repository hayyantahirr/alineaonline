"use client";

import { Sparkles } from "lucide-react";

export default function TeacherRubricVisual() {
  return (
    <div className="w-full max-w-105 mx-auto select-none">
      {/* Paper Card */}
      <div className="rounded-2xl border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] bg-[#faf8f2] relative overflow-hidden p-6 sm:p-7 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-1">
        {/* Ruled-line texture */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.035]">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="w-full h-px bg-on-background"
              style={{ marginTop: i === 0 ? "24px" : "18px" }}
            />
          ))}
        </div>

        {/* Left red margin line */}
        <div className="absolute top-0 bottom-0 left-9 sm:left-10 w-px bg-red-300/40" />

        {/* Header with Director Stamp */}
        <div className="relative z-1 pl-6 sm:pl-7 flex items-start justify-between mb-5">
          <div>
            <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-widest text-muted block mb-1">
              Doc Ref: ALN-FAC-2025
            </span>
            <h4 className="font-['Archivo_Black'] text-base sm:text-lg text-on-background leading-tight">
              Teacher Rubric
            </h4>
            <span className="font-['Work_Sans'] text-xs font-semibold text-on-surface-variant">
              What we look for in our faculty
            </span>
          </div>

          {/* Director Examiner Stamp */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-[2.5px] border-[#c0392b] -rotate-12 flex flex-col items-center justify-center bg-[#faf8f2]/90 shadow-xs shrink-0 ml-2">
            <span className="font-['Archivo_Black'] text-[9px] sm:text-[10px] text-[#c0392b] uppercase tracking-tighter leading-none">
              DIRECTOR
            </span>
            <span className="font-['Archivo_Black'] text-xs sm:text-sm text-[#c0392b] leading-tight">
              APPROVED
            </span>
            <span className="font-['IBM_Plex_Mono'] text-[7px] text-[#c0392b] font-bold">
              ★ TOP 5% ★
            </span>
          </div>
        </div>

        {/* Annotated Evaluation Items */}
        <div className="relative z-1 pl-6 sm:pl-7 flex flex-col gap-4 my-1">
          {/* Item 1: Mark Scheme Mastery with Circle Annotation */}
          <div className="relative">
            <div className="flex items-start gap-2">
              <span className="text-[#c0392b] font-bold text-sm leading-none mt-0.5 shrink-0">
                ✓
              </span>
              <div>
                <p className="font-['Work_Sans'] font-bold text-xs sm:text-sm text-on-background leading-snug">
                  Mark-scheme-first pedagogy
                </p>
                <p className="font-['Work_Sans'] text-[11px] sm:text-xs text-on-surface-variant leading-tight">
                  Teach how examiners award method marks
                </p>
              </div>
            </div>
            {/* Red Margin Note */}
            <span className="absolute -top-2.5 right-0 font-['Work_Sans'] italic text-[10px] text-[#c0392b] font-semibold">
              non-negotiable!
            </span>
          </div>

          {/* Item 2: Exam Board Fluency with Red Underline */}
          <div className="relative">
            <div className="flex items-start gap-2">
              <span className="text-[#c0392b] font-bold text-sm leading-none mt-0.5 shrink-0">
                ✓
              </span>
              <div>
                <p className="font-['Work_Sans'] font-bold text-xs sm:text-sm text-on-background leading-snug">
                  Board Fluency: CAIE, Edexcel, AQA
                </p>
                <div className="h-0.5 w-44 bg-[#c0392b] rounded-full mt-0.5 opacity-80" />
                <p className="font-['Work_Sans'] text-[11px] sm:text-xs text-on-surface-variant leading-tight mt-0.5">
                  Deep command of syllabus quirks &amp; grade boundaries
                </p>
              </div>
            </div>
          </div>

          {/* Item 3: Outcome Focus with Pill */}
          <div className="relative">
            <div className="flex items-start gap-2">
              <span className="text-[#c0392b] font-bold text-sm leading-none mt-0.5 shrink-0">
                ✓
              </span>
              <div>
                <p className="font-['Work_Sans'] font-bold text-xs sm:text-sm text-on-background leading-snug">
                  Outcome-focused 1:1 &amp; small groups
                </p>
                <p className="font-['Work_Sans'] text-[11px] sm:text-xs text-on-surface-variant leading-tight">
                  Regular diagnostics &amp; grade improvement tracking
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rubric Footer */}
        <div className="relative z-1 pl-6 sm:pl-7 mt-4 pt-3 border-t border-line flex items-center justify-between">
          <div className="flex items-center gap-1.5 font-['IBM_Plex_Mono'] text-[10px] text-on-surface-variant font-medium">
            <Sparkles className="w-3 h-3 text-[#c0392b]" />
            <span>Fast-track hiring</span>
          </div>
          <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold text-[#c0392b]">
            3–5 day response
          </span>
        </div>
      </div>

      {/* Caption Tag under card */}
      <div className="flex items-center justify-between mt-3 px-2 font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant">
        <span>Alinea Faculty Standard</span>
        <span className="text-[#c0392b] font-semibold">Khawar · Academic Director</span>
      </div>
    </div>
  );
}
