import Link from "next/link";

export default function DirectorStory() {
  return (
    <section id="teachers" className="py-section-v-mobile md:py-section-v-desktop px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gap-lg items-center">
        <div className="md:col-span-5">
          <div className="aspect-4/5 rounded-[20px] overflow-hidden border-2 border-on-background shadow-[12px_12px_0_0_#191c1d] relative">
            <img
              src="https://picsum.photos/seed/alinea-founder/480/600"
              className="w-full h-full object-cover"
              alt="Khawar, Academic Director"
            />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/60 to-transparent"></div>
          </div>
        </div>
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="text-eyebrow font-eyebrow uppercase tracking-wide text-on-surface-variant flex items-center gap-2 font-bold text-xs">
            <span className="w-5 h-0.5 bg-primary-container"></span> Academic Director
          </span>
          <h2 className="font-display-h2 text-display-h2 text-on-background text-3xl md:text-4xl">
            Every lesson answers to one standard — <span className="marker-highlight">mine.</span>
          </h2>
          <p className="font-lead text-lead text-on-surface-variant text-base md:text-lg leading-relaxed">
            Khawar founded Alinea to close the gap between how subjects are taught and how they're actually graded. Alinea stays deliberately small so every student gets his direct academic attention.
          </p>
          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <span className="text-body text-sm">
                <strong>6 years</strong> teaching Edexcel &amp; AQA, starting in Economics
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <span className="text-body text-sm">
                Lesson content built directly from <strong>examiner reports</strong>
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-line pt-4">
              <span className="material-symbols-outlined text-success">check_circle</span>
              <span className="text-body text-sm">
                <strong>Direct academic oversight</strong> of every teacher and every lesson
              </span>
            </li>
          </ul>
          <Link
            href="/subjects"
            className="font-bold text-on-background border-b-2 border-primary-container w-max pb-1 mt-4 hover:text-primary transition-colors text-sm"
          >
            Read the full story →
          </Link>
        </div>
      </div>
    </section>
  );
}
