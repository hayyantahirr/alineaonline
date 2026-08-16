"use client";

import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import LevelBoardTabs from "./LevelBoardTabs";
import CurriculumGrid from "./CurriculumGrid";

export default function SubjectDetailView({
  subject,
  activeLevel,
  activeBoard,
  onSelectLevel,
  onSelectBoard,
}) {
  if (!subject) return null;

  const currentLevel = subject.levels.find((l) => l.id === activeLevel);
  const currentBoard = currentLevel?.boards.find((b) => b.id === activeBoard);

  return (
    <div className="flex-1 min-w-0">
      {/* Subject Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="font-['IBM_Plex_Mono'] font-bold text-2xl text-[#c0392b]">
            {subject.num}
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background leading-tight">
            {subject.title}
          </h2>
          {subject.badgeType === "red-outline" ? (
            <span className="font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#c0392b] text-[#c0392b] bg-[#c0392b]/5">
              {subject.tag}
            </span>
          ) : (
            <span className="font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border border-on-background bg-primary-container text-on-background">
              {subject.tag}
            </span>
          )}
        </div>

        <p className="font-['Work_Sans'] text-base text-on-surface-variant leading-relaxed max-w-2xl mb-4">
          {subject.description}
        </p>

        {/* Tutor & Booking */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <div className="flex items-center gap-2 bg-white/50 px-3 py-1.5 rounded-lg border border-line">
            <GraduationCap className="w-4 h-4 text-[#c0392b]" />
            <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
              Lead Specialist:
            </span>
            <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
              {subject.tutor}
            </span>
          </div>
          <Link
            href={`/booking?teacher=${encodeURIComponent(
              subject.tutor,
            )}&subject=${encodeURIComponent(
              subject.bookingParam || subject.title,
            )}`}
            className="font-['Work_Sans'] text-xs font-bold text-on-background bg-primary-container px-4 py-1.5 rounded-full border border-on-background hover:bg-on-background hover:text-primary-container transition-colors"
          >
            Book Session with {subject.tutor.split(" ")[0]}
          </Link>
        </div>
      </div>

      {/* Level & Board Tabs */}
      <div className="bg-white/80 rounded-2xl p-5 md:p-6 border-2 border-line mb-6">
        <LevelBoardTabs
          levels={subject.levels}
          activeLevel={activeLevel}
          activeBoard={activeBoard}
          onSelectLevel={onSelectLevel}
          onSelectBoard={onSelectBoard}
        />
      </div>

      {/* Active Board Label */}
      {currentBoard && (
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant">
            Showing curriculum for:
          </span>
          <span className="font-['Work_Sans'] font-bold text-sm text-on-background bg-primary-container px-3 py-1 rounded-lg border border-on-background">
            {currentLevel?.label} · {currentBoard.label}
          </span>
          {currentBoard.syllabus && (
            <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
              Syllabus: {currentBoard.syllabus}
            </span>
          )}
        </div>
      )}

      {/* Curriculum Grid */}
      <CurriculumGrid board={currentBoard} />

      {/* Book a Session CTA */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 bg-[#f5f2e9]/60 rounded-2xl p-5 md:p-6 border border-line">
        <div>
          <p className="font-['Work_Sans'] font-bold text-sm text-on-background">
            Ready to start {subject.title}?
          </p>
          <p className="font-['Work_Sans'] text-xs text-on-surface-variant">
            Book a diagnostic session to identify your exact gap areas.
          </p>
        </div>
        <Link
          href="/booking"
          className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs md:text-sm px-6 py-3 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2"
        >
          Book a Session
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
