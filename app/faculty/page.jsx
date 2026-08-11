import Link from "next/link";
import { ArrowRight, Award, BookOpen, GraduationCap } from "lucide-react";

export default function FacultyPage() {
  const director = {
    name: "Khawar",
    role: "Academic Director & Founder",
    image: "/stitch/founder.jpg",
    subject: "Economics",
    levels: "IGCSE & A-Level",
    boards: ["Edexcel", "AQA", "CAIE"],
    experience: "6+ Years",
    bio: "Khawar founded Alinea to close the gap between how subjects are taught and how they're actually graded. A senior Economics specialist, he personally reviews every lesson plan, trains every teacher on mark-scheme methodology, and maintains direct academic oversight of every student's progress. Alinea stays deliberately small so every student gets his direct attention.",
    highlights: [
      "Lesson content built from examiner reports",
      "Trained 15+ teachers on mark-scheme methodology",
      "Direct academic oversight of every student",
    ],
  };

  const teachers = [
    {
      name: "Dr. Sarah Lin",
      role: "Senior Mathematics Specialist",
      image: "/stitch/maths.jpg",
      subject: "Mathematics & Further Maths",
      levels: "IGCSE, A-Level & IB HL",
      boards: ["Edexcel", "CAIE"],
      experience: "8+ Years",
      qualification: "Cambridge PhD",
      bio: "Specialises in building rigorous problem-solving strategies from first principles. Her students consistently achieve top marks in Pure Mathematics, Mechanics, and Statistics through structured, step-by-step mark-scheme precision.",
    },
    {
      name: "James Vance",
      role: "Physics Lead",
      image: "/stitch/physics.jpg",
      subject: "Physics",
      levels: "IGCSE & A-Level",
      boards: ["Edexcel", "CAIE"],
      experience: "7+ Years",
      qualification: "Imperial MSci",
      bio: "Brings conceptual clarity combined with numerical accuracy. Known for his formula derivation workshops, practical paper technique sessions, and ability to break down complex quantum and field theory into exam-ready frameworks.",
    },
    {
      name: "Dr. Rachel Mehta",
      role: "Biology Lead",
      image: "/stitch/biology.jpg",
      subject: "Biology",
      levels: "IGCSE & A-Level",
      boards: ["Edexcel", "AQA"],
      experience: "9+ Years",
      qualification: "Oxford PhD",
      bio: "Expert in precision biological terminology, diagram labelling, experimental design, and data analysis questions. Her structured revision frameworks have helped dozens of students move from B/C grades to consistent A* performance.",
    },
    {
      name: "Claire Hemsworth",
      role: "English Language & Literature Lead",
      image: "/stitch/english.jpg",
      subject: "English Language & Literature",
      levels: "IGCSE & A-Level",
      boards: ["Edexcel", "CAIE", "AQA"],
      experience: "10+ Years",
      qualification: "MA Cantab",
      bio: "Specialises in analytical essay techniques, language and structural devices, comparative poetry, and unseen text interpretation. Her thesis formulation method has become a core part of Alinea's English curriculum.",
    },
    {
      name: "Elena Rostova",
      role: "Business Studies & Accounting Lead",
      image: "/stitch/business.jpg",
      subject: "Business Studies & Accounting",
      levels: "IGCSE & A-Level",
      boards: ["Edexcel", "CAIE"],
      experience: "6+ Years",
      qualification: "MBA",
      bio: "Expert in case study analysis, financial ratio interpretation, and strategic decision-making essay templates. Brings real-world business consulting experience into the classroom to make theory tangible and exam-ready.",
    },
  ];

  

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
      
      {/* Academic Director — Featured Section */}
      <section className="py-16 md:py-24 px-6 max-w-container-max mx-auto">
        <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
          <span className="w-5 h-0.5 bg-[#c0392b]"></span> Academic Director
        </span>
        <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-10">
          The standard every lesson answers to.
        </h2>

        <div className="bg-white/90 rounded-2xl border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Director Photo */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] lg:aspect-auto lg:h-full">
                <img
                  src={director.image}
                  alt={`${director.name}, ${director.role}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-on-background/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-white/20"></div>
              </div>
              {/* Floating Badge */}
              <div className="absolute top-4 left-4 bg-[#c0392b] text-white font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider border border-white/20">
                Founder
              </div>
            </div>

            {/* Director Info */}
            <div className="lg:col-span-7 p-6 md:p-10 flex flex-col justify-center gap-5">
              <div>
                <h3 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background mb-1">
                  {director.name}
                </h3>
                <p className="font-['IBM_Plex_Mono'] text-sm text-[#c0392b] font-bold">
                  {director.role}
                </p>
              </div>

              <p className="font-['Work_Sans'] text-base text-on-surface-variant leading-relaxed">
                {director.bio}
              </p>

              {/* Director Details Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-line">
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                    Subject
                  </span>
                  <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
                    {director.subject}
                  </span>
                </div>
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                    Levels
                  </span>
                  <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
                    {director.levels}
                  </span>
                </div>
                <div>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant block mb-1">
                    Experience
                  </span>
                  <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
                    {director.experience}
                  </span>
                </div>
              </div>

              {/* Exam Boards */}
              <div>
                <span className="font-['IBM_Plex_Mono'] text-[11px] uppercase tracking-wider text-on-surface-variant block mb-2">
                  Exam Boards
                </span>
                <div className="flex flex-wrap gap-2">
                  {director.boards.map((board) => (
                    <span
                      key={board}
                      className="font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1.5 rounded-lg border-2 border-[#c0392b] text-[#c0392b] bg-[#c0392b]/5"
                    >
                      {board}
                    </span>
                  ))}
                </div>
              </div>

              {/* Highlights */}
              <ul className="flex flex-col gap-2.5">
                {director.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="text-[#c0392b] font-bold text-sm leading-none mt-1">
                      ✓
                    </span>
                    <span className="font-['Work_Sans'] text-sm text-on-background">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/booking"
                className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5 inline-flex items-center gap-2.5 w-max mt-2"
              >
                Book a Session with Khawar
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Faculty Grid */}
      <section className="py-16 md:py-24 px-6 max-w-container-max mx-auto border-t-2 border-line">
        <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-3">
          <span className="w-5 h-0.5 bg-[#c0392b]"></span> Subject Specialists
        </span>
        <h2 className="font-['Archivo_Black'] text-2xl md:text-3xl text-on-background mb-3">
          Our teaching team.
        </h2>
        <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-10 max-w-xl">
          Each teacher has been personally vetted through a diagnostic session
          with our Academic Director and trained on Alinea&apos;s mark-scheme-first
          methodology.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teachers.map((teacher, idx) => (
            <div
              key={idx}
              className="bg-white/80 rounded-2xl border-2 border-line hover:border-on-background/40 hover:shadow-[6px_6px_0_0_var(--color-on-background)] transition-all duration-200 overflow-hidden group"
            >
              {/* Teacher Card Header — Image + Core Info */}
              <div className="flex gap-5 p-5 md:p-6">
                {/* Photo */}
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden border-2 border-line shrink-0 group-hover:border-on-background/40 transition-colors">
                  <img
                    src={teacher.image}
                    alt={teacher.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name + Role + Qualification */}
                <div className="flex flex-col justify-center min-w-0">
                  <h3 className="font-['Archivo_Black'] text-lg md:text-xl text-on-background truncate">
                    {teacher.name}
                  </h3>
                  <p className="font-['Work_Sans'] text-sm text-[#c0392b] font-bold">
                    {teacher.role}
                  </p>
                  {teacher.qualification && (
                    <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant mt-1 flex items-center gap-1.5">
                      <GraduationCap className="w-3.5 h-3.5" />
                      {teacher.qualification}
                    </span>
                  )}
                </div>
              </div>

              {/* Details */}
              <div className="px-5 md:px-6 pb-5 md:pb-6">
                {/* Bio */}
                <p className="font-['Work_Sans'] text-sm text-on-surface-variant leading-relaxed mb-4">
                  {teacher.bio}
                </p>

                {/* Info Grid */}
                <div className="bg-[#f5f2e9]/60 rounded-xl p-4 border border-line mb-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                        Subject
                      </span>
                      <span className="font-['Work_Sans'] font-bold text-xs text-on-background leading-tight block">
                        {teacher.subject}
                      </span>
                    </div>
                    <div>
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                        Levels
                      </span>
                      <span className="font-['Work_Sans'] font-bold text-xs text-on-background leading-tight block">
                        {teacher.levels}
                      </span>
                    </div>
                    <div>
                      <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant block mb-0.5">
                        Experience
                      </span>
                      <span className="font-['Work_Sans'] font-bold text-xs text-on-background leading-tight block">
                        {teacher.experience}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Exam Boards */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider text-on-surface-variant mr-1">
                    Boards:
                  </span>
                  {teacher.boards.map((board) => (
                    <span
                      key={board}
                      className="font-['IBM_Plex_Mono'] text-[11px] font-bold px-2.5 py-1 rounded-lg border border-on-background bg-primary-container text-on-background"
                    >
                      {board}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Our Teaching Standards Section */}
      <section className="py-16 md:py-20 px-6 max-w-container-max mx-auto border-t-2 border-line">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left */}
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
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <strong className="text-on-background">
                    Application & CV Review
                  </strong>
                  <p className="text-on-surface-variant">
                    Minimum 2+ years teaching experience and exam board
                    familiarity required.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <strong className="text-on-background">
                    Diagnostic Teaching Session
                  </strong>
                  <p className="text-on-surface-variant">
                    A live 30-minute mock lesson evaluated by our Academic
                    Director.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <strong className="text-on-background">
                    Mark-Scheme Methodology Training
                  </strong>
                  <p className="text-on-surface-variant">
                    Every teacher is trained on Alinea&apos;s examiner-report-driven
                    teaching approach.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <strong className="text-on-background">
                    Ongoing Performance Review
                  </strong>
                  <p className="text-on-surface-variant">
                    Regular lesson audits and student feedback reviews ensure
                    consistent quality.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Key Differentiators */}
          <div className="flex flex-col gap-5">
            <div className="bg-on-background text-white rounded-2xl border-2 border-on-background p-6 md:p-8">
              <h3 className="font-['Archivo_Black'] text-lg text-primary-container mb-4 flex items-center gap-2.5">
                <Award className="w-5 h-5" />
                What Sets Our Faculty Apart
              </h3>
              <div className="flex flex-col gap-4 font-['Work_Sans'] text-sm">
                <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      Board-Specific Expertise
                    </strong>
                    <p className="text-surface-variant">
                      Each teacher specialises in specific exam boards — not
                      generic &ldquo;A-Level&rdquo; teaching.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      Mark Scheme First
                    </strong>
                    <p className="text-surface-variant">
                      Lesson plans are reverse-engineered from examiner reports
                      and marking criteria.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 border-b border-white/10 pb-4">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      Academic Accountability
                    </strong>
                    <p className="text-surface-variant">
                      The Academic Director personally oversees every teacher and
                      every student&apos;s progress.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-primary-container font-bold text-base">
                    ✓
                  </span>
                  <div>
                    <strong className="text-white">
                      No Freelancers
                    </strong>
                    <p className="text-surface-variant">
                      Our teachers are permanent team members, not gig-platform
                      contractors.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary-container rounded-2xl border-2 border-on-background p-6 md:p-8 shadow-[6px_6px_0_0_var(--color-on-background)]">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-on-background" />
                <h3 className="font-['Archivo_Black'] text-lg text-on-background">
                  Want to join the team?
                </h3>
              </div>
              <p className="font-['Work_Sans'] text-sm text-on-primary-container leading-relaxed mb-4">
                We&apos;re always looking for exceptional, exam-board-literate
                teachers. If you know the mark scheme inside out, we want to
                hear from you.
              </p>
              <Link
                href="/careers"
                className="inline-flex items-center gap-2 font-['Work_Sans'] font-bold text-sm text-on-background border-b-2 border-on-background pb-0.5 hover:text-[#c0392b] hover:border-[#c0392b] transition-colors"
              >
                View open positions →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-20 px-6 max-w-container-max mx-auto">
        <div className="text-center bg-[#f5f2e9] p-10 md:p-14 rounded-2xl border-2 border-line">
          <h2 className="font-['Archivo_Black'] text-2xl md:text-4xl text-on-background mb-4">
            Ready to Learn from the Best?
          </h2>
          <p className="font-['Work_Sans'] text-base text-on-surface-variant max-w-xl mx-auto mb-6">
            Book a diagnostic session with our Academic Director to assess your
            current level and match you with the right specialist teacher.
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