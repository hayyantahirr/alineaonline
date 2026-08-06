export default function TrustStrip() {
  const cities = [
    "Trusted in Dubai",
    "Trusted in Riyadh",
    "Trusted in Doha",
    "Trusted in Singapore",
    "Trusted in Kuala Lumpur",
    "Trusted in London",
  ];

  return (
    <div className="bg-[#191c1d] py-4 border-y-2 border-[#ffd400] overflow-hidden w-full">
      <div className="w-full overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex flex-row items-center gap-20 px-8 font-['IBM_Plex_Mono'] text-xs font-semibold text-[#ffe177] uppercase tracking-wider shrink-0">
          {[...cities, ...cities, ...cities].map((city, idx) => (
            <span key={idx} className="inline-flex items-center gap-8 shrink-0 mr-8">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffd400] inline-block shrink-0"></span>
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
