import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function DirectorStory() {
  return (
    <section id="teachers" className="py-16 md:py-24 px-6 max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-5">
          <div className="aspect-4/5 rounded-5 overflow-hidden border-2 border-on-background shadow-[12px_12px_0_0_var(--color-on-background)] relative">
            <img
              src="/stitch/founder.jpg"
              className="w-full h-full object-cover"
              alt="Khawar, Academic Director"
            />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/60 to-transparent"></div>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2">
            <span className="w-5 h-0.5 bg-[#c0392b]"></span> Academic Director
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background leading-tight">
            Every lesson answers to one standard —{" "}
            <span className="relative inline-block text-on-background">
              mine.
              <svg
                className="absolute -bottom-1 left-0 w-full h-2 text-[#c0392b]"
                viewBox="0 0 100 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 8 C 20 2, 80 10, 98 4"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed">
            Khawar founded Alinea to close the gap between how subjects are taught and how they&apos;re actually graded. Alinea stays deliberately small so every student gets his direct academic attention.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#c0392b] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-on-background">
                <strong>6 years</strong> teaching Edexcel &amp; AQA, starting in Economics
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#c0392b] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-on-background">
                Lesson content built directly from <strong>examiner reports</strong>
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <CheckCircle2 className="w-5 h-5 text-[#c0392b] shrink-0 mt-0.5" />
              <span className="font-['Work_Sans'] text-sm text-on-background">
                <strong>Direct academic oversight</strong> of every teacher and every lesson
              </span>
            </li>
          </ul>
          <Link
            href="/subjects"
            className="font-['Work_Sans'] font-bold text-on-background border-b-2 border-on-background w-max pb-1 mt-2 hover:text-[#c0392b] transition-colors text-sm"
          >
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
