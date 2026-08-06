import { Play } from "lucide-react";

export default function InstagramReels() {
  const reels = [
    { id: 1, file: "/stitch/reel1.jpg", views: "4.2K" },
    { id: 2, file: "/stitch/reel2.jpg", views: "3.8K" },
    { id: 3, file: "/stitch/reel3.jpg", views: "5.1K" },
    { id: 4, file: "/stitch/reel4.jpg", views: "2.9K" },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#191c1d] text-white">
      <div className="px-6 max-w-[1180px] mx-auto">
        <div className="mb-12">
          <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-[#ffe177] flex items-center gap-2 mb-4">
            <span className="w-5 h-[2px] bg-[#ffd400]"></span> On Instagram
          </span>
          <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-white mb-4">
            See how we actually teach.
          </h2>
          <p className="text-[#e1e3e4] font-['Work_Sans'] text-base md:text-lg">
            Live from @alineaonline — new Reels every week.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="aspect-[9/16] rounded-xl overflow-hidden relative group cursor-pointer border border-white/10"
            >
              <img
                src={reel.file}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                alt={`Alinea Reel ${reel.id}`}
              />
              <div className="absolute inset-0 bg-[#191c1d]/40 flex items-center justify-center group-hover:bg-[#191c1d]/20 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Play className="w-6 h-6 text-white fill-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-[11px] font-bold text-white bg-black/70 px-2.5 py-1 rounded-md backdrop-blur-sm">
                <Play className="w-3 h-3 fill-white text-white" /> {reel.views}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
