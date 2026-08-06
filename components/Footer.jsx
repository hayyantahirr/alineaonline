import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-on-background text-background border-t-4 border-primary-container pt-16 pb-12 font-['Work_Sans']">
      <div className="max-w-container-max mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
        {/* Brand Column */}
        <div className="md:col-span-5 flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-container border border-background rounded-lg flex items-center justify-center font-['Archivo_Black'] text-on-background text-xl">
              A
            </div>
            <span className="font-['Archivo_Black'] text-2xl tracking-tight text-background">
              ALINEA<span className="text-primary-container">ONLINE</span>
            </span>
          </div>
          <p className="text-surface-dim max-w-md text-base leading-relaxed">
            We don&apos;t teach the syllabus. We teach the mark scheme. Specialising in IGCSE and A-Level preparations for high-stakes exam excellence across the GCC and Asia.
          </p>
          <div className="flex gap-3 pt-2 font-['IBM_Plex_Mono'] text-xs text-primary-fixed uppercase tracking-wider">
            <span className="px-3 py-1 bg-inverse-surface rounded-full border border-outline">IGCSE</span>
            <span className="px-3 py-1 bg-inverse-surface rounded-full border border-outline">A-LEVELS</span>
            <span className="px-3 py-1 bg-inverse-surface rounded-full border border-outline">IB DIPLOMA</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="md:col-span-3 flex flex-col gap-3">
          <h4 className="font-['Archivo_Black'] text-lg text-primary-container uppercase tracking-wider">
            Navigation
          </h4>
          <Link href="/" className="text-surface-variant hover:text-primary-container transition-colors">
            Home (Homepage V2)
          </Link>
          <Link href="/subjects" className="text-surface-variant hover:text-primary-container transition-colors">
            Subjects & Syllabus
          </Link>
          <Link href="/blog" className="text-surface-variant hover:text-primary-container transition-colors">
            Blog & Exam Guides
          </Link>
          <Link href="/booking" className="text-surface-variant hover:text-primary-container transition-colors">
            Book a Session
          </Link>
        </div>

        {/* Contact & WhatsApp */}
        <div className="md:col-span-4 flex flex-col gap-4">
          <h4 className="font-['Archivo_Black'] text-lg text-primary-container uppercase tracking-wider">
            Get In Touch
          </h4>
          <p className="text-surface-dim text-sm">
            Ready to secure top grades? Speak with our academic coordinators directly via WhatsApp or schedule a call.
          </p>
          <a
            href="https://wa.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-success text-white font-['Work_Sans'] font-bold text-base px-6 py-3 rounded-full border border-white hover:bg-success-dark transition-colors shadow-md w-max"
          >
            <span className="material-symbols-outlined">chat</span>
            WhatsApp Academic Team
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-container-max mx-auto px-6 border-t border-ink-soft pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
        <p>© {new Date().getFullYear()} Alinea Online Academy. All rights reserved.</p>
        <div className="flex gap-6 font-['IBM_Plex_Mono']">
          <Link href="/subjects" className="hover:text-primary-container">Terms</Link>
          <Link href="/subjects" className="hover:text-primary-container">Privacy Policy</Link>
         <h3>powered by </h3> <Link href="https://hayyantahirr.vercel.app" className="hover:text-primary-container">hayyantahirr</Link>
        </div>
      </div>
    </footer>
  );
}
