import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function SubjectsPage() {
  const subjects = [
    {
      id: "economics",
      num: "01",
      title: "Economics",
      level: "IGCSE & A-Level · Edexcel, AQA & CAIE",
      tag: "FLAGSHIP",
      badgeType: "red-outline",
      description:
        "Master micro & macro theory, 25-mark essay structures, evaluation triggers, and accurate diagram drawing for top A* performance.",
      modules: [
        "Theme 1: Introduction to Markets & Market Failure",
        "Theme 2: The UK & Global Economy Performance",
        "Theme 3: Business Behaviour & Labour Markets",
        "Theme 4: Macro Trade, Exchange Rates & Growth",
      ],
      tutor: "Khawar (Academic Director & Senior Examiner)",
    },
    {
      id: "maths",
      num: "02",
      title: "Mathematics & Further Maths",
      level: "IGCSE, A-Level & IB HL · Edexcel & CAIE",
      tag: "POPULAR",
      badgeType: "yellow",
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
      num: "03",
      title: "Physics",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      tag: "HIGH DEMAND",
      badgeType: "yellow",
      description:
        "Conceptual clarity combined with numerical accuracy, formula derivation, and practical paper exam techniques.",
      modules: [
        "Mechanics & Thermal Physics",
        "Fields, Electricity & Magnetic Inductions",
        "Nuclear & Quantum Physics Principles",
        "Practical Skills & Calculation Blueprints",
      ],
      tutor: "James Vance (Imperial MSci)",
    },
    {
      id: "biology",
      num: "04",
      title: "Biology",
      level: "IGCSE & A-Level · Edexcel & AQA",
      tag: "POPULAR",
      badgeType: "yellow",
      description:
        "Precision in key biological terminology, diagram labelling, experimental design, and data analysis questions.",
      modules: [
        "Biological Molecules & Cell Architecture",
        "Genetics, Biodiversity & Inheritance Patterns",
        "Organisms Exchange & Transport Systems",
        "Control Systems, Homeostasis & Energy",
      ],
      tutor: "Dr. Rachel Mehta (Oxford PhD)",
    },
    {
      id: "english-language",
      num: "05",
      title: "English Language",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      tag: "CORE",
      badgeType: "yellow",
      description:
        "Analytical essay techniques, language & structural devices, unseen text interpretation, and persuasive writing.",
      modules: [
        "Non-Fiction Text Analysis & Comparison",
        "Transactional & Creative Writing Blueprints",
        "Language & Linguistic Frameworks",
        "Unseen Comprehension & Examiner Triggers",
      ],
      tutor: "Claire Hemsworth (MA Cantab)",
    },
    {
      id: "english-literature",
      num: "06",
      title: "English Literature",
      level: "IGCSE & A-Level · Edexcel & AQA",
      tag: "CORE",
      badgeType: "yellow",
      description:
        "Deep textual analysis, comparative poetry essays, drama interpretation, and examiner-focused thesis formulation.",
      modules: [
        "Shakespeare & Drama Critical Analysis",
        "19th-Century Novel Context & Character Essays",
        "Poetry Anthology & Unseen Poetry Comparison",
        "Thesis Formulation & Mark Scheme Vocabulary",
      ],
      tutor: "Claire Hemsworth (MA Cantab)",
    },
    {
      id: "business",
      num: "07",
      title: "Business Studies & Accounting",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      tag: "NEW",
      badgeType: "yellow",
      description:
        "Case study analysis, financial ratio interpretation, accounting ledgers, and strategic decision-making essay templates.",
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
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
      {/* Paper Header Banner */}
      <section className="py-16 md:py-24 px-6 border-b-2 border-line bg-[#f5f2e9]/60">
        <div className="max-w-container-max mx-auto">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-4">
            <span className="w-5 h-0.5 bg-[#c0392b]"></span> Academic Syllabuses
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-6xl text-on-background mb-4 leading-tight">
            Curriculum Built for{" "}
            <span className="relative inline-block text-on-background">
              A* Results
              <svg
                className="absolute -bottom-1 left-0 w-full h-3 text-[#c0392b]"
                viewBox="0 0 100 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 C 30 2, 70 10, 98 4"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant max-w-2xl leading-relaxed">
            Every subject module is mapped directly to exam board specifications (CAIE, Edexcel, AQA, IB). We teach core theory strictly alongside mark scheme execution.
          </p>
        </div>
      </section>

      {/* Main Subjects Roster — Clean Hairline Borders */}
      <section className="py-16 md:py-24 px-6 max-w-container-max mx-auto">
        <div className="flex flex-col gap-10 mb-20">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-white/80 rounded-2xl p-6 md:p-10 border-2 border-line hover:border-on-background/40 transition-all duration-200"
            >
              {/* Header Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4 pb-4 border-b border-line">
                <div className="flex items-center gap-4">
                  <span className="font-['IBM_Plex_Mono'] font-bold text-lg text-[#c0392b]">
                    {sub.num}
                  </span>
                  <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background">
                    {sub.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  {sub.badgeType === "red-outline" ? (
                    <span className="font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border-2 border-[#c0392b] text-[#c0392b] bg-[#c0392b]/5">
                      {sub.tag}
                    </span>
                  ) : (
                    <span className="font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border border-on-background bg-primary-container text-on-background">
                      {sub.tag}
                    </span>
                  )}
                  <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                    {sub.level}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="font-['Work_Sans'] text-base text-on-surface-variant leading-relaxed mb-6">
                {sub.description}
              </p>

              {/* Core Syllabus Modules — Red Checkmarks */}
              <div className="bg-[#f5f2e9]/50 rounded-xl p-5 md:p-6 border border-line mb-6">
                <h3 className="font-['Archivo_Black'] text-xs uppercase tracking-wider text-on-background mb-4">
                  Core Syllabus Modules
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-['Work_Sans'] text-sm text-on-background">
                  {sub.modules.map((mod, i) => (
                    <div key={i} className="flex items-start gap-2.5">
                      <span className="text-[#c0392b] font-bold text-base leading-none mt-0.5">
                        ✓
                      </span>
                      <span>{mod}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Row */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant block">
                    Lead Academic Specialist
                  </span>
                  <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
                    {sub.tutor}
                  </span>
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
          ))}
        </div>

        {/* Mark Scheme Alignment Section — Paper Aesthetic */}
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
                Different exam boards have distinctly different marking criteria. Edexcel rewards clear step-by-step structure, while CAIE demands specific technical vocabulary. Our subject leads are trained specifically on board-level nuances.
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
                    <strong className="text-on-background">Diagnostic Exam Assessment:</strong> We pinpoint exact gap areas down to individual syllabus codes.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </span>
                  <p>
                    <strong className="text-on-background">Targeted Model Answers:</strong> Students learn model responses written by senior examiners.
                  </p>
                </div>
                <div className="flex gap-3 items-start">
                  <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </span>
                  <p>
                    <strong className="text-on-background">Weekly Marked Timed Papers:</strong> Detailed feedback delivered within 48 hours.
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
            Speak directly with our academic director to review your child&apos;s target grades and create a customized revision roadmap.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm md:text-base px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform hover:-translate-y-0.5"
          >
            Book a Session
          </Link>
        </div>
      </section>
    </div>
  );
}
