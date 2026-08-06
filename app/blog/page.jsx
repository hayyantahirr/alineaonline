"use client";

import Link from "next/link";
import { useState } from "react";

export default function BlogPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");

  const articles = [
    {
      id: 1,
      title: "The 25-Mark Essay Blueprint: How to Secure Level 4 Evaluation",
      category: "ECONOMICS A-LEVEL",
      date: "August 2026",
      readTime: "6 min read",
      excerpt:
        "Most A-Level Economics students lose marks not in theory, but in evaluation. Here is the exact paragraph structure senior examiners look for.",
      author: "Khawar (Founder)",
      featured: true,
    },
    {
      id: 2,
      title: "Why Past Paper Memorisation Fails in New Edexcel & CAIE Papers",
      category: "EXAM TECHNIQUE",
      date: "July 2026",
      readTime: "4 min read",
      excerpt:
        "Exam boards frequently rewrite question triggers to penalize rote learning. Discover active application techniques.",
      author: "Dr. Sarah Lin",
      featured: false,
    },
    {
      id: 3,
      title: "Calculus & Mechanics Mistakes That Cost A* Student Grades",
      category: "MATHEMATICS",
      date: "July 2026",
      readTime: "5 min read",
      excerpt:
        "Analysis of 500+ student papers reveals common algebraic slips and missing unit specifications in Edexcel Mechanics.",
      author: "James Vance",
      featured: false,
    },
    {
      id: 4,
      title: "The GCC Exam Survival Guide: Balancing School & Private Tutoring",
      category: "STUDY STRATEGY",
      date: "June 2026",
      readTime: "7 min read",
      excerpt:
        "A structured timeline for Dubai and Riyadh students preparing for May/June and Oct/Nov exam series.",
      author: "Khawar",
      featured: false,
    },
  ];

  const freeResources = [
    {
      title: "A-Level Economics Micro & Macro Model Diagram Pack (PDF)",
      desc: "All 32 essential diagrams required for Edexcel & CAIE papers.",
      format: "PDF (18 MB)",
    },
    {
      title: "IGCSE Economics Mark Scheme Vocabulary Cheat Sheet",
      desc: "Keyword clusters required for 4-mark and 6-mark data response questions.",
      format: "PDF (4 MB)",
    },
    {
      title: "Maths Formula & Trigonometric Proof Quick Reference",
      desc: "High-yield formulas and proof templates for A-Level Pure Mathematics.",
      format: "PDF (8 MB)",
    },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <div className="w-full bg-background text-on-background">
      {/* Header Banner */}
      <section className="bg-on-background text-white py-16 px-6 border-b-4 border-primary-container">
        <div className="max-w-container-max mx-auto">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            EXAM GUIDES & ACADEMIC INSIGHTS
          </span>
          <h1 className="font-['Archivo_Black'] text-4xl md:text-6xl text-primary-container mt-4 mb-4">
            Blog & Exam Resources
          </h1>
          <p className="font-['Work_Sans'] text-lg text-surface-variant max-w-2xl leading-relaxed">
            Free high-yield articles, mark scheme breakdowns, and downloadable revision guides written by senior examiners.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-6 max-w-container-max mx-auto">
        {/* Featured Article */}
        {articles.filter((a) => a.featured).map((article) => (
          <div
            key={article.id}
            className="bg-primary-container text-on-background rounded-6 p-8 md:p-12 border-2 border-on-background neo-brutalist-shadow mb-16"
          >
            <div className="flex items-center gap-3 mb-4 font-['IBM_Plex_Mono'] text-xs font-bold">
              <span className="bg-on-background text-primary-container px-3 py-1 rounded-full">
                FEATURED ARTICLE
              </span>
              <span>{article.category}</span>
              <span>•</span>
              <span>{article.readTime}</span>
            </div>

            <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl mb-4 leading-tight">
              {article.title}
            </h2>
            <p className="font-['Work_Sans'] text-base md:text-lg text-on-primary-container max-w-3xl leading-relaxed mb-6">
              {article.excerpt}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-on-background/20">
              <div className="font-['Work_Sans'] text-xs font-bold text-on-background">
                By {article.author} | Published {article.date}
              </div>
              <Link
                href="/booking"
                className="bg-on-background text-white font-['Work_Sans'] font-bold text-sm px-6 py-3 rounded-full border border-white hover:bg-inverse-surface transition-colors"
              >
                Read Full Guide
              </Link>
            </div>
          </div>
        ))}

        {/* Article Grid */}
        <h3 className="font-['Archivo_Black'] text-2xl text-on-background mb-8">
          Recent Exam Guides
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {articles
            .filter((a) => !a.featured)
            .map((art) => (
              <div
                key={art.id}
                className="bg-white rounded-5 p-6 border-2 border-on-background bento-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-['IBM_Plex_Mono'] text-2.75 text-secondary">
                    <span className="font-bold text-primary">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h4 className="font-['Archivo_Black'] text-lg text-on-background mb-3 leading-snug">
                    {art.title}
                  </h4>
                  <p className="font-['Work_Sans'] text-xs text-on-surface-variant leading-relaxed mb-4">
                    {art.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-line flex items-center justify-between text-xs">
                  <span className="font-['Work_Sans'] font-semibold text-secondary">{art.author}</span>
                  <Link href="/booking" className="font-bold text-primary hover:underline">
                    Read Article →
                  </Link>
                </div>
              </div>
            ))}
        </div>

        {/* Free Resource Downloads */}
        <div className="bg-on-background text-white rounded-6 p-8 md:p-12 border-2 border-on-background shadow-lg mb-16">
          <span className="bg-primary-container text-on-background font-['IBM_Plex_Mono'] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            FREE DOWNLOADS
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-primary-container mt-3 mb-6">
            Revision Cheat Sheets & Model Packs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {freeResources.map((res, i) => (
              <div
                key={i}
                className="bg-inverse-surface p-6 rounded-xl border border-outline flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="material-symbols-outlined text-2xl text-primary-container">
                      download
                    </span>
                    <span className="font-['IBM_Plex_Mono'] text-2.5 text-muted">
                      {res.format}
                    </span>
                  </div>
                  <h4 className="font-['Archivo_Black'] text-base text-white mb-2">
                    {res.title}
                  </h4>
                  <p className="font-['Work_Sans'] text-xs text-surface-dim leading-relaxed mb-4">
                    {res.desc}
                  </p>
                </div>

                <Link
                  href="/booking"
                  className="w-full text-center bg-primary-container text-on-primary-container font-['Work_Sans'] font-extrabold text-xs py-2.5 rounded-lg border border-white"
                >
                  Download Guide
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="bg-surface-container rounded-6 p-8 md:p-12 border-2 border-on-background text-center max-w-3xl mx-auto bento-shadow">
          <h3 className="font-['Archivo_Black'] text-2xl text-on-background mb-3">
            Get Examiner Tips Delivered Weekly
          </h3>
          <p className="font-['Work_Sans'] text-sm text-on-surface-variant mb-6">
            Join 1,200+ students and parents receiving weekly mark scheme breakdowns and exam timetable strategies.
          </p>

          {subscribed ? (
            <div className="bg-success text-white p-4 rounded-full font-['Work_Sans'] font-bold text-sm">
              ✓ Subscribed! You will receive our next examiner newsletter.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 p-3.5 bg-white border border-on-background rounded-full text-sm font-['Work_Sans']"
              />
              <button
                type="submit"
                className="bg-primary-container text-on-primary-container font-['Work_Sans'] font-extrabold text-sm px-6 py-3.5 rounded-full border border-on-background neo-brutalist-shadow whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
