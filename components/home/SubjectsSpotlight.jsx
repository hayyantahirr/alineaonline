import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SubjectsSpotlight() {
  const subjects = [
    {
      num: "01",
      name: "Economics",
      level: "IGCSE & A-Level · Edexcel & AQA",
      flagship: true,
      description: "Our flagship subject. Taught directly from real examiner reports and mark schemes.",
    },
    {
      num: "02",
      name: "Mathematics",
      level: "IGCSE, Further Maths & A-Level · Edexcel & CAIE",
      flagship: false,
      description: "Focus on problem-solving frameworks and step-by-step mark allocation.",
    },
    {
      num: "03",
      name: "Physics",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      flagship: false,
      description: "Mastering practical skills, mathematical methods, and structured long answers.",
    },
    {
      num: "04",
      name: "Biology",
      level: "IGCSE & A-Level · Edexcel & AQA",
      flagship: false,
      description: "Precision in key terminology, diagram labelling, and data analysis questions.",
    },
    {
      num: "05",
      name: "English Language",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      flagship: false,
      description: "Analytical techniques, essay structure, and unseen text interpretation.",
    },
    {
      num: "06",
      name: "English Literature",
      level: "IGCSE & A-Level · Edexcel & AQA",
      flagship: false,
      description: "Textual analysis, comparative essays, and examiner-focused thesis writing.",
    },
    {
      num: "07",
      name: "Business Studies",
      level: "IGCSE & A-Level · Edexcel & CAIE",
      flagship: false,
      description: "Case study evaluation, financial calculations, and high-level 12-mark responses.",
    },
  ];

  return (
    <section
      id="subjects"
      className="py-20 md:py-28 bg-surface-container-low/50 border-y-2 border-line"
    >
      <div className="px-6 max-w-container-max mx-auto">
        <div className="mb-14 max-w-2xl">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
            <span className="w-5 h-0.5 bg-primary-container"></span> What We Teach
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-on-background mb-4 leading-tight">
            Seven subjects. One uncompromising standard.
          </h2>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed">
            Every subject is taught using the same mark-scheme-first methodology and direct director oversight.
          </p>
        </div>

        {/* Editorial Numbered List Layout (01–07) */}
        <div className="flex flex-col border-b border-line">
          {subjects.map((sub) => (
            <Link
              key={sub.num}
              href="/subjects"
              className="group border-t border-line py-6 md:py-8 px-4 md:px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all duration-200 hover:bg-white rounded-2xl hover:shadow-[4px_4px_0_0_rgba(25,28,29,0.08)]"
            >
              {/* Left side: Number + Subject Name + Tag */}
              <div className="flex items-start md:items-center gap-6 md:gap-8 flex-1">
                <span className="font-['IBM_Plex_Mono'] font-bold text-lg md:text-xl text-[#c0392b] group-hover:scale-110 transition-transform duration-200 shrink-0">
                  {sub.num}
                </span>

                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="font-['Archivo_Black'] text-xl md:text-2xl text-on-background group-hover:text-primary transition-colors">
                      {sub.name}
                    </h3>
                    {sub.flagship && (
                      <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] font-bold text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full border border-on-background">
                        Flagship Subject
                      </span>
                    )}
                  </div>
                  <p className="font-['Work_Sans'] text-xs md:text-sm text-on-surface-variant">
                    {sub.level}
                  </p>
                </div>
              </div>

              {/* Middle: Short Description */}
              <div className="md:max-w-xs lg:max-w-md text-sm text-on-surface-variant font-['Work_Sans'] leading-relaxed hidden sm:block">
                {sub.description}
              </div>

              {/* Right side: Arrow button */}
              <div className="flex items-center gap-2 text-on-background font-['Work_Sans'] font-bold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform shrink-0">
                <span className="hidden md:inline">Explore</span>
                <div className="w-9 h-9 rounded-full border border-on-background/20 group-hover:border-on-background group-hover:bg-primary-container flex items-center justify-center transition-colors">
                  <ArrowUpRight className="w-4 h-4 text-on-background" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
