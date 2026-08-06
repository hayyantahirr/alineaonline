export default function Stats() {
  return (
    <section className="py-section-v-desktop px-gutter max-w-container-max mx-auto border-b-2 border-line relative grain-bg">
      <div className="text-center mb-16 max-w-2xl mx-auto relative z-10">
        <h2 className="font-display-h2 text-display-h2 text-on-background mb-4 text-3xl md:text-5xl">
          Numbers that matter
        </h2>
        <p className="font-lead text-lead text-on-surface-variant text-lg">
          We don't measure success by volume. We measure it by grade improvement and student confidence.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-grid-gap-sm md:gap-grid-gap-md mb-16 relative z-10">
        <div className="bg-paper rounded-[20px] p-6 md:p-8 border-[1.5px] border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-display-h2 text-display-h2 text-on-background mb-2 marker-highlight text-4xl md:text-5xl">
            6
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide font-bold text-xs md:text-sm">
            Years Excellence
          </span>
        </div>

        <div className="bg-paper rounded-[20px] p-6 md:p-8 border-[1.5px] border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-display-h2 text-display-h2 text-on-background mb-2 marker-highlight text-4xl md:text-5xl">
            200+
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide font-bold text-xs md:text-sm">
            Alumni
          </span>
        </div>

        <div className="bg-paper rounded-[20px] p-6 md:p-8 border-[1.5px] border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-display-h2 text-display-h2 text-on-background mb-2 marker-highlight text-4xl md:text-5xl">
            5
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide font-bold text-xs md:text-sm">
            Countries
          </span>
        </div>

        <div className="bg-paper rounded-[20px] p-6 md:p-8 border-[1.5px] border-line flex flex-col items-center text-center bento-shadow">
          <span className="font-display-h2 text-display-h2 text-on-background mb-2 marker-highlight text-4xl md:text-5xl">
            2
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant uppercase tracking-wide font-bold text-xs md:text-sm">
            Exam Boards
          </span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-4 relative z-10">
        <div className="px-6 py-3 rounded-full border-[1.5px] border-on-background bg-surface flex items-center gap-2 neo-brutalist-shadow">
          <span className="material-symbols-outlined text-primary-container text-xl">
            verified
          </span>
          <span className="font-nav-link text-nav-link text-on-background font-semibold text-sm">
            Cambridge Assessment International Education
          </span>
        </div>
        <div className="px-6 py-3 rounded-full border-[1.5px] border-on-background bg-surface flex items-center gap-2 neo-brutalist-shadow">
          <span className="material-symbols-outlined text-primary-container text-xl">
            verified
          </span>
          <span className="font-nav-link text-nav-link text-on-background font-semibold text-sm">
            Pearson Edexcel
          </span>
        </div>
      </div>
    </section>
  );
}
