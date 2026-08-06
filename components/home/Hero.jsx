import Link from "next/link";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 px-6 max-w-[1180px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="inline-block px-4 py-1.5 bg-[#f3f4f5] rounded-full border border-[#191c1d] font-['Work_Sans'] font-extrabold text-[12px] uppercase tracking-wider w-max text-[#191c1d]">
            PREMIUM ONLINE ACADEMY
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-6xl text-[#191c1d] leading-[1.08] tracking-tight">
            We don't teach the syllabus.<br />
            We teach the <span className="marker-highlight">mark scheme.</span>
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-[#4d4632] max-w-xl leading-relaxed">
            A small, highly focused online academy with stringent academic oversight. Specialising in IGCSE and A-Level preparations for students across the GCC and Asia.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/booking"
              className="bg-[#ffd400] text-[#191c1d] font-['Work_Sans'] font-extrabold text-[15px] px-8 py-4 rounded-full border-[2px] border-[#191c1d] neo-brutalist-shadow transition-transform duration-200 text-center hover:-translate-y-0.5"
            >
              Book a Conversation
            </Link>
            <Link
              href="/subjects"
              className="bg-transparent text-[#191c1d] font-['Work_Sans'] font-extrabold text-[15px] px-8 py-4 rounded-full border-[2px] border-[#191c1d] hover:bg-[#edeeef] transition-colors duration-200 text-center"
            >
              View Subjects
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="aspect-[9/16] md:aspect-auto md:h-[600px] w-full max-w-[360px] mx-auto rounded-[20px] overflow-hidden border-2 border-[#191c1d] shadow-[12px_12px_0_0_#191c1d] relative group">
            <img
              className="w-full h-full object-cover"
              alt="Khawar, Academic Director video thumbnail"
              src="/stitch/hero-thumb.png"
            />
            <div className="absolute inset-0 bg-[#191c1d]/20 group-hover:bg-[#191c1d]/10 transition-colors duration-300 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center border-[2px] border-[#191c1d] neo-brutalist-shadow transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-[#191c1d] fill-[#191c1d] ml-1" />
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 border border-[#191c1d] shadow-sm flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#ffd400] border border-[#191c1d] flex items-center justify-center font-['IBM_Plex_Mono'] font-bold text-xs text-[#191c1d]">
                2m
              </span>
              <div className="flex-1">
                <p className="font-['Work_Sans'] font-bold text-sm text-[#191c1d]">Meet the Founder</p>
                <p className="font-['Work_Sans'] text-xs text-[#4d4632]">Khawar's approach to exams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
