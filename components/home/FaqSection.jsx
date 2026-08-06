"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function FaqSection() {
  const faqs = [
    {
      q: "Why trust Alinea?",
      a: "One academic director personally oversees every lesson — not a call center matching you to strangers.",
    },
    {
      q: "How are you different?",
      a: "We teach the mark scheme, not just the syllabus — built from real examiner reports.",
    },
    {
      q: "Will my child improve?",
      a: "Every lesson is measured against grade movement, not just effort or attendance.",
    },
    {
      q: "Typical results?",
      a: "Grade C → A* in two terms is typical for Alinea students, not the exception.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      className="w-full bg-surface-container-low py-20 md:py-28"
    >
      <div className="px-6 max-w-container-max mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16">
          {/* Left Column — Title */}
          <div className="md:col-span-4 md:sticky md:top-32 md:self-start">
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-primary-container"></span> FAQ
            </span>
            <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-on-background leading-tight mb-4">
              Every doubt, <span className="marker-highlight">answered</span> up
              front.
            </h2>
            <p className="font-['Work_Sans'] text-sm text-on-surface-variant leading-relaxed">
              No surprises. No hidden terms. Just clarity before you commit.
            </p>
          </div>

          {/* Right Column — Accordion FAQ Cards */}
          <div className="md:col-span-8 flex flex-col gap-4">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`border-2 rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isOpen
                      ? "border-on-background bg-white shadow-[6px_6px_0_0_var(--color-on-background)]"
                      : "border-line bg-surface hover:border-on-background/30 hover:shadow-[4px_4px_0_0_rgba(25,28,29,0.08)]"
                  }`}
                  onClick={() => toggle(idx)}
                >
                  {/* Question Row */}
                  <div className="flex items-center justify-between gap-4 p-5 md:p-6">
                    <div className="flex items-center gap-4">
                      <span
                        className={`font-['IBM_Plex_Mono'] font-bold text-xs w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-colors duration-300 ${
                          isOpen
                            ? "bg-primary-container text-on-background border-on-background"
                            : "bg-surface-container-high text-on-surface-variant border-line"
                        }`}
                      >
                        {String(idx + 1).padStart(2, "0")}
                      </span>
                      <p className="font-['Work_Sans'] font-bold text-on-background text-sm md:text-base">
                        {faq.q}
                      </p>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-on-surface-variant shrink-0 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Answer Panel */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
                        <div className="border-t border-line pt-4 ml-11">
                          <p className="font-['Work_Sans'] text-sm text-on-surface-variant leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
