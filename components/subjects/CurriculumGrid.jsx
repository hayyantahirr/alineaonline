"use client";

import { BookOpen, ClipboardList, Target } from "lucide-react";

export default function CurriculumGrid({ board }) {
  if (!board) {
    return (
      <div className="bg-[#f5f2e9]/50 rounded-xl p-8 border border-line text-center">
        <p className="font-['Work_Sans'] text-sm text-on-surface-variant">
          Select a level and exam board above to view the curriculum.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 transition-all duration-300">
      {/* Syllabus Modules */}
      <div className="bg-white/80 rounded-2xl p-5 md:p-6 border-2 border-line hover:border-on-background/30 transition-colors">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
          <BookOpen className="w-4 h-4 text-[#c0392b]" />
          <h4 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-background">
            Syllabus Modules
          </h4>
        </div>
        <ul className="flex flex-col gap-2.5">
          {(board.modules || []).length > 0 ? (
            board.modules.map((mod, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="text-[#c0392b] font-bold text-sm leading-none mt-0.5">
                  ✓
                </span>
                <span className="font-['Work_Sans'] text-sm text-on-background leading-relaxed">
                  {mod}
                </span>
              </li>
            ))
          ) : (
            <li className="text-xs text-on-surface-variant italic">
              Modules will be listed soon.
            </li>
          )}
        </ul>
      </div>

      {/* Exam Structure */}
      <div className="bg-white/80 rounded-2xl p-5 md:p-6 border-2 border-line hover:border-on-background/30 transition-colors">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
          <ClipboardList className="w-4 h-4 text-[#c0392b]" />
          <h4 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-background">
            Exam Structure
          </h4>
        </div>
        <ul className="flex flex-col gap-2.5">
          {(board.examStructure || []).length > 0 ? (
            board.examStructure.map((exam, i) => (
              <li
                key={i}
                className="font-['Work_Sans'] text-sm text-on-background bg-[#f5f2e9]/60 rounded-lg px-3.5 py-2.5 border border-line leading-relaxed"
              >
                {exam}
              </li>
            ))
          ) : (
            <li className="text-xs text-on-surface-variant italic">
              Exam components will be listed soon.
            </li>
          )}
        </ul>
      </div>

      {/* Targeted Skills */}
      <div className="bg-white/80 rounded-2xl p-5 md:p-6 border-2 border-line hover:border-on-background/30 transition-colors">
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-line">
          <Target className="w-4 h-4 text-[#c0392b]" />
          <h4 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-background">
            Targeted Skills
          </h4>
        </div>
        <ul className="flex flex-col gap-2.5">
          {(board.skills || []).length > 0 ? (
            board.skills.map((skill, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="font-['Work_Sans'] text-sm text-on-background leading-relaxed">
                  {skill}
                </span>
              </li>
            ))
          ) : (
            <li className="text-xs text-on-surface-variant italic">
              Targeted skills will be listed soon.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
