"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import SubjectSidebar from "@/components/subjects/SubjectSidebar";
import SubjectDetailView from "@/components/subjects/SubjectDetailView";

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubjectId, setActiveSubjectId] = useState("");
  const [activeLevel, setActiveLevel] = useState("");
  const [activeBoard, setActiveBoard] = useState("");

  // Fetch subjects from server-side API route
  useEffect(() => {
    let isMounted = true;

    async function fetchSubjects() {
      try {
        setLoading(true);
        const res = await fetch("/api/subjects");
        if (!res.ok) throw new Error("Failed to load subjects");
        const data = await res.json();

        if (isMounted) {
          const fetchedList =
            data.success && Array.isArray(data.subjects)
              ? data.subjects
              : [];

          setSubjects(fetchedList);

          const initialSubject = fetchedList[0];
          if (initialSubject) {
            setActiveSubjectId(initialSubject.id);
            const initialLevel = initialSubject.levels?.[0];
            if (initialLevel) {
              setActiveLevel(initialLevel.id);
              setActiveBoard(initialLevel.boards?.[0]?.id || "");
            }
          }
        }
      } catch (err) {
        console.error("Error fetching subjects:", err);
        if (isMounted) {
          setSubjects([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchSubjects();

    return () => {
      isMounted = false;
    };
  }, []);

  const activeSubject =
    subjects.find((s) => s.id === activeSubjectId) || subjects[0];

  const handleSelectSubject = useCallback(
    (subjectId) => {
      const subject = subjects.find((s) => s.id === subjectId);
      if (!subject) return;
      setActiveSubjectId(subjectId);
      // Reset level to first available, board to first available
      const firstLevel = subject.levels?.[0];
      if (firstLevel) {
        setActiveLevel(firstLevel.id);
        setActiveBoard(firstLevel.boards?.[0]?.id || "");
      } else {
        setActiveLevel("");
        setActiveBoard("");
      }
    },
    [subjects]
  );

  const handleSelectLevel = useCallback(
    (levelId) => {
      setActiveLevel(levelId);
      // Auto-select first board of new level
      const level = activeSubject?.levels?.find((l) => l.id === levelId);
      setActiveBoard(level?.boards?.[0]?.id || "");
    },
    [activeSubject]
  );

  const handleSelectBoard = useCallback((boardId) => {
    setActiveBoard(boardId);
  }, []);

  const activeTutorFirstWord =
    (activeSubject?.tutor || "").split(" ")[0] || "Specialist";

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen">
      {/* Page Header */}
      <section className="bg-on-background text-white py-14 md:py-20 px-6 border-b-4 border-primary-container relative overflow-hidden">
        {/* Subtle grid pattern background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "30px 30px",
          }}
        />

        <div className="max-w-container-max mx-auto text-center relative z-10">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ACADEMIC SYLLABUSES
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl lg:text-6xl text-white mt-5 mb-5">
            Curriculum Built for{" "}
            <span className="text-primary-container">A* Results</span>
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-2xl mx-auto leading-relaxed">
            Every subject module is mapped directly to exam board specifications
            (CAIE, Edexcel, AQA, IB). Select a subject below to explore the exact
            mark-scheme-aligned curriculum we teach.
          </p>
        </div>
      </section>

      {/* Main Content: Sidebar + Detail View */}
      <section className="py-12 md:py-20 px-6 max-w-container-max mx-auto">
        {loading ? (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 animate-pulse">
            {/* Sidebar Skeleton */}
            <div className="w-full lg:w-64 shrink-0 space-y-3">
              <div className="h-6 w-24 bg-surface-container-low rounded" />
              {[1, 2, 3, 4, 5].map((n) => (
                <div
                  key={n}
                  className="h-12 bg-white rounded-xl border border-line"
                />
              ))}
            </div>

            {/* Detail View Skeleton */}
            <div className="flex-1 space-y-6">
              <div className="space-y-3">
                <div className="h-8 w-60 bg-surface-container-low rounded" />
                <div className="h-16 w-full max-w-2xl bg-surface-container-low rounded" />
                <div className="h-8 w-48 bg-surface-container-low rounded-lg" />
              </div>
              <div className="h-28 bg-white rounded-2xl border border-line" />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="h-64 bg-white rounded-2xl border border-line" />
                <div className="h-64 bg-white rounded-2xl border border-line" />
                <div className="h-64 bg-white rounded-2xl border border-line" />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            <SubjectSidebar
              subjects={subjects}
              activeSubjectId={activeSubjectId || activeSubject?.id}
              onSelectSubject={handleSelectSubject}
            />

            <SubjectDetailView
              subject={activeSubject}
              activeLevel={activeLevel}
              activeBoard={activeBoard}
              onSelectLevel={handleSelectLevel}
              onSelectBoard={handleSelectBoard}
            />
          </div>
        )}
      </section>

      {/* Exam Board Alignment Section */}
      <section className="py-12 md:py-20 px-6 max-w-container-max mx-auto border-t-2 border-line">
        <div className="bg-white/90 rounded-2xl p-8 md:p-12 border-2 border-line mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#c0392b] uppercase tracking-wider">
                EXAM BOARD ALIGNMENT
              </span>
              <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mt-2 mb-4">
                Edexcel, CAIE, AQA &amp; IB Specialists
              </h2>
              <p className="font-['Work_Sans'] text-base text-on-surface-variant leading-relaxed mb-6">
                Different exam boards have distinctly different marking criteria.
                Edexcel rewards clear step-by-step structure, while CAIE demands
                specific technical vocabulary. Our subject leads are trained
                specifically on board-level nuances.
              </p>
              <div className="flex flex-wrap gap-3 font-['IBM_Plex_Mono'] text-xs">
                <span className="px-3.5 py-1.5 bg-[#faf8f2] rounded-lg border border-line font-bold">
                  Edexcel International A-Level
                </span>
                <span className="px-3.5 py-1.5 bg-[#faf8f2] rounded-lg border border-line font-bold">
                  Cambridge CAIE 9708 / 0455
                </span>
                <span className="px-3.5 py-1.5 bg-[#faf8f2] rounded-lg border border-line font-bold">
                  AQA A-Level
                </span>
                <span className="px-3.5 py-1.5 bg-[#faf8f2] rounded-lg border border-line font-bold">
                  IB Diploma Higher Level
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#f5f2e9] p-6 md:p-8 rounded-2xl border border-line">
              <h3 className="font-['Archivo_Black'] text-lg text-on-background mb-4">
                Grade Guarantee Framework
              </h3>
              <div className="space-y-4 text-xs md:text-sm font-['Work_Sans']">
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </span>
                  <p>
                    <strong className="text-on-background">
                      Diagnostic Exam Assessment:
                    </strong>{" "}
                    We pinpoint exact gap areas down to individual syllabus
                    codes.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    <strong className="text-on-background">
                      Targeted Model Answers:
                    </strong>{" "}
                    Students learn model responses written by senior examiners.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p>
                    <strong className="text-on-background">
                      Weekly Marked Timed Papers:
                    </strong>{" "}
                    Detailed feedback delivered within 48 hours.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-[#f5f2e9] p-10 md:p-14 rounded-2xl border-2 border-line">
          <h2 className="font-['Archivo_Black'] text-2xl md:text-4xl text-on-background mb-4">
            Need Help Choosing the Right Subject Plan?
          </h2>
          <p className="font-['Work_Sans'] text-base text-on-surface-variant max-w-xl mx-auto mb-6">
            Speak directly with our academic director to review your
            child&apos;s target grades and create a customized revision roadmap.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm md:text-base px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5"
          >
            Book a Session
          </Link>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      {activeSubject && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-on-background/95 backdrop-blur-md border-t border-line/20 z-50 lg:hidden flex items-center justify-between gap-4 animate-in slide-in-from-bottom pb-6">
          <div className="min-w-0">
            <p className="font-['IBM_Plex_Mono'] text-[10px] text-primary-container font-bold uppercase tracking-wider truncate">
              {activeSubject.title}
            </p>
            <p className="font-['Work_Sans'] text-xs text-white truncate">
              with {activeTutorFirstWord}
            </p>
          </div>
          <Link
            href={`/booking?teacher=${encodeURIComponent(
              activeSubject.tutor || ""
            )}&subject=${encodeURIComponent(
              activeSubject.bookingParam || activeSubject.title || ""
            )}`}
            className="shrink-0 bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs px-5 py-2.5 rounded-full"
          >
            Book Now
          </Link>
        </div>
      )}
    </div>
  );
}
