import Link from "next/link";

export default function SubjectsPage() {
  const subjects = [
    {
      id: "economics",
      title: "Economics (A-Level & IGCSE)",
      level: "Edexcel & CAIE Specialist",
      tag: "FLAGSHIP",
      badgeColor: "bg-[#ffd400] text-[#705c00]",
      description:
        "Master micro & macro theory, 25-mark essay structures, evaluation triggers, and accurate diagram drawing for top A* performance.",
      modules: [
        "Theme 1: Introduction to Markets & Market Failure",
        "Theme 2: The UK Economy – Performance & Policies",
        "Theme 3: Business Behaviour & Labour Markets",
        "Theme 4: A Global Perspective & Macro Trade",
      ],
      tutor: "Khawar (Senior Examiner & Founder)",
    },
    {
      id: "maths",
      title: "Mathematics & Further Maths",
      level: "IGCSE, A-Level & IB HL",
      tag: "POPULAR",
      badgeColor: "bg-[#c6d8fc] text-[#4c5e7c]",
      description:
        "Rigorous problem-solving strategies, calculus mastery, mechanics, and statistics mark-scheme precision.",
      modules: [
        "Pure Mathematics 1–4 (Calculus & Functions)",
        "Mechanics 1 & 2 (Kinematics & Statics)",
        "Statistics 1 & 2 (Probability & Hypothesis Testing)",
        "Further Pure & Complex Numbers",
      ],
      tutor: "Dr. Sarah Lin (Cambridge PhD)",
    },
    {
      id: "physics",
      title: "Physics & Chemistry",
      level: "IGCSE & A-Level",
      tag: "HIGH DEMAND",
      badgeColor: "bg-[#ffe177] text-[#554500]",
      description:
        "Conceptual clarity combined with numerical accuracy, formula derivation, and practical paper exam techniques.",
      modules: [
        "Mechanics & Thermal Physics",
        "Fields, Electricity & Magnetic Inductions",
        "Organic & Physical Chemistry Derivatives",
        "Practical Skills & Calculation Blueprints",
      ],
      tutor: "James Vance (Imperial MSci)",
    },
    {
      id: "business",
      title: "Business Studies & Accounting",
      level: "IGCSE & A-Level",
      tag: "NEW",
      badgeColor: "bg-[#e1e2e7] text-[#191c1f]",
      description:
        "Case study analysis, financial ratio interpretation, and strategic decision-making essay templates.",
      modules: [
        "Marketing & Financial Management",
        "Operations & Resource Planning",
        "Business Strategy & Global Expansion",
        "Financial Statement Analysis & Ratios",
      ],
      tutor: "Elena Rostova (MBA)",
    },
  ];

  return (
    <div className="w-full bg-[#f8f9fa] text-[#191c1d]">
      {/* Header Banner */}
      <section className="bg-[#191c1d] text-white py-16 px-6 border-b-4 border-[#ffd400]">
        <div className="max-w-[1180px] mx-auto">
          <span className="bg-[#ffd400] text-[#191c1d] font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            ACADEMIC SUBJECTS & SYLLABUSES
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-6xl text-[#ffd400] mt-4 mb-4">
            Curriculum Built for A* Results
          </h1>
          <p className="font-['Work_Sans'] text-lg text-[#e1e3e4] max-w-2xl leading-relaxed">
            Every subject module is mapped directly to exam board specifications (CAIE, Edexcel, AQA, OCR, IB). We cover core theory alongside mark scheme application.
          </p>
        </div>
      </section>

      {/* Main Subjects Grid */}
      <section className="py-16 px-6 max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-[#ffffff] rounded-[24px] p-8 border-2 border-[#191c1d] bento-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border border-[#191c1d] ${sub.badgeColor}`}
                  >
                    {sub.tag}
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-[#5c5f62]">
                    {sub.level}
                  </span>
                </div>

                <h3 className="font-['Archivo_Black'] text-2xl text-[#191c1d] mb-3">
                  {sub.title}
                </h3>
                <p className="font-['Work_Sans'] text-sm text-[#4d4632] leading-relaxed mb-6">
                  {sub.description}
                </p>

                <div className="bg-[#f3f4f5] rounded-xl p-4 border border-[#e7e8ea] mb-6">
                  <h4 className="font-['Archivo_Black'] text-xs uppercase text-[#191c1d] mb-3">
                    Core Syllabus Modules
                  </h4>
                  <ul className="space-y-2 text-xs font-['Work_Sans'] text-[#3a3f45]">
                    {sub.modules.map((mod, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="text-[#16a34a] font-bold">✓</span> {mod}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#e7e8ea] flex items-center justify-between">
                <div>
                  <p className="font-['IBM_Plex_Mono'] text-[11px] text-[#5c5f62]">Lead Specialist</p>
                  <p className="font-['Work_Sans'] font-bold text-xs text-[#191c1d]">{sub.tutor}</p>
                </div>

                <Link
                  href={`/booking?subject=${sub.id}`}
                  className="bg-[#ffd400] text-[#705c00] font-['Work_Sans'] font-extrabold text-xs px-4 py-2.5 rounded-full border border-[#191c1d] neo-brutalist-shadow"
                >
                  Book Session
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mark Scheme Blueprint Feature */}
        <div className="bg-[#edeeef] rounded-[24px] p-8 md:p-12 border-2 border-[#191c1d] bento-shadow mb-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7">
              <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#715d00] uppercase tracking-wider">
                EXAM BOARD ALIGNMENT
              </span>
              <h2 className="font-['Archivo_Black'] text-3xl text-[#191c1d] mt-2 mb-4">
                Edexcel, CAIE, AQA & IB Specialists
              </h2>
              <p className="font-['Work_Sans'] text-base text-[#4d4632] leading-relaxed mb-6">
                Different exam boards have distinctly different marking criteria. Edexcel rewards clear step-by-step structure, while CAIE demands specific technical vocabulary. Our subject leads are trained specifically on board-level nuances.
              </p>
              <div className="flex flex-wrap gap-3 font-['IBM_Plex_Mono'] text-xs">
                <span className="px-3 py-1.5 bg-[#ffffff] rounded-lg border border-[#191c1d] font-bold">
                  Edexcel International A-Level
                </span>
                <span className="px-3 py-1.5 bg-[#ffffff] rounded-lg border border-[#191c1d] font-bold">
                  Cambridge CAIE 9708 / 0455
                </span>
                <span className="px-3 py-1.5 bg-[#ffffff] rounded-lg border border-[#191c1d] font-bold">
                  AQA A-Level
                </span>
                <span className="px-3 py-1.5 bg-[#ffffff] rounded-lg border border-[#191c1d] font-bold">
                  IB Diploma Higher Level
                </span>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#ffffff] p-6 rounded-2xl border-2 border-[#191c1d]">
              <h3 className="font-['Archivo_Black'] text-lg text-[#191c1d] mb-3">
                Grade Guarantee Framework
              </h3>
              <div className="space-y-4 text-xs font-['Work_Sans']">
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-bold">1</span>
                  <p><strong className="text-[#191c1d]">Diagnostic Exam Assessment:</strong> We pinpoint exact gap areas down to individual syllabus codes.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-bold">2</span>
                  <p><strong className="text-[#191c1d]">Targeted Model Answers:</strong> Students learn model responses written by senior examiners.</p>
                </div>
                <div className="flex gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-bold">3</span>
                  <p><strong className="text-[#191c1d]">Weekly Marked Timed Papers:</strong> Detailed feedback delivered within 48 hours.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center bg-[#191c1d] text-white p-10 rounded-[24px] border-2 border-[#191c1d] shadow-lg">
          <h2 className="font-['Archivo_Black'] text-3xl text-[#ffd400] mb-4">
            Need Help Choosing the Right Subject Plan?
          </h2>
          <p className="font-['Work_Sans'] text-base text-[#e1e3e4] max-w-xl mx-auto mb-6">
            Speak directly with our academic director to review your child's target grades and create a customized revision roadmap.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-[#ffd400] text-[#705c00] font-['Work_Sans'] font-extrabold text-base px-8 py-4 rounded-full border border-white neo-brutalist-shadow"
          >
            Book Free Subject Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
