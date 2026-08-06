import { CheckCircle2 } from "lucide-react";

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-[1180px] mx-auto border-b-2 border-[#e7e8ea] relative grain-bg">
      <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
        <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-[#191c1d] mb-4">
          Numbers that matter
        </h2>
        <p className="font-['Work_Sans'] text-base md:text-lg text-[#4d4632]">
          We don't measure success by volume. We measure it by grade improvement and student confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 relative z-10">
        <div className="bg-white rounded-[20px] p-6 md:p-8 border-[1.5px] border-[#e7e8ea] flex flex-col items-center text-center bento-shadow">
          <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">
            6
          </span>
          <span className="font-['Work_Sans'] font-bold text-xs md:text-sm text-[#4d4632] uppercase tracking-wide">
            Years Excellence
          </span>
        </div>

        <div className="bg-white rounded-[20px] p-6 md:p-8 border-[1.5px] border-[#e7e8ea] flex flex-col items-center text-center bento-shadow">
          <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">
            200+
          </span>
          <span className="font-['Work_Sans'] font-bold text-xs md:text-sm text-[#4d4632] uppercase tracking-wide">
            Alumni
          </span>
        </div>

        <div className="bg-white rounded-[20px] p-6 md:p-8 border-[1.5px] border-[#e7e8ea] flex flex-col items-center text-center bento-shadow">
          <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">
            5
          </span>
          <span className="font-['Work_Sans'] font-bold text-xs md:text-sm text-[#4d4632] uppercase tracking-wide">
            Countries
          </span>
        </div>

        <div className="bg-white rounded-[20px] p-6 md:p-8 border-[1.5px] border-[#e7e8ea] flex flex-col items-center text-center bento-shadow">
          <span className="font-['Archivo_Black'] text-4xl md:text-5xl text-[#191c1d] mb-2 marker-highlight">
            2
          </span>
          <span className="font-['Work_Sans'] font-bold text-xs md:text-sm text-[#4d4632] uppercase tracking-wide">
            Exam Boards
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        <div className="px-6 py-3 rounded-full border-[1.5px] border-[#191c1d] bg-white flex items-center gap-2.5 neo-brutalist-shadow">
          <CheckCircle2 className="w-5 h-5 text-[#ffd400] fill-[#191c1d]" />
          <span className="font-['Work_Sans'] font-semibold text-sm text-[#191c1d]">
            Cambridge Assessment International Education
          </span>
        </div>
        <div className="px-6 py-3 rounded-full border-[1.5px] border-[#191c1d] bg-white flex items-center gap-2.5 neo-brutalist-shadow">
          <CheckCircle2 className="w-5 h-5 text-[#ffd400] fill-[#191c1d]" />
          <span className="font-['Work_Sans'] font-semibold text-sm text-[#191c1d]">
            Pearson Edexcel
          </span>
        </div>
      </div>
    </section>
  );
}
