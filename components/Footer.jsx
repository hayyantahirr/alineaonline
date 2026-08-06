import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-on-background text-background border-t-4 border-primary-container font-['Work_Sans']">
      {/* Main Footer Content */}
      <div className="max-w-container-max mx-auto px-6 pt-20 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 md:gap-12">
          {/* Brand Column with Logo */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="flex items-center gap-3 group w-max">
              <img
                src="/stitch/logo.png"
                alt="Alinea Online Logo"
                className="h-12 md:h-14 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-surface-variant max-w-sm text-sm leading-relaxed">
              We don&apos;t teach the syllabus. We teach the mark scheme.
              Specialising in IGCSE and A-Level preparations for high-stakes
              exam excellence across the GCC and Asia.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1 font-['IBM_Plex_Mono'] text-xs text-primary-fixed uppercase tracking-wider">
              <span className="px-3.5 py-1.5 bg-white/5 rounded-full border border-white/15 hover:border-primary-container/50 hover:bg-primary-container/10 transition-all duration-200 cursor-default">
                IGCSE
              </span>
              <span className="px-3.5 py-1.5 bg-white/5 rounded-full border border-white/15 hover:border-primary-container/50 hover:bg-primary-container/10 transition-all duration-200 cursor-default">
                A-LEVELS
              </span>
              <span className="px-3.5 py-1.5 bg-white/5 rounded-full border border-white/15 hover:border-primary-container/50 hover:bg-primary-container/10 transition-all duration-200 cursor-default">
                IB DIPLOMA
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="https://www.instagram.com/alineaonline"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-surface-variant hover:text-primary-container hover:border-primary-container/50 hover:bg-primary-container/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <svg
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
              <a
                href="https://wa.me/+923322348565"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-surface-variant hover:text-success hover:border-success/50 hover:bg-success/10 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-4.5 h-4.5"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 flex flex-col gap-4">
            <h4 className="font-['Archivo_Black'] text-sm text-primary-container uppercase tracking-widest mb-1">
              Navigation
            </h4>
            <nav className="flex flex-col gap-3">
              <Link
                href="/"
                className="text-surface-variant text-sm hover:text-primary-container hover:translate-x-1 transition-all duration-200 w-max"
              >
                Home
              </Link>
              <Link
                href="/subjects"
                className="text-surface-variant text-sm hover:text-primary-container hover:translate-x-1 transition-all duration-200 w-max"
              >
                Subjects & Syllabus
              </Link>
              <Link
                href="/blog"
                className="text-surface-variant text-sm hover:text-primary-container hover:translate-x-1 transition-all duration-200 w-max"
              >
                Blog & Exam Guides
              </Link>
              <Link
                href="/booking"
                className="text-surface-variant text-sm hover:text-primary-container hover:translate-x-1 transition-all duration-200 w-max"
              >
                Book a Session
              </Link>
            </nav>
          </div>

          {/* Contact & WhatsApp */}
          <div className="md:col-span-4 flex flex-col gap-5">
            <h4 className="font-['Archivo_Black'] text-sm text-primary-container uppercase tracking-widest mb-1">
              Get In Touch
            </h4>
            <p className="text-surface-variant text-sm leading-relaxed">
              Ready to secure top grades? Speak with our academic coordinators
              directly via WhatsApp or schedule a call.
            </p>
            <a
              href="https://wa.me/+923322348565"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-success text-white font-['Work_Sans'] font-bold text-sm px-6 py-3.5 rounded-full border-2 border-success hover:bg-success-dark hover:border-success-dark transition-all duration-200 shadow-lg shadow-success/20 hover:shadow-success/40 hover:-translate-y-0.5 w-max"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Academic Team
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-container-max mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between text-xs text-muted gap-4">
          <p>
            © {new Date().getFullYear()} Alinea Online Academy. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6 font-['IBM_Plex_Mono']">
            <Link
              href="/subjects"
              className="hover:text-primary-container transition-colors"
            >
              Terms
            </Link>
            <Link
              href="/subjects"
              className="hover:text-primary-container transition-colors"
            >
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">
              powered by{" "}
              <Link
                href="https://hayyantahirr.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-container/70 hover:text-primary-container transition-colors font-semibold"
              >
                hayyantahirr
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
