import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-section-v-mobile md:py-section-v-desktop px-gutter max-w-container-max mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gap-lg items-center">
        <div className="md:col-span-7 flex flex-col gap-6">
          <span className="inline-block px-3 py-1 bg-surface-container rounded-full border border-on-background text-eyebrow font-eyebrow uppercase w-max tracking-wide">
            Premium Online Academy
          </span>
          <h1 className="font-display-h1-mobile md:font-display-h1 text-display-h1-mobile md:text-display-h1 text-on-background max-w-2xl leading-tight">
            We don't teach the syllabus.<br />
            We teach the <span className="marker-highlight">mark scheme.</span>
          </h1>
          <p className="font-lead text-lead text-on-surface-variant max-w-xl">
            A small, highly focused online academy with stringent academic oversight. Specialising in IGCSE and A-Level preparations for students across the GCC and Asia.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/booking"
              className="bg-primary-container text-on-primary-container font-button-lg text-button-lg px-8 py-4 rounded-full border-[1.5px] border-on-background neo-brutalist-shadow transition-transform duration-200 text-center hover:-translate-y-0.5"
            >
              Book a Conversation
            </Link>
            <Link
              href="/subjects"
              className="bg-transparent text-on-background font-button-lg text-button-lg px-8 py-4 rounded-full border-2 border-on-background hover:bg-surface-container transition-colors duration-200 text-center"
            >
              View Subjects
            </Link>
          </div>
        </div>

        <div className="md:col-span-5 relative">
          <div className="aspect-9/16 md:aspect-auto md:h-150 w-full max-w-90 mx-auto rounded-[20px] overflow-hidden border-2 border-on-background shadow-[12px_12px_0_0_#191c1d] relative group">
            <img
              className="w-full h-full object-cover"
              alt="A vertical video thumbnail showing Khawar, Academic Director in a modern studio"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7BffQ_52oAJxly4gjrh__AR1Kq9h2R-1qRrVcbEEquJnySc_CLvw_TW0p6L--dk3B1wQDVw9avBiceESlcWhKrNwPWRKbdXazyps6oqmDvzl-p226mPx6CipIk2cixmjux6k5nxYh69xnFwdER1QaOyqBuOV7HaOtT1OTtL_0Pirt1PxRwbbwGs38cXt7vRckSJWl8gO1c4TvXwEc7KzVwkdWPkd9uXaOnyunel3pSgjPq0E90pML7g"
            />
            <div className="absolute inset-0 bg-on-background/20 group-hover:bg-on-background/10 transition-colors duration-300 flex items-center justify-center">
              <button className="w-16 h-16 rounded-full bg-paper/80 backdrop-blur-xs flex items-center justify-center border-[1.5px] border-on-background neo-brutalist-shadow transform group-hover:scale-110 transition-transform duration-300">
                <span className="material-symbols-outlined text-3xl text-on-background">
                  play_arrow
                </span>
              </button>
            </div>
            <div className="absolute bottom-4 left-4 right-4 bg-paper/90 backdrop-blur-sm rounded-lg p-3 border border-on-background shadow-sm flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-primary-container border border-on-background flex items-center justify-center font-technical-mono text-technical-mono text-xs font-bold">
                2m
              </span>
              <div className="flex-1">
                <p className="font-nav-link text-nav-link text-on-background font-bold text-sm">Meet the Founder</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">Khawar's approach to exams</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
