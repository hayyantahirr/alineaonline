"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  GraduationCap,
  X,
  Calendar,
  Sparkles,
  ExternalLink,
} from "lucide-react";

// Helper to get initials if image fails or is absent
function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

// Resilient Teacher Avatar Component
function TeacherAvatar({
  src,
  alt,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 80px, 96px",
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    return (
      <div className="w-full h-full bg-[#191c1d] flex items-center justify-center text-primary-container font-['Archivo_Black'] text-lg md:text-xl select-none">
        {getInitials(alt)}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt || "Teacher Profile"}
      fill
      priority={priority}
      sizes={sizes}
      className={`object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  );
}

export default function FacultyPage() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  // Fetch teachers from dedicated API route
  useEffect(() => {
    let isMounted = true;

    async function fetchTeachers() {
      try {
        setLoading(true);
        const res = await fetch("/api/teachers");
        if (!res.ok) throw new Error("Failed to load faculty");
        const data = await res.json();

        if (isMounted) {
          if (data.success && Array.isArray(data.teachers)) {
            setTeachers(data.teachers);
          } else {
            setTeachers([]);
          }
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
        if (isMounted) {
          setTeachers([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchTeachers();

    return () => {
      isMounted = false;
    };
  }, []);

  // Close modal on Escape key press and handle body scroll lock
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedTeacher(null);
      }
    };

    if (selectedTeacher) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTeacher]);

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen">
      {/* Page Header */}
      <section className="bg-on-background text-white py-14 md:py-18 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto text-center">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            SUBJECT SPECIALISTS &amp; EXAMINERS
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-5xl text-primary-container mt-3 mb-3">
            Meet Our Teaching Faculty
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-surface-variant max-w-2xl mx-auto leading-relaxed">
            Every teacher at Alinea is an examiner-trained subject specialist
            coached in our mark-scheme-first methodology. Book a 1:1
            consultation with any teacher below.
          </p>
        </div>
      </section>

      {/* Main Faculty Grid Section */}
      <section className="py-14 md:py-20 px-6 max-w-container-max mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-2">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span> All Faculty
              Members
            </span>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background">
              Select a Specialist for Your Target Subject
            </h2>
          </div>
          <p className="font-['Work_Sans'] text-xs md:text-sm text-on-surface-variant max-w-md">
            Click any profile to view full qualifications, teaching highlights,
            and methodology.
          </p>
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border-2 border-line p-6 flex flex-col justify-between animate-pulse"
              >
                <div>
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-20 h-20 rounded-2xl bg-surface-container-low shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-24 h-4 bg-surface-container-low rounded" />
                      <div className="w-36 h-6 bg-surface-container-low rounded" />
                      <div className="w-28 h-4 bg-surface-container-low rounded" />
                    </div>
                  </div>
                  <div className="bg-[#f5f2e9]/70 rounded-xl p-4 space-y-2 mb-3">
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 bg-surface-container-low rounded" />
                      <div className="h-8 bg-surface-container-low rounded" />
                      <div className="h-8 bg-surface-container-low rounded" />
                    </div>
                  </div>
                </div>
                <div className="h-10 bg-surface-container-low rounded-full mt-4" />
              </div>
            ))}
          </div>
        ) : (
          /* Unified Faculty Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-7">
            {teachers.map((teacher, idx) => {
              const bookingUrl = `/booking?teacher=${encodeURIComponent(
                teacher.name || "",
              )}&subject=${encodeURIComponent(
                teacher.subjectBookingParam || teacher.subject || "",
              )}`;

              const boardsList = Array.isArray(teacher.boards)
                ? teacher.boards
                : typeof teacher.boards === "string" && teacher.boards
                  ? teacher.boards.split(",").map((b) => b.trim())
                  : [];

              return (
                <div
                  key={teacher.id || idx}
                  className="bg-white rounded-2xl border-2 border-line hover:border-on-background hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-on-background)] transition-transform duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div
                    onClick={() => setSelectedTeacher(teacher)}
                    className="cursor-pointer"
                  >
                    {/* Card Header: Photo + Core Info */}
                    <div className="p-5 md:p-6 pb-4">
                      <div className="flex items-start gap-4">
                        {/* Photo Thumbnail */}
                        <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-line shrink-0 group-hover:border-on-background transition-colors cursor-pointer relative bg-surface-container-low">
                          <TeacherAvatar
                            src={teacher.image}
                            alt={teacher.name}
                            priority={idx < 3}
                            className="group-hover:scale-105 transition-transform duration-200"
                          />
                        </div>

                        {/* Name, Role & Status */}
                        <div className="flex flex-col min-w-0 flex-1">
                          {/* Availability Pill */}
                          <div className="mb-1.5">
                            <span
                              className={`inline-flex items-center gap-1.5 font-['IBM_Plex_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                teacher.availabilityStatus === "available"
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                                  : "bg-amber-50 text-amber-800 border-amber-300"
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  teacher.availabilityStatus === "available"
                                    ? "bg-emerald-500"
                                    : "bg-amber-500"
                                }`}
                              />
                              {teacher.availability || "Accepting Students"}
                            </span>
                          </div>

                          <h3 className="font-['Archivo_Black'] text-lg text-on-background truncate hover:text-[#c0392b] transition-colors">
                            {teacher.name}
                          </h3>

                          <p className="font-['Work_Sans'] text-xs text-[#c0392b] font-bold truncate">
                            {teacher.role}
                          </p>

                          {teacher.qualification && (
                            <span className="font-['IBM_Plex_Mono'] text-[11px] text-on-surface-variant mt-1 flex items-center gap-1 truncate">
                              <GraduationCap className="w-3.5 h-3.5 shrink-0" />
                              <span className="truncate">
                                {teacher.qualification}
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Card Specs Grid */}
                    <div className="px-5 md:px-6 pb-4">
                      <div className="bg-[#f5f2e9]/70 rounded-xl p-3.5 border border-line">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                              Subject
                            </span>
                            <span className="font-['Work_Sans'] font-bold text-xs text-on-background line-clamp-1">
                              {teacher.subject}
                            </span>
                          </div>
                          <div>
                            <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                              Levels
                            </span>
                            <span className="font-['Work_Sans'] font-bold text-xs text-on-background line-clamp-1">
                              {teacher.levels || "IGCSE / A-Level"}
                            </span>
                          </div>
                          <div>
                            <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                              Experience
                            </span>
                            <span className="font-['Work_Sans'] font-bold text-xs text-on-background">
                              {teacher.experience || "5+ Years"}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Exam Boards */}
                      {boardsList.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-3">
                          <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant mr-0.5">
                            Boards:
                          </span>
                          {boardsList.map((board, bIdx) => (
                            <span
                              key={bIdx}
                              className="font-['IBM_Plex_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-md border border-line bg-surface-container-low text-on-background"
                            >
                              {board}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-5 md:p-6 pt-3 border-t border-line/60 bg-[#fbf9f4]/40 flex flex-col gap-2.5">
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSelectedTeacher(teacher)}
                        className="font-['Work_Sans'] font-bold text-xs text-on-surface-variant hover:text-on-background inline-flex items-center gap-1 transition-colors cursor-pointer"
                      >
                        View Profile &amp; Bio
                        <ExternalLink className="w-3 h-3" />
                      </button>
                      <span className="font-['IBM_Plex_Mono'] text-[10px] text-muted">
                        1:1 &amp; Group
                      </span>
                    </div>

                    <Link
                      href={bookingUrl}
                      className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs py-3 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 flex items-center justify-center gap-2 text-center"
                    >
                      <span>
                        Book Session with{" "}
                        {(teacher.name || "Teacher").split(" ")[0]}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Teaching Standards & Hiring Rigor */}
      <section className="py-16 md:py-20 px-6 max-w-container-max mx-auto border-t-2 border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Vetting Process */}
          <div>
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span> Teaching
              Standards
            </span>
            <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-6">
              How we vet our{" "}
              <span className="relative inline-block text-on-background">
                teachers.
                <svg
                  className="absolute -bottom-1 left-0 w-full h-2 text-[#c0392b]"
                  viewBox="0 0 100 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 25 2, 75 10, 98 4"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h2>
            <p className="font-['Work_Sans'] text-base text-on-surface-variant leading-relaxed mb-8">
              Not everyone who applies teaches at Alinea. Our hiring process is
              intentionally rigorous because we answer to parents who expect
              grade outcomes — not just lesson delivery.
            </p>

            <div className="flex flex-col gap-5 font-['Work_Sans'] text-sm">
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-on-background">
                    Application &amp; CV Review
                  </strong>
                  <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">
                    Minimum 2+ years teaching experience and verified exam board
                    familiarity required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-on-background">
                    Diagnostic Teaching Session
                  </strong>
                  <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">
                    A live 30-minute mock lesson evaluated on student
                    engagement, conceptual depth, and clarity.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-on-background">
                    Mark-Scheme Methodology Training
                  </strong>
                  <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">
                    Every teacher is trained on Alinea&apos;s
                    examiner-report-driven teaching approach and rubrics.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3.5">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-on-background">
                    Ongoing Performance Audits
                  </strong>
                  <p className="text-on-surface-variant text-xs md:text-sm mt-0.5">
                    Regular lesson audits and student grade progression checks
                    ensure uncompromising quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Key Differentiators & Join Us */}
          <div className="flex flex-col gap-6">
            <div className="bg-on-background text-white rounded-2xl border-2 border-on-background p-6 md:p-8 shadow-md">
              <h3 className="font-['Archivo_Black'] text-lg text-primary-container mb-4 flex items-center gap-2.5">
                <Award className="w-5 h-5" />
                What Sets Our Faculty Apart
              </h3>
              <div className="flex flex-col gap-4 font-['Work_Sans'] text-sm">
                <div className="flex items-start gap-3 border-b border-white/10 pb-3.5">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      Board-Specific Expertise
                    </strong>
                    <p className="text-surface-variant text-xs mt-0.5">
                      Each teacher specialises in specific exam boards — not
                      generic &ldquo;A-Level&rdquo; teaching.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-white/10 pb-3.5">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">Mark-Scheme First</strong>
                    <p className="text-surface-variant text-xs mt-0.5">
                      Lesson plans are reverse-engineered from examiner reports
                      and grading rubrics.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-white/10 pb-3.5">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">Academic Oversight</strong>
                    <p className="text-surface-variant text-xs mt-0.5">
                      Academic leadership maintains direct oversight of every
                      student&apos;s progress report.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      Permanent Team, No Gig Freelancers
                    </strong>
                    <p className="text-surface-variant text-xs mt-0.5">
                      Our teachers are dedicated team members committed to
                      long-term student outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container rounded-2xl border-2 border-on-background p-6 md:p-8 shadow-[6px_6px_0_0_var(--color-on-background)]">
              <div className="flex items-center gap-3 mb-2.5">
                <BookOpen className="w-5 h-5 text-on-background" />
                <h3 className="font-['Archivo_Black'] text-lg text-on-background">
                  Want to teach at Alinea?
                </h3>
              </div>
              <p className="font-['Work_Sans'] text-sm text-on-primary-container leading-relaxed mb-4">
                We&apos;re always looking for exceptional, mark-scheme-literate
                educators. If you know how examiner rubrics work inside out,
                we&apos;d love to meet you.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 font-['Work_Sans'] font-bold text-sm text-on-background border-b-2 border-on-background pb-0.5 hover:text-[#c0392b] hover:border-[#c0392b] transition-colors"
              >
                Explore open teacher roles →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA Banner */}
      <section className="py-16 md:py-20 px-6 max-w-container-max mx-auto">
        <div className="text-center bg-[#f5f2e9] p-10 md:p-14 rounded-2xl border-2 border-line">
          <h2 className="font-['Archivo_Black'] text-2xl md:text-4xl text-on-background mb-4">
            Ready to Accelerate Your Grades?
          </h2>
          <p className="font-['Work_Sans'] text-base text-on-surface-variant max-w-xl mx-auto mb-6">
            Book a diagnostic consultation to assess your current syllabus
            standing and match with your dedicated specialist tutor.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm md:text-base px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5"
          >
            Book a Session Now
          </Link>
        </div>
      </section>

      {/* Teacher Full Profile Modal */}
      {selectedTeacher && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60">
          {/* Backdrop Click to Close */}
          <div
            className="absolute inset-0"
            onClick={() => setSelectedTeacher(null)}
          />

          {/* Modal Dialog Card */}
          <div className="relative z-10 bg-white rounded-3xl border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="p-6 md:p-8 pb-5 border-b border-line flex items-start justify-between gap-4 bg-white shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl overflow-hidden border-2 border-line shrink-0 relative bg-surface-container-low">
                  <TeacherAvatar
                    src={selectedTeacher.image}
                    alt={selectedTeacher.name}
                    priority={true}
                    sizes="(max-width: 768px) 64px, 80px"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`inline-flex items-center gap-1 font-['IBM_Plex_Mono'] text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        selectedTeacher.availabilityStatus === "available"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-amber-50 text-amber-800 border-amber-300"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          selectedTeacher.availabilityStatus === "available"
                            ? "bg-emerald-500"
                            : "bg-amber-500"
                        }`}
                      />
                      {selectedTeacher.availability || "Accepting Students"}
                    </span>
                  </div>
                  <h3 className="font-['Archivo_Black'] text-xl md:text-2xl text-on-background">
                    {selectedTeacher.name}
                  </h3>
                  <p className="font-['Work_Sans'] text-xs md:text-sm text-[#c0392b] font-bold">
                    {selectedTeacher.role}
                  </p>
                  {selectedTeacher.qualification && (
                    <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant flex items-center gap-1.5 mt-0.5">
                      <GraduationCap className="w-3.5 h-3.5 text-muted" />
                      {selectedTeacher.qualification}
                    </span>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedTeacher(null)}
                className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-container-high border border-line flex items-center justify-center text-on-background transition-colors cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8 space-y-6 overflow-y-auto flex-1 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-line/80 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-on-surface-variant/40 scrollbar-thin">
              {/* Bio Paragraph */}
              <div>
                <h4 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-surface-variant mb-2">
                  Academic Background
                </h4>
                <p className="font-['Work_Sans'] text-sm text-on-background leading-relaxed">
                  {selectedTeacher.bio}
                </p>
              </div>

              {/* Specs Box */}
              <div className="bg-[#f5f2e9]/80 rounded-2xl p-4 md:p-5 border border-line">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1">
                      Primary Subject
                    </span>
                    <strong className="font-['Work_Sans'] text-sm text-on-background block">
                      {selectedTeacher.subject}
                    </strong>
                  </div>
                  <div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1">
                      Target Levels
                    </span>
                    <strong className="font-['Work_Sans'] text-sm text-on-background block">
                      {selectedTeacher.levels || "IGCSE / A-Level"}
                    </strong>
                  </div>
                  <div>
                    <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-1">
                      Teaching Experience
                    </span>
                    <strong className="font-['Work_Sans'] text-sm text-on-background block">
                      {selectedTeacher.experience || "5+ Years"}
                    </strong>
                  </div>
                </div>

                {selectedTeacher.boards && (
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-2">
                    <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant">
                      Exam Boards:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {(Array.isArray(selectedTeacher.boards)
                        ? selectedTeacher.boards
                        : typeof selectedTeacher.boards === "string"
                          ? selectedTeacher.boards
                              .split(",")
                              .map((b) => b.trim())
                          : []
                      ).map((board, bIdx) => (
                        <span
                          key={bIdx}
                          className="font-['IBM_Plex_Mono'] text-xs font-bold px-2.5 py-0.5 rounded-lg border border-on-background bg-primary-container text-on-background"
                        >
                          {board}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Teaching Highlights */}
              {selectedTeacher.highlights &&
                selectedTeacher.highlights.length > 0 && (
                  <div>
                    <h4 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-surface-variant mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#c0392b]" />
                      Key Teaching Highlights &amp; Methodology
                    </h4>
                    <ul className="flex flex-col gap-2.5">
                      {selectedTeacher.highlights.map((highlight, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2.5 text-xs md:text-sm font-['Work_Sans'] text-on-surface-variant"
                        >
                          <span className="text-[#c0392b] font-bold mt-0.5 shrink-0">
                            ✓
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 md:p-8 pt-4 border-t border-line bg-[#fbf9f4] flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="font-['Work_Sans'] text-xs text-on-surface-variant">
                1:1 &amp; Small Group Consultation Available
              </span>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => setSelectedTeacher(null)}
                  className="px-5 py-3 rounded-full border-2 border-line text-on-background font-['Work_Sans'] font-bold text-xs hover:bg-white transition-colors cursor-pointer w-full sm:w-auto"
                >
                  Close
                </button>
                <Link
                  href={`/booking?teacher=${encodeURIComponent(
                    selectedTeacher.name || "",
                  )}&subject=${encodeURIComponent(
                    selectedTeacher.subjectBookingParam ||
                      selectedTeacher.subject ||
                      "",
                  )}`}
                  onClick={() => setSelectedTeacher(null)}
                  className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs px-6 py-3 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 w-full sm:w-auto text-center"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>
                    Book Session with{" "}
                    {(selectedTeacher.name || "Teacher").split(" ")[0]}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
