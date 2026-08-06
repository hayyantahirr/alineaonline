import Link from "next/link";

// Add your live @alineaonline Instagram Reel URLs or MP4 video sources below.
// Note: Direct MP4 video sources will autoplay smoothly on scroll.
const REELS = [
  {
    id: 1,
    url: "https://www.instagram.com/reel/DbscW-KIRPY/",
    // video: "/reels/reel1.mp4", // Add direct mp4 path here for 100% video autoplay
  },
  {
    id: 2,
    url: "https://www.instagram.com/reel/DbdZSwGIl-9/",
    // video: "/reels/reel2.mp4",
  },
  {
    id: 3,
    url: "https://www.instagram.com/reel/DbYQn3KoVPc/",
    // video: "/reels/reel3.mp4",
  },
  {
    id: 4,
    url: "https://www.instagram.com/reel/DbVnt6oTJKs/",
    // video: "/reels/reel4.mp4",
  },
];

function getInstagramEmbedUrl(idOrUrl) {
  if (!idOrUrl) return "";
  const match = idOrUrl.match(/(?:reel|p)\/([A-Za-z0-9_-]+)/);
  const shortcode = match ? match[1] : idOrUrl;
  return `https://www.instagram.com/reel/${shortcode}/embed`;
}

export default function InstagramReels() {
  return (
    <section className="py-16 md:py-24 bg-on-background text-white">
      <div className="px-6 max-w-container-max mx-auto">
        {/* Section Header with Right-Aligned Grey Instagram Logo */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-['Work_Sans'] font-extrabold text-xs uppercase tracking-wide text-primary-fixed flex items-center gap-2 mb-4">
              <span className="w-5 h-0.5 bg-primary-container"></span> On
              Instagram
            </span>
            <h2 className="font-['Archivo_Black'] text-3xl md:text-4xl text-white mb-4">
              See how we actually teach.
            </h2>
            <p className="text-surface-variant font-['Work_Sans'] text-base md:text-lg flex flex-wrap items-center gap-x-2 gap-y-1">
              <span>Live from</span>
              <Link
                href="https://www.instagram.com/alineaonline"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-container font-bold underline underline-offset-4 hover:text-primary-fixed decoration-primary-container hover:decoration-primary-fixed transition-colors"
              >
                <span>@alineaonline</span>
              </Link>
              <span>— new Reels every week.</span>
            </p>
          </div>

          {/* Grey Instagram Logo leading to @alineaonline */}
          <Link
            href="https://www.instagram.com/alineaonline"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors duration-200 p-2.5 rounded-full hover:bg-white/10 shrink-0 self-start md:self-center"
            title="Visit @alineaonline on Instagram"
            aria-label="Alinea Instagram Profile"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REELS.map((reel) => {
            const embedUrl = getInstagramEmbedUrl(reel.url || reel.id);
            return (
              <div
                key={reel.id}
                className="bg-black rounded-2xl overflow-hidden border border-white/10 shadow-xl h-[350px] sm:h-[370px] relative w-full group hover:border-primary-container/50 transition-all duration-300"
              >
                {reel.video ? (
                  <video
                    src={reel.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <iframe
                      src={embedUrl}
                      className="absolute -top-[62px] left-0 w-full h-[540px] border-0 bg-transparent"
                      allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share"
                      scrolling="no"
                      frameBorder="0"
                      title={`Instagram Reel ${reel.id}`}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
