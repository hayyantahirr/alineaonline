"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  Calendar,
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
} from "lucide-react";

function getInitials(name = "") {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export default function BlogListSection({ initialBlogs = [], categories = ["All"] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBlogs = useMemo(() => {
    return initialBlogs.filter((b) => {
      const matchesCategory =
        selectedCategory === "All" ||
        b.category?.toLowerCase() === selectedCategory.toLowerCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        b.title?.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.author?.toLowerCase().includes(q) ||
        b.category?.toLowerCase().includes(q) ||
        (Array.isArray(b.tags) && b.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [initialBlogs, selectedCategory, searchQuery]);

  const featuredArticle = filteredBlogs[0] || null;
  const gridArticles = filteredBlogs.slice(1);

  return (
    <div>
      {/* Search & Category Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full font-['Work_Sans'] font-bold text-xs whitespace-nowrap transition-all duration-200 cursor-pointer border-2 ${
                selectedCategory === cat
                  ? "bg-on-background text-white border-on-background shadow-[3px_3px_0_0_var(--color-primary-container)]"
                  : "bg-white text-on-surface-variant border-line hover:border-on-background/40 hover:bg-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles & topics..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white rounded-full border-2 border-line text-xs font-['Work_Sans'] text-on-background placeholder:text-muted focus:outline-none focus:border-on-background transition-colors"
          />
        </div>
      </div>

      {filteredBlogs.length === 0 ? (
        /* Empty State */
        <div className="bg-white rounded-3xl p-12 border-2 border-line text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-[#f5f2e9] text-[#c0392b] flex items-center justify-center mx-auto mb-4 border border-line">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="font-['Archivo_Black'] text-xl text-on-background mb-2">
            No Articles Found
          </h3>
          <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-6">
            {searchQuery
              ? `No articles matched "${searchQuery}". Try different keywords.`
              : "No articles are available in this category at the moment."}
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs px-6 py-3 rounded-full border-2 border-on-background neo-brutalist-shadow cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* HERO FEATURED ARTICLE CARD */}
          {featuredArticle && (
            <div className="bg-white rounded-3xl border-2 border-on-background shadow-[8px_8px_0_0_var(--color-on-background)] mb-14 overflow-hidden group hover:-translate-y-0.5 transition-all duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
                {/* Left Image */}
                <div className="lg:col-span-6 relative min-h-70 sm:min-h-[340px] lg:min-h-[420px] bg-surface-container-low overflow-hidden">
                  {featuredArticle.featuredImage ? (
                    <Image
                      src={featuredArticle.featuredImage}
                      alt={featuredArticle.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[#191c1d] to-[#3a3f45] flex items-center justify-center p-8 text-center text-[#ffd400]">
                      <BookOpen className="w-16 h-16 opacity-60" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full border border-on-background shadow-xs uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5 text-[#c0392b]" />
                      Latest Insight
                    </span>
                  </div>
                </div>

                {/* Right Content */}
                <div className="lg:col-span-6 p-7 sm:p-10 md:p-12 flex flex-col justify-between bg-white">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="bg-[#faf8f2] border border-line font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full text-[#c0392b] uppercase">
                        {featuredArticle.category}
                      </span>
                      <span className="font-['IBM_Plex_Mono'] text-xs text-muted flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        {featuredArticle.readTime}
                      </span>
                      <span className="font-['IBM_Plex_Mono'] text-xs text-muted flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {featuredArticle.date}
                      </span>
                    </div>

                    <Link href={`/blog/${featuredArticle.slug || featuredArticle.id}`}>
                      <h3 className="font-['Archivo_Black'] text-2xl sm:text-3xl md:text-3xl text-on-background mb-4 leading-tight hover:text-[#c0392b] transition-colors">
                        {featuredArticle.title}
                      </h3>
                    </Link>

                    <p className="font-['Work_Sans'] text-sm sm:text-base text-on-surface-variant leading-relaxed mb-6 line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>

                    {/* Tags */}
                    {featuredArticle.tags && featuredArticle.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-6">
                        {featuredArticle.tags.map((t, idx) => (
                          <span
                            key={idx}
                            className="font-['IBM_Plex_Mono'] text-[10px] font-medium px-2 py-0.5 rounded-md bg-[#faf8f2] border border-line text-on-surface-variant"
                          >
                            {t.startsWith("#") ? t : `#${t}`}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-line">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-on-background text-primary-container flex items-center justify-center font-['Archivo_Black'] text-sm font-bold shrink-0">
                        {getInitials(featuredArticle.author)}
                      </div>
                      <div>
                        <span className="font-['Work_Sans'] font-bold text-xs sm:text-sm text-on-background block">
                          {featuredArticle.author}
                        </span>
                        <span className="font-['IBM_Plex_Mono'] text-[11px] text-muted">
                          {featuredArticle.authorRole}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/blog/${featuredArticle.slug || featuredArticle.id}`}
                      className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-xs sm:text-sm px-6 py-3 rounded-full border-2 border-on-background neo-brutalist-shadow hover:-translate-y-0.5 transition-transform inline-flex items-center gap-2"
                    >
                      <span>Read Full Guide</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* REGULAR ARTICLES GRID */}
          {gridArticles.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {gridArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-3xl border-2 border-line hover:border-on-background hover:-translate-y-1 hover:shadow-[6px_6px_0_0_var(--color-on-background)] transition-all duration-200 flex flex-col justify-between overflow-hidden group"
                >
                  <div>
                    {/* Thumbnail Image */}
                    <Link
                      href={`/blog/${article.slug || article.id}`}
                      className="block w-full h-52 relative bg-surface-container-low overflow-hidden border-b-2 border-line"
                    >
                      {article.featuredImage ? (
                        <Image
                          src={article.featuredImage}
                          alt={article.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-[#191c1d] to-[#3a3f45] flex items-center justify-center text-[#ffd400]">
                          <BookOpen className="w-10 h-10 opacity-40" />
                        </div>
                      )}
                      <div className="absolute top-3 left-3">
                        <span className="font-['IBM_Plex_Mono'] text-[10px] font-bold uppercase bg-white/95 backdrop-blur-xs text-[#c0392b] px-2.5 py-1 rounded-full border border-line shadow-xs">
                          {article.category}
                        </span>
                      </div>
                    </Link>

                    {/* Content Area */}
                    <div className="p-6">
                      {/* Meta info */}
                      <div className="flex items-center justify-between text-[11px] font-['IBM_Plex_Mono'] text-muted mb-2.5">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {article.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </span>
                      </div>

                      {/* Title */}
                      <Link href={`/blog/${article.slug || article.id}`}>
                        <h3 className="font-['Archivo_Black'] text-lg text-on-background mb-3 leading-snug group-hover:text-[#c0392b] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                      </Link>

                      {/* Excerpt */}
                      <p className="font-['Work_Sans'] text-xs sm:text-sm text-on-surface-variant leading-relaxed line-clamp-3 mb-4">
                        {article.excerpt}
                      </p>

                      {/* Tags */}
                      {article.tags && article.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {article.tags.slice(0, 3).map((t, idx) => (
                            <span
                              key={idx}
                              className="font-['IBM_Plex_Mono'] text-[9px] font-medium px-2 py-0.5 rounded bg-[#faf8f2] border border-line text-on-surface-variant"
                            >
                              {t.startsWith("#") ? t : `#${t}`}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Author Footer */}
                  <div className="p-6 pt-3 border-t border-line/60 bg-[#fbf9f4]/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-on-background text-white flex items-center justify-center font-['Archivo_Black'] text-[10px] shrink-0">
                        {getInitials(article.author)}
                      </div>
                      <span className="font-['Work_Sans'] text-xs font-bold text-on-background truncate">
                        {article.author}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${article.slug || article.id}`}
                      className="font-['Work_Sans'] font-extrabold text-xs text-[#c0392b] hover:text-on-background inline-flex items-center gap-1 transition-colors shrink-0"
                    >
                      <span>Read</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
