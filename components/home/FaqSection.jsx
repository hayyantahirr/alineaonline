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

  return (
    <section id="faq" className="px-gutter max-w-container-max mx-auto bg-surface-container-low border-y border-outline-variant py-20">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-grid-gap-lg">
        <div className="md:col-span-4">
          <span className="text-eyebrow font-eyebrow uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-4 font-bold text-xs">
            <span className="w-5 h-o.5 bg-primary-container"></span> FAQ
          </span>
          <h2 className="font-display-h2 text-display-h2 text-on-background text-3xl md:text-4xl">
            Every doubt, answered up front.
          </h2>
        </div>
        <div className="md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-line p-6 rounded-[20px] bento-shadow bg-surface"
            >
              <p className="font-bold text-on-background mb-2 text-base">{faq.q}</p>
              <p className="text-body-sm text-on-surface-variant text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
