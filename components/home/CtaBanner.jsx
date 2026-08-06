import Link from "next/link";

export default function CtaBanner() {
  return (
    <section className="px-gutter max-w-container-max mx-auto my-section-v-desktop py-16">
      <div className="bg-primary-container rounded-[28px] p-8 md:p-16 border-2 border-on-background shadow-[12px_12px_0_0_#191c1d] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <h2 className="font-display-h2 text-4xl md:text-5xl text-on-background mb-4">
            Start with a conversation, not a form.
          </h2>
          <p className="font-lead text-lead text-on-background/80 text-lg">
            Tell us about your child's curriculum and goals — Khawar will personally advise on the right path.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href="/booking"
            className="bg-on-background text-paper font-button-lg text-button-lg px-8 py-4 rounded-full text-center hover:opacity-90 transition-opacity font-bold text-base"
          >
            Book a Free Session
          </Link>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-on-background border-2 border-on-background font-button-lg text-button-lg px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 hover:bg-on-background/5 transition-colors font-bold text-base"
          >
            <span className="material-symbols-outlined">chat</span> Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
