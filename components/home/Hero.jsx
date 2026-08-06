import Link from "next/link";
import GradedScript from "./GradedScript";

export default function Hero() {
  return (
    <section className="py-12 md:py-20 px-6 max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="inline-block px-4 py-1.5 bg-surface-container-low rounded-full border border-on-background font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wider w-max text-on-background">
            PREMIUM ONLINE ACADEMY
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl sm:text-5xl md:text-7xl font-black text-on-background leading-[1.08] tracking-tight">
            We don&apos;t teach the syllabus.<br />
            We teach the <span className="marker-highlight">mark scheme.</span>
          </h1>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant max-w-xl leading-relaxed">
            A small, highly focused online academy with stringent academic oversight. Specialising in IGCSE and A-Level preparations for students across the GCC and Asia.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/booking"
              className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-3.75 px-8 py-4 rounded-full border-2 border-on-background neo-brutalist-shadow transition-transform duration-200 text-center hover:-translate-y-0.5"
            >
              Book a Conversation
            </Link>
            <Link
              href="/subjects"
              className="bg-transparent text-on-background font-['Work_Sans'] font-extrabold text-3.75 px-8 py-4 rounded-full border-2 border-on-background hover:bg-surface-container transition-colors duration-200 text-center"
            >
              View Subjects
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <GradedScript />
        </div>
      </div>
    </section>
  );
}

