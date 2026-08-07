import { Check } from "lucide-react";

export default function Stats() {
  const statsData = [
    { number: "6", label: "Years Excellence", hasCircle: false },
    { number: "200+", label: "Alumni Worldwide", hasCircle: true },
    { number: "5", label: "Countries Served", hasCircle: false },
    { number: "2", label: "Exam Boards", hasCircle: false },
  ];

  return (
    <section className="py-20 md:py-28 px-6 max-w-container-max mx-auto border-b-2 border-line relative grain-bg">
      <div className="text-center mb-16 md:mb-20 max-w-xl mx-auto relative z-10">
        <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center justify-center gap-2 mb-3">
          <span className="w-5 h-0.5 bg-[#c0392b]"></span> Proven Impact
        </span>
        <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-on-background mb-4">
          Numbers that matter.
        </h2>
        <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed">
          We don&apos;t measure success by volume. We measure it by grade improvement and student confidence.
        </p>
      </div>

      {/* Stats row sitting directly on background with hairline vertical dividers */}
      <div className="grid grid-cols-2 md:grid-cols-4 relative z-10 mb-16 border-y border-line md:border-y-0">
        {statsData.map((stat, idx) => (
          <div
            key={idx}
            className={`flex flex-col items-center justify-center text-center px-4 md:px-6 py-8 md:py-12 relative ${
              idx < statsData.length - 1 ? "md:border-r border-line" : ""
            } ${idx % 2 === 0 ? "border-r md:border-r-0 border-line" : ""}`}
          >
            <div className="relative inline-flex items-center justify-center mb-3">
              <span className="font-['Archivo_Black'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-on-background leading-none tracking-tight">
                {stat.number}
              </span>

              {/* Hand-drawn red circle around key number (200+) */}
              {stat.hasCircle && (
                <svg
                  className="absolute -inset-x-6 -inset-y-4 w-[150%] h-[160%] pointer-events-none text-[#c0392b]"
                  viewBox="0 0 160 80"
                  fill="none"
                >
                  <ellipse
                    cx="80"
                    cy="40"
                    rx="72"
                    ry="32"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    transform="rotate(-4 80 40)"
                  />
                </svg>
              )}
            </div>

            <span className="font-['Work_Sans'] font-extrabold text-xs md:text-sm text-on-surface-variant uppercase tracking-widest mt-3">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      {/* Verification Tags */}
      <div className="flex flex-wrap justify-center gap-4 relative z-10 pt-4">
        <div className="px-5 py-2.5 rounded-full border-2 border-on-background bg-white flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-on-background flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-primary-container stroke-3" />
          </div>
          <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
            Cambridge Assessment International Education
          </span>
        </div>
        <div className="px-5 py-2.5 rounded-full border-2 border-on-background bg-white flex items-center gap-3 shadow-sm hover:-translate-y-0.5 transition-transform cursor-pointer">
          <div className="w-5 h-5 rounded-full bg-on-background flex items-center justify-center shrink-0">
            <Check className="w-3 h-3 text-primary-container stroke-3" />
          </div>
          <span className="font-['Work_Sans'] font-bold text-sm text-on-background">
            Pearson Edexcel
          </span>
        </div>
      </div>
    </section>
  );
}
