export default function InstagramReels() {
  const reels = [
    { id: 1, seed: "alinea-reel1", views: "4.2K" },
    { id: 2, seed: "alinea-reel2", views: "3.8K" },
    { id: 3, seed: "alinea-reel3", views: "5.1K" },
    { id: 4, seed: "alinea-reel4", views: "2.9K" },
  ];

  return (
    <section className="py-section-v-mobile md:py-section-v-desktop bg-on-background text-paper">
      <div className="px-gutter max-w-container-max mx-auto">
        <div className="mb-12">
          <span className="text-eyebrow font-eyebrow uppercase tracking-wide text-primary-fixed flex items-center gap-2 mb-4 font-bold text-xs">
            <span className="w-5 h-0.5 bg-primary-container"></span> On Instagram
          </span>
          <h2 className="font-display-h2 text-display-h2 text-paper mb-4 text-3xl md:text-4xl">
            See how we actually teach.
          </h2>
          <p className="text-paper/60 font-lead text-base md:text-lg">
            Live from @alineaonline — new Reels every week.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="aspect-9/16 rounded-xl overflow-hidden relative group cursor-pointer border border-paper/10"
            >
              <img
                src={`https://picsum.photos/seed/${reel.seed}/400/711`}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={`Alinea Reel ${reel.id}`}
              />
              <div className="absolute inset-0 bg-on-background/40 flex items-center justify-center group-hover:bg-on-background/20 transition-colors">
                <span className="material-symbols-outlined text-4xl text-white">
                  play_circle
                </span>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-bold text-white bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
                <span className="material-symbols-outlined text-sm">play_arrow</span> {reel.views}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
