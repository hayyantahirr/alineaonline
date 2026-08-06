import Link from "next/link";

export default function SubjectsSpotlight() {
  const otherSubjects = [
    {
      name: "Mathematics",
      level: "GCSE & A-Level",
      img: "https://picsum.photos/seed/alinea-maths/100/100",
    },
    {
      name: "Physics",
      level: "GCSE & A-Level",
      img: "https://picsum.photos/seed/alinea-physics/100/100",
    },
    {
      name: "Biology",
      level: "GCSE & A-Level",
      img: "https://picsum.photos/seed/alinea-biology/100/100",
    },
    {
      name: "English Language",
      level: "GCSE & A-Level",
      img: "https://picsum.photos/seed/alinea-english-lang/100/100",
    },
    {
      name: "Business Studies",
      level: "GCSE & A-Level",
      img: "https://picsum.photos/seed/alinea-business/100/100",
    },
  ];

  return (
    <section
      id="subjects"
      className="py-section-v-mobile md:py-section-v-desktop bg-surface-container/30 border-y-2 border-line"
    >
      <div className="px-gutter max-w-container-max mx-auto">
        <div className="mb-12">
          <span className="text-eyebrow font-eyebrow uppercase tracking-wide text-on-surface-variant flex items-center gap-2 mb-4 font-bold text-xs">
            <span className="w-5 h-2px bg-primary-container"></span> What We
            Teach
          </span>
          <h2 className="font-display-h2 text-display-h2 text-on-background mb-4 text-3xl md:text-4xl">
            Economics — our flagship. Six more subjects, taught to the same
            standard.
          </h2>
          <p className="font-lead text-lead text-on-surface-variant max-w-2xl text-base md:text-lg">
            The same academic model, and the same direct oversight, now covers
            the subjects below.
          </p>
        </div>

        {/* Flagship Subject Card */}
        <div className="grid grid-cols-1 gap-6 mb-8">
          <Link
            href="/subjects"
            className="group relative aspect-16/7 rounded-[20px] overflow-hidden border-2 border-on-background shadow-[8px_8px_0_0_#191c1d] transition-transform hover:-translate-y-1 block"
          >
            <img
              src="https://picsum.photos/seed/alinea-economics/1000/450"
              className="w-full h-full object-cover"
              alt="Economics Flagship Subject"
            />
            <div className="absolute inset-0 bg-linear-to-t from-on-background/90 via-on-background/20 to-transparent"></div>
            <div className="absolute bottom-0 left-0 p-8">
              <span className="inline-block px-3 py-1 bg-primary-container text-on-primary-container text-eyebrow font-eyebrow uppercase rounded-full mb-4 font-bold text-xs border border-on-background">
                Flagship Subject
              </span>
              <h3 className="font-display-h2 text-3xl md:text-5xl text-paper mb-2">
                Economics
              </h3>
              <p className="text-paper/80 font-body text-sm md:text-base">
                GCSE &amp; A-Level · Edexcel &amp; AQA
              </p>
            </div>
          </Link>
        </div>

        {/* Other Subjects Pill Grid */}
        <div className="flex flex-wrap gap-4">
          {otherSubjects.map((sub, idx) => (
            <div
              key={idx}
              className="bg-paper border border-line rounded-full px-6 py-3 flex items-center gap-3 bento-shadow"
            >
              <img
                src={sub.img}
                className="w-8 h-8 rounded-full object-cover"
                alt={sub.name}
              />
              <div>
                <p className="font-bold text-sm text-on-background">
                  {sub.name}
                </p>
                <p className="text-[10px] text-on-surface-variant uppercase font-mono">
                  {sub.level}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
