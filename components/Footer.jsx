import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#191c1d] text-[#f8f9fa] border-t-4 border-[#ffd400] pt-16 pb-12 font-['Work_Sans']">
      <div className="max-w-[1180px] mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#ffd400] border border-[#f8f9fa] rounded-lg flex items-center justify-center font-['Archivo_Black'] text-[#191c1d] text-xl">
              A
            </div>
            <span className="font-['Archivo_Black'] text-2xl tracking-tight text-[#f8f9fa]">
              ALINEA<span className="text-[#ffd400]">ONLINE</span>
            </span>
          </div>
          <p className="text-[#d9dadb] max-w-md text-base leading-relaxed">
            We don't teach the syllabus. We teach the mark scheme. Specialising in IGCSE and A-Level preparations for high-stakes exam excellence across the GCC and Asia.
          </p>
          <div className="flex gap-3 pt-2 font-['IBM_Plex_Mono'] text-xs text-[#ffe177] uppercase tracking-wider">
            <span className="px-3 py-1 bg-[#2e3132] rounded-full border border-[#7f775f]">IGCSE</span>
            <span className="px-3 py-1 bg-[#2e3132] rounded-full border border-[#7f775f]">A-LEVELS</span>
            <span className="px-3 py-1 bg-[#2e3132] rounded-full border border-[#7f775f]">IB DIPLOMA</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-['Archivo_Black'] text-lg text-[#ffd400] uppercase tracking-wider">
            Navigation
          </h4>
          <Link href="/" className="text-[#e1e3e4] hover:text-[#ffd400] transition-colors">
            Home (Homepage V2)
          </Link>
          <Link href="/subjects" className="text-[#e1e3e4] hover:text-[#ffd400] transition-colors">
            Subjects & Syllabus
          </Link>
          <Link href="/blog" className="text-[#e1e3e4] hover:text-[#ffd400] transition-colors">
            Blog & Exam Guides
          </Link>
          <Link href="/booking" className="text-[#e1e3e4] hover:text-[#ffd400] transition-colors">
            Book a Session
          </Link>
        </div>

        {/* Contact & WhatsApp */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-['Archivo_Black'] text-lg text-[#ffd400] uppercase tracking-wider">
            Get In Touch
          </h4>
          <p className="text-[#d9dadb] text-sm">
            Ready to secure top grades? Speak with our academic coordinators directly via WhatsApp or schedule a call.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#16a34a] text-[#ffffff] font-['Work_Sans'] font-bold text-base px-6 py-3 rounded-full border border-white hover:bg-[#15803d] transition-colors shadow-md w-max"
          >
            <span className="material-symbols-outlined">chat</span>
            WhatsApp Academic Team
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1180px] mx-auto px-6 border-t border-[#3a3f45] pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#a4a7ab] gap-4">
        <p>© {new Date().getFullYear()} Alinea Online Academy. All rights reserved.</p>
        <div className="flex gap-6 font-['IBM_Plex_Mono']">
          <Link href="/subjects" className="hover:text-[#ffd400]">Terms</Link>
          <Link href="/subjects" className="hover:text-[#ffd400]">Privacy Policy</Link>
          <Link href="/booking" className="hover:text-[#ffd400]">Book Consultation</Link>
        </div>
      </div>
    </footer>
  );
}
