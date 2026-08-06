import { Check } from "lucide-react";

export default function Stats() {
  return (
    <section className="py-16 md:py-24 px-6 max-w-container-max mx-auto border-b-2 border-line relative grain-bg">
      <div className="text-center mb-16 max-w-137.5 mx-auto relative z-10">
        <h2 className="font-serif text-4xl md:text-5xl text-on-background mb-4 tracking-tight font-normal">
          Numbers that matter
        </h2>
        <p className="font-serif text-sm md:text-base text-on-surface-variant leading-relaxed">
          We don&apos;t measure success by volume. We measure it by grade improvement and student confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 relative z-10">
        <div className="bg-white rounded-5 p-6 md:p-8 border-1.5 border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-serif text-4xl md:text-5xl text-on-background mb-2 marker-highlight font-normal">
            6
          </span>
          <span className="font-serif font-bold text-xs md:text-sm text-on-background uppercase tracking-wider">
            YEARS EXCELLENCE
          </span>
        </div>

        <div className="bg-white rounded-5 p-6 md:p-8 border-1.5 border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-serif text-4xl md:text-5xl text-on-background mb-2 marker-highlight font-normal">
            200+
          </span>
          <span className="font-serif font-bold text-xs md:text-sm text-on-background uppercase tracking-wider">
            ALUMNI
          </span>
        </div>

        <div className="bg-white rounded-5 p-6 md:p-8 border-1.5 border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-serif text-4xl md:text-5xl text-on-background mb-2 marker-highlight font-normal">
            5
          </span>
          <span className="font-serif font-bold text-xs md:text-sm text-on-background uppercase tracking-wider">
            COUNTRIES
          </span>
        </div>

        <div className="bg-white rounded-5 p-6 md:p-8 border-1.5 border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-serif text-4xl md:text-5xl text-on-background mb-2 marker-highlight font-normal">
            2
          </span>
          <span className="font-serif font-bold text-xs md:text-sm text-on-background uppercase tracking-wider">
            EXAM BOARDS
          </span>
        </div>
      </div>

      {/* Verification Tags matching target image */}
      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        <div className="px-5 py-2.5 rounded-full border-2 border-on-background bg-white flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-on-background flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-primary-container stroke-3" />
          </div>
          <span className="font-serif font-bold text-sm text-on-background">
            Cambridge Assessment International Education
          </span>
        </div>
        <div className="px-5 py-2.5 rounded-full border-2 border-on-background bg-white flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-on-background flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-primary-container stroke-3" />
          </div>
          <span className="font-serif font-bold text-sm text-on-background">
            Pearson Edexcel
          </span>
        </div>
      </div>
    </section>
  );
}
