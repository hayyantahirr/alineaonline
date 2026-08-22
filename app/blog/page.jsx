import Link from "next/link";
import {
  FileText,
  Download,
  Sparkles,
  BookOpen,
  ArrowRight,
  ArrowDown,
  Clock,
  User,
  GraduationCap,
  Layers,
  CheckCircle2,
  Bookmark,
  Award,
} from "lucide-react";
import { blogArticles, freeResources } from "@/data/blogData";

export const metadata = {
  title: "Examiner Blog & Free Study Resources | Alinea Online",
  description:
    "Explore high-yield examiner insights, 25-mark essay blueprints, and free downloadable revision vaults for CAIE, Edexcel, and AQA students.",
};

export default function BlogPage() {
  const featuredArticle = blogArticles.find((a) => a.featured) || blogArticles[0];
  const regularArticles = blogArticles.filter((a) => a.id !== featuredArticle.id);

  return (
    <div className="w-full bg-[#faf8f2] text-on-background min-h-screen grain-bg">
      {/* Hero Header */}
      <section className="py-14 md:py-20 px-6 border-b-2 border-line bg-[#f5f2e9]/80 relative overflow-hidden">
        <div className="max-w-container-max mx-auto">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wider text-on-surface-variant flex items-center gap-2 mb-3">
              <span className="w-5 h-0.5 bg-[#c0392b]"></span>
              Examiner Insights &amp; Study Vault
            </span>

            <h1 className="font-['Archivo_Black'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-on-background leading-[1.1] mb-5 tracking-tight">
              Academic Blog &amp;{" "}
              <span className="relative inline-block text-on-background">
                Free Resources
                <svg
                  className="absolute -bottom-1 left-0 w-full h-3 text-[#c0392b]"
                  viewBox="0 0 100 12"
                  fill="none"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8 C 30 2, 70 10, 98 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="font-['Work_Sans'] text-base md:text-lg text-on-surface-variant leading-relaxed mb-8">
              Explore mark-scheme breakdowns, essay evaluation blueprints, and
              curated revision vaults reverse-engineered by senior examiners.
            </p>

            {/* Quick Section Jump Navigation */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              <a
                href="#articles"
                className="bg-on-background text-white font-['Work_Sans'] font-bold text-xs sm:text-sm px-6 py-3.5 rounded-full border-2 border-on-background shadow-[3px_3px_0_0_rgba(192,57,43,0.9)] hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-primary-container" />
                <span>Examiner Blog Articles</span>
                <ArrowDown className="w-3.5 h-3.5 text-white/70" />
              </a>

              <a
                href="#resources"
                className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs sm:text-sm px-6 py-3.5 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#c0392b]" />
                <span>Free Revision Resources</span>
                <ArrowDown className="w-3.5 h-3.5 text-on-background/70" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: BLOG ARTICLES */}
      <section
        id="articles"
        className="py-16 md:py-24 px-6 max-w-container-max mx-auto scroll-mt-10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b-2 border-line pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs">
                1
              </span>
              <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant">
                Examiner Guides &amp; Technique
              </span>
            </div>
            <h2 className="font-['Archivo_Black'] text-2xl sm:text-3xl md:text-4xl text-on-background">
              Featured Articles &amp; Insights
            </h2>
          </div>
          <p className="font-['Work_Sans'] text-xs md:text-sm text-on-surface-variant max-w-md">
            In-depth guides on syllabus command words, evaluation frameworks, and
            common grade-costing mistakes.
          </p>
        </div>

        {/* Featured Article Card */}
        {featuredArticle && (
          <div className="bg-primary-container text-on-background rounded-3xl p-7 md:p-12 border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] mb-14 transition-all">
            <div className="flex flex-wrap items-center gap-2.5 mb-5">
              <span className="inline-flex items-center gap-1.5 bg-on-background text-white font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-primary-container" />
                Featured Guide
              </span>
              <span className="bg-white/80 border border-line font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full text-on-background">
                {featuredArticle.category}
              </span>
              <span className="font-['IBM_Plex_Mono'] text-xs text-on-background/70 font-semibold">
                {featuredArticle.boards}
              </span>
            </div>

            <h3 className="font-['Archivo_Black'] text-2xl sm:text-3xl md:text-4xl text-on-background mb-4 leading-tight">
              {featuredArticle.title}
            </h3>

            <p className="font-['Work_Sans'] text-sm sm:text-base md:text-lg text-on-background/80 max-w-4xl leading-relaxed mb-6">
              {featuredArticle.excerpt}
            </p>

            {/* Highlights bullets */}
            {featuredArticle.highlights && (
              <div className="bg-white/70 rounded-2xl p-5 md:p-6 border border-on-background/20 mb-8">
                <p className="font-['IBM_Plex_Mono'] text-xs uppercase tracking-wider font-bold text-on-background mb-3 flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 text-[#c0392b]" />
                  What You&apos;ll Learn in This Guide:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {featuredArticle.highlights.map((h, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 font-['Work_Sans'] text-xs text-on-background"
                    >
                      <span className="text-[#c0392b] font-bold mt-0.5 shrink-0">
                        ✓
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-on-background/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-on-background text-white flex items-center justify-center font-bold text-sm font-['IBM_Plex_Mono']">
                  {featuredArticle.author.charAt(0)}
                </div>
                <div>
                  <span className="font-['Work_Sans'] font-bold text-sm text-on-background block">
                    {featuredArticle.author}
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                    {featuredArticle.authorRole} • {featuredArticle.readTime}
                  </span>
                </div>
              </div>

              <Link
                href={`/booking?subject=Economics`}
                className="bg-on-background text-white font-['Work_Sans'] font-extrabold text-xs sm:text-sm px-7 py-3.5 rounded-full border border-on-background hover:bg-[#c0392b] hover:border-[#c0392b] transition-colors inline-flex items-center gap-2"
              >
                <span>Book 1:1 Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Regular Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {regularArticles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl p-6 sm:p-7 border-2 border-line hover:border-on-background hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-on-background)] transition-transform duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Meta Header */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="font-['IBM_Plex_Mono'] text-[11px] font-bold text-[#c0392b] bg-[#c0392b]/10 px-2.5 py-0.5 rounded-md uppercase">
                    {article.category}
                  </span>
                  <span className="font-['IBM_Plex_Mono'] text-[11px] text-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime}
                  </span>
                </div>

                <span className="font-['IBM_Plex_Mono'] text-[10px] text-muted block mb-2 font-medium">
                  Boards: {article.boards}
                </span>

                <h3 className="font-['Archivo_Black'] text-lg text-on-background mb-3 leading-snug">
                  {article.title}
                </h3>

                <p className="font-['Work_Sans'] text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-4">
                  {article.excerpt}
                </p>

                {/* Key Takeaways */}
                {article.highlights && (
                  <div className="bg-[#f5f2e9]/70 rounded-xl p-3.5 border border-line mb-5">
                    <ul className="flex flex-col gap-1.5">
                      {article.highlights.map((h, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-['Work_Sans'] text-[11px] text-on-background"
                        >
                          <span className="text-[#c0392b] font-bold shrink-0">
                            ✓
                          </span>
                          <span className="line-clamp-1">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Author & Footer Link */}
              <div className="pt-4 border-t border-line/60 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-muted" />
                  <span className="font-['Work_Sans'] text-xs font-bold text-on-background truncate max-w-[120px]">
                    {article.author}
                  </span>
                </div>

                <Link
                  href="/booking"
                  className="font-['Work_Sans'] font-extrabold text-xs text-[#c0392b] hover:text-on-background inline-flex items-center gap-1 transition-colors"
                >
                  <span>Book Consultation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: FREE REVISION RESOURCES */}
      <section
        id="resources"
        className="py-16 md:py-24 px-6 border-t-2 border-line bg-[#f5f2e9]/60 scroll-mt-10"
      >
        <div className="max-w-container-max mx-auto">
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b-2 border-line pb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-[#c0392b] text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant">
                  Downloadable Study Vault
                </span>
              </div>
              <h2 className="font-['Archivo_Black'] text-2xl sm:text-3xl md:text-4xl text-on-background">
                Free Revision Packs &amp; Cheat Sheets
              </h2>
            </div>
            <p className="font-['Work_Sans'] text-xs md:text-sm text-on-surface-variant max-w-md">
              High-yield diagram masterpacks, formula vaults, and examiner mark
              scheme cheat sheets prepared for self-study and revision.
            </p>
          </div>

          {/* Resources Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {freeResources.map((resource) => (
              <div
                key={resource.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-line neo-brutalist-shadow flex flex-col justify-between group hover:border-on-background transition-colors"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold px-2.5 py-1 rounded-full bg-primary-container text-on-background border border-on-background/20 uppercase tracking-wider">
                      {resource.badge}
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-[11px] text-muted font-medium">
                      {resource.fileSize}
                    </span>
                  </div>

                  {/* Subject & Boards */}
                  <div className="flex items-center gap-2 mb-2 font-['IBM_Plex_Mono'] text-xs text-on-surface-variant">
                    <span className="font-bold text-[#c0392b]">
                      {resource.subject}
                    </span>
                    <span>•</span>
                    <span className="truncate">{resource.boards}</span>
                  </div>

                  {/* Title */}
                  <h3 className="font-['Archivo_Black'] text-lg sm:text-xl text-on-background mb-3 leading-snug">
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p className="font-['Work_Sans'] text-xs sm:text-sm text-on-surface-variant leading-relaxed mb-5">
                    {resource.desc}
                  </p>

                  {/* Included Topics Box */}
                  <div className="bg-[#fbf9f4] rounded-2xl p-4 border border-line mb-6">
                    <p className="font-['IBM_Plex_Mono'] text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-2.5 flex items-center gap-1.5">
                      <Layers className="w-3 h-3 text-[#c0392b]" />
                      Included in this pack:
                    </p>
                    <ul className="flex flex-col gap-2">
                      {resource.includedTopics.map((topic, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 font-['Work_Sans'] text-xs text-on-background"
                        >
                          <span className="text-[#c0392b] font-bold shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="leading-tight">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Resource Card Footer */}
                <div className="pt-4 border-t border-line/60 flex flex-col gap-3">
                  <div className="flex items-center justify-between text-[11px] font-['IBM_Plex_Mono'] text-muted">
                    <span>{resource.format}</span>
                    <span className="text-emerald-700 font-semibold">
                      {resource.downloadsCount}
                    </span>
                  </div>

                  <Link
                    href={`/pricing`}
                    className="w-full bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs sm:text-sm py-3.5 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2 text-center"
                  >
                    <Download className="w-4 h-4 text-on-background" />
                    <span>Get Access via Diagnostic Pack</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Special Resources Banner */}
          <div className="mt-14 bg-on-background text-white rounded-3xl border-2 border-on-background p-8 md:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 flex flex-col gap-3">
                <span className="font-['IBM_Plex_Mono'] text-xs font-bold text-primary-container uppercase tracking-wider flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  All-Inclusive Syllabus Repositories
                </span>
                <h3 className="font-['Archivo_Black'] text-2xl sm:text-3xl md:text-4xl text-white leading-tight">
                  Need Personalized Past Paper Marking &amp; Feedback?
                </h3>
                <p className="font-['Work_Sans'] text-sm sm:text-base text-surface-variant max-w-2xl leading-relaxed">
                  Our examiner tutors provide line-by-line mark scheme audits on
                  your mock essays, calculations, and data response questions.
                </p>
              </div>
              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/pricing"
                  className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-sm px-8 py-4 rounded-full border-2 border-white neo-brutalist-shadow hover:-translate-y-0.5 transition-transform text-center"
                >
                  Explore Tutoring Plans
                </Link>
                <Link
                  href="/faculty"
                  className="bg-transparent text-white font-['Work_Sans'] font-bold text-sm px-8 py-4 rounded-full border-2 border-white hover:bg-white/10 transition-colors text-center"
                >
                  Meet Faculty Specialists
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
