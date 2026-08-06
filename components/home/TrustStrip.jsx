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
    <div className="bg-on-background py-4 border-y-2 border-primary-container overflow-hidden">
      <div className="w-full whitespace-nowrap overflow-hidden">
        <div className="animate-marquee flex gap-8 items-center px-4 font-technical-mono text-technical-mono text-primary-fixed uppercase tracking-wider opacity-80 text-sm">
          {[...cities, ...cities].map((city, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary-container"></span>
              {city}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
