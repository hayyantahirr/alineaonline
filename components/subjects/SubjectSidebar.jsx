"use client";

import { BookOpen } from "lucide-react";

export default function SubjectSidebar({
  subjects,
  activeSubjectId,
  onSelectSubject,
}) {
  return (
    <aside className="w-full lg:w-64 shrink-0">
      <h3 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-background mb-4 pb-2 border-b border-line flex items-center gap-2">
        <BookOpen className="w-4 h-4 text-[#c0392b]" />
        Subjects
      </h3>

      <nav className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-1 px-1">
        {subjects.map((subject) => {
          const isActive = subject.id === activeSubjectId;
          return (
            <button
              key={subject.id}
              onClick={() => onSelectSubject(subject.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left whitespace-nowrap lg:whitespace-normal transition-all duration-200 cursor-pointer shrink-0 lg:shrink border-2 ${
                isActive
                  ? "bg-on-background text-white border-on-background shadow-[4px_4px_0_0_var(--color-primary-container)]"
                  : "bg-white/70 text-on-background border-line hover:border-on-background/30 hover:bg-white"
              }`}
            >
              <span
                className={`font-['IBM_Plex_Mono'] text-xs font-bold ${
                  isActive ? "text-primary-container" : "text-[#c0392b]"
                }`}
              >
                {subject.num}
              </span>
              <span className="font-['Work_Sans'] text-sm font-bold leading-tight">
                {subject.title}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
