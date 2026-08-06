import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-[#f8f9fa] text-[#191c1d]">
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-6 max-w-[1180px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 flex flex-col gap-6">
            <span className="inline-block px-3 py-1 bg-[#edeeef] rounded-full border border-[#191c1d] font-['IBM_Plex_Mono'] text-xs font-semibold uppercase tracking-wider w-max text-[#4d4632]">
              ⚡ Premium Online Academy
            </span>
            <h1 className="font-['Archivo_Black'] text-4xl md:text-6xl text-[#191c1d] leading-[1.08] tracking-tight">
              We don't teach the syllabus.<br />
              We teach the <span className="marker-highlight">mark scheme.</span>
            </h1>
            <p className="font-['Work_Sans'] text-lg md:text-xl text-[#4d4632] max-w-xl leading-relaxed">
              A small, highly focused online academy with stringent academic oversight. Specialising in IGCSE and A-Level preparations for students across the GCC and Asia.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                href="/booking"
                className="bg-[#ffd400] text-[#705c00] font-['Work_Sans'] font-extrabold text-base md:text-lg px-8 py-4 rounded-full border-[1.5px] border-[#191c1d] neo-brutalist-shadow transition-transform duration-200 text-center hover:-translate-y-0.5"
              >
                Book a Conversation
              </Link>
              <Link
                href="/subjects"
                className="bg-transparent text-[#191c1d] font-['Work_Sans'] font-extrabold text-base md:text-lg px-8 py-4 rounded-full border-2 border-[#191c1d] hover:bg-[#edeeef] transition-colors duration-200 text-center"
              >
                Explore Subjects
              </Link>
            </div>
          </div>

          <div className="md:col-span-5 relative">
            <div className="w-full max-w-[360px] mx-auto rounded-[20px] overflow-hidden border-2 border-[#191c1d] shadow-[12px_12px_0_0_#191c1d] bg-[#ffffff] relative group">
              <div className="aspect-[4/5] bg-gradient-to-tr from-[#191c1d] to-[#4d5f7d] p-6 flex flex-col justify-between text-white relative">
                <div className="flex justify-between items-center z-10">
                  <span className="bg-[#ffd400] text-[#191c1d] font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border border-[#191c1d]">
                    EXAMINER INSIGHTS
                  </span>
                  <span className="material-symbols-outlined text-yellow-400">workspace_premium</span>
                </div>
                
                <div className="z-10 my-auto text-center py-6">
                  <div className="w-20 h-20 mx-auto rounded-full bg-[#ffd400] border-2 border-white flex items-center justify-center neo-brutalist-shadow mb-4 cursor-pointer group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-4xl text-[#191c1d]">play_arrow</span>
                  </div>
                  <h3 className="font-['Archivo_Black'] text-xl text-[#ffd400]">Director's Mark Scheme System</h3>
                  <p className="font-['Work_Sans'] text-sm text-[#e1e3e4] mt-1">Watch 2-min exam strategy breakdown</p>
                </div>

                <div className="bg-[#ffffff]/95 text-[#191c1d] rounded-xl p-3 border border-[#191c1d] flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-['IBM_Plex_Mono'] font-bold text-xs">
                    99%
                  </div>
                  <div>
                    <p className="font-['Work_Sans'] font-bold text-xs">A-Level & IGCSE Focus</p>
                    <p className="font-['Work_Sans'] text-[11px] text-[#4d4632]">Edexcel, CAIE, AQA & IB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip Marquee */}
      <div className="bg-[#191c1d] py-4 border-y-2 border-[#ffd400] overflow-hidden">
        <div className="w-full whitespace-nowrap overflow-hidden">
          <div className="animate-marquee flex gap-8 items-center font-['IBM_Plex_Mono'] text-sm text-[#ffe177] uppercase tracking-wider">
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Dubai</span>
            <span className="flex items-center gap-2"><span class="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Riyadh</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Doha</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Singapore</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Kuala Lumpur</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in London</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Dubai</span>
            <span className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-[#ffd400]"></span> Trusted in Riyadh</span>
          </div>
        </div>
      </div>

      {/* Proof & Stats Section */}
      <section className="py-16 md:py-24 px-6 max-w-[1180px] mx-auto">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-[#191c1d] mb-4">
            Numbers That Matter
          </h2>
          <p className="font-['Work_Sans'] text-lg text-[#4d4632]">
            We don't measure success by student volume. We measure it strictly by grade improvement and top-tier university offers.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="bg-[#ffffff] rounded-[20px] p-6 border-[1.5px] border-[#191c1d] bento-shadow text-center flex flex-col justify-center">
            <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">6+</span>
            <span className="font-['Work_Sans'] text-xs md:text-sm font-bold text-[#4d4632] uppercase tracking-wide">Years of Excellence</span>
          </div>
          <div className="bg-[#ffffff] rounded-[20px] p-6 border-[1.5px] border-[#191c1d] bento-shadow text-center flex flex-col justify-center">
            <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">94%</span>
            <span className="font-['Work_Sans'] text-xs md:text-sm font-bold text-[#4d4632] uppercase tracking-wide">A* & A Grades</span>
          </div>
          <div className="bg-[#ffffff] rounded-[20px] p-6 border-[1.5px] border-[#191c1d] bento-shadow text-center flex flex-col justify-center">
            <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">400+</span>
            <span className="font-['Work_Sans'] text-xs md:text-sm font-bold text-[#4d4632] uppercase tracking-wide">Students Mentored</span>
          </div>
          <div className="bg-[#ffffff] rounded-[20px] p-6 border-[1.5px] border-[#191c1d] bento-shadow text-center flex flex-col justify-center">
            <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">100%</span>
            <span className="font-['Work_Sans'] text-xs md:text-sm font-bold text-[#4d4632] uppercase tracking-wide">Examiner-Led</span>
          </div>
        </div>
      </section>

      {/* The Alinea Difference / Methodology */}
      <section className="py-16 bg-[#edeeef] border-y-2 border-[#191c1d]">
        <div className="max-w-[1180px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div>
              <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-[#715d00] uppercase tracking-wider">
                OUR METHODOLOGY
              </span>
              <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-[#191c1d] mt-2">
                Why Standard Tutoring Fails Top Students
              </h2>
            </div>
            <Link
              href="/subjects"
              className="font-['Work_Sans'] font-bold text-sm text-[#705c00] hover:underline flex items-center gap-1"
            >
              See Subject Syllabuses <span className="material-symbols-outlined text-base">arrow_forward</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#ffffff] p-8 rounded-[20px] border-2 border-[#191c1d] bento-shadow">
              <div className="w-12 h-12 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-['Archivo_Black'] text-xl mb-6">
                1
              </div>
              <h3 className="font-['Archivo_Black'] text-xl text-[#191c1d] mb-3">Mark Scheme Engineering</h3>
              <p className="font-['Work_Sans'] text-sm text-[#4d4632] leading-relaxed">
                Exam boards award marks for specific keyword clusters and structural triggers. We teach students how examiners grade papers so they write answers that leave zero marks behind.
              </p>
            </div>

            <div className="bg-[#ffffff] p-8 rounded-[20px] border-2 border-[#191c1d] bento-shadow">
              <div className="w-12 h-12 rounded-full bg-[#c6d8fc] border border-[#191c1d] flex items-center justify-center font-['Archivo_Black'] text-xl mb-6">
                2
              </div>
              <h3 className="font-['Archivo_Black'] text-xl text-[#191c1d] mb-3">Active Recall & Timed Drilling</h3>
              <p className="font-['Work_Sans'] text-sm text-[#4d4632] leading-relaxed">
                Passive reading creates false confidence. We use timed past paper drills and active recall frameworks to build instant retrieval speed under real exam pressure.
              </p>
            </div>

            <div className="bg-[#ffffff] p-8 rounded-[20px] border-2 border-[#191c1d] bento-shadow">
              <div className="w-12 h-12 rounded-full bg-[#ffe177] border border-[#191c1d] flex items-center justify-center font-['Archivo_Black'] text-xl mb-6">
                3
              </div>
              <h3 className="font-['Archivo_Black'] text-xl text-[#191c1d] mb-3">Direct Specialist Mentorship</h3>
              <p className="font-['Work_Sans'] text-sm text-[#4d4632] leading-relaxed">
                No generic undergraduate tutors. Every session is led by seasoned exam specialists who have guided hundreds of students to A* achievements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Subject Spotlight */}
      <section className="py-20 px-6 max-w-[1180px] mx-auto">
        <div className="bg-[#191c1d] text-white rounded-[24px] p-8 md:p-12 border-4 border-[#ffd400] shadow-[12px_12px_0_0_#ffd400]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 flex flex-col gap-4">
              <span className="bg-[#ffd400] text-[#191c1d] font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full w-max">
                FLAGSHIP PROGRAMME
              </span>
              <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-[#ffd400]">
                A-Level & IGCSE Economics Mastery
              </h2>
              <p className="font-['Work_Sans'] text-base md:text-lg text-[#e1e3e4] leading-relaxed">
                Our signature Economics syllabus coverage includes micro & macro model diagrams, evaluation paragraph blueprints, and 25-mark essay masterclasses.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <Link
                  href="/subjects"
                  className="bg-[#ffd400] text-[#705c00] font-['Work_Sans'] font-extrabold text-base px-6 py-3 rounded-full border border-white neo-brutalist-shadow"
                >
                  View Full Economics Syllabus
                </Link>
                <Link
                  href="/booking"
                  className="bg-[#2e3132] text-white font-['Work_Sans'] font-bold text-base px-6 py-3 rounded-full border border-[#7f775f] hover:bg-[#3a3f45]"
                >
                  Book Economics Tutor
                </Link>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#2e3132] p-6 rounded-xl border border-[#7f775f] flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-3xl text-[#ffd400]">military_tech</span>
                <div>
                  <h4 className="font-['Archivo_Black'] text-lg text-white">98% Pass Rate</h4>
                  <p className="font-['Work_Sans'] text-xs text-[#a4a7ab]">Edexcel & CAIE Specs</p>
                </div>
              </div>
              <ul className="space-y-2 text-xs font-['IBM_Plex_Mono'] text-[#ffe177]">
                <li className="flex items-center gap-2">✓ Essay evaluation triggers</li>
                <li className="flex items-center gap-2">✓ Diagram precision drills</li>
                <li className="flex items-center gap-2">✓ Data response speed hacks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call To Action Card */}
      <section className="py-16 px-6 max-w-[1180px] mx-auto text-center">
        <div className="bg-[#ffd400] text-[#191c1d] rounded-[24px] p-10 md:p-16 border-2 border-[#191c1d] neo-brutalist-shadow">
          <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl mb-4">
            Ready to Secure Your Target Grades?
          </h2>
          <p className="font-['Work_Sans'] text-lg text-[#705c00] max-w-2xl mx-auto mb-8">
            Spaces are intentionally capped to ensure quality oversight. Book your initial 1-on-1 consultation today.
          </p>
          <Link
            href="/booking"
            className="inline-block bg-[#191c1d] text-[#ffffff] font-['Work_Sans'] font-extrabold text-lg px-10 py-5 rounded-full border-2 border-white hover:bg-[#2e3132] transition-colors shadow-lg"
          >
            Schedule Assessment Session
          </Link>
        </div>
      </section>
    </div>
  );
}
