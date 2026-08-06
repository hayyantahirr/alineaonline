import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function DirectorStory() {
  return (
    <section id="teachers" className="py-16 md:py-24 px-6 max-w-[1180px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="aspect-[4/5] rounded-[20px] overflow-hidden border-2 border-[#191c1d] shadow-[12px_12px_0_0_#191c1d] relative">
            <img
              src="/stitch/founder.jpg"
              className="w-full h-full object-cover"
              alt="Khawar, Academic Director"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#191c1d]/60 to-transparent"></div>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-[#4d4632] flex items-center gap-2">
            <span className="w-5 h-[2px] bg-[#ffd400]"></span> Academic Director
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-[#191c1d] leading-tight">
            Every lesson answers to one standard — <span className="marker-highlight">mine.</span>
          </h2>
          <p className="font-['Work_Sans'] text-base md:text-lg text-[#4d4632] leading-relaxed">
            Khawar founded Alinea to close the gap between how subjects are taught and how they're actually graded. Alinea stays deliberately small so every student gets his direct academic attention.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start border-t border-[#e7e8ea] pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-[#191c1d]">
                <strong>6 years</strong> teaching Edexcel &amp; AQA, starting in Economics
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-[#e7e8ea] pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-[#191c1d]">
                Lesson content built directly from <strong>examiner reports</strong>
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-[#e7e8ea] pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-[#191c1d]">
                <strong>Direct academic oversight</strong> of every teacher and every lesson
              </span>
            </li>
          </ul>
          <Link
            href="/subjects"
            className="font-['Work_Sans'] font-bold text-[#191c1d] border-b-2 border-[#ffd400] w-max pb-1 mt-2 hover:text-[#715d00] transition-colors text-sm"
          >
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
