import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="px-6 max-w-container-max mx-auto my-16">
      <div className="bg-primary-container rounded-7 p-8 md:p-16 border-2 border-on-background shadow-[12px_12px_0_0_var(--color-on-background)] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-on-background mb-4">
            Start with a conversation, not a form.
          </h2>
          <p className="font-['Work_Sans'] text-base md:text-lg text-on-primary-container leading-relaxed">
            Tell us about your child&apos;s curriculum and goals — Khawar will personally advise on the right path.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href="/booking"
            className="bg-on-background text-white font-['Work_Sans'] font-extrabold text-3.75 px-8 py-4 rounded-full text-center hover:bg-inverse-surface transition-colors neo-brutalist-shadow"
          >
            Book a Session
          </Link>
          <a
            href="https://wa.me/+923322348565"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-on-background border-2 border-on-background font-['Work_Sans'] font-extrabold text-3.75 px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 hover:bg-on-background/5 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-on-background" /> Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
