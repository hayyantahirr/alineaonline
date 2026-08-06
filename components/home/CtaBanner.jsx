import Link from "next/link";
import { MessageCircle } from "lucide-react";

export default function CtaBanner() {
  return (
    <section className="px-6 max-w-[1180px] mx-auto my-16">
      <div className="bg-[#ffd400] rounded-[28px] p-8 md:p-16 border-2 border-[#191c1d] shadow-[12px_12px_0_0_#191c1d] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8">
          <h2 className="font-['Archivo_Black'] text-3xl md:text-5xl text-[#191c1d] mb-4">
            Start with a conversation, not a form.
          </h2>
          <p className="font-['Work_Sans'] text-base md:text-lg text-[#705c00] leading-relaxed">
            Tell us about your child's curriculum and goals — Khawar will personally advise on the right path.
          </p>
        </div>
        <div className="md:col-span-4 flex flex-col gap-4">
          <Link
            href="/booking"
            className="bg-[#191c1d] text-white font-['Work_Sans'] font-extrabold text-[15px] px-8 py-4 rounded-full text-center hover:bg-[#2e3132] transition-colors neo-brutalist-shadow"
          >
            Book a Free Session
          </Link>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-transparent text-[#191c1d] border-2 border-[#191c1d] font-['Work_Sans'] font-extrabold text-[15px] px-8 py-4 rounded-full text-center flex items-center justify-center gap-2 hover:bg-[#191c1d]/5 transition-colors"
          >
            <MessageCircle className="w-5 h-5 text-[#191c1d]" /> Message on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
