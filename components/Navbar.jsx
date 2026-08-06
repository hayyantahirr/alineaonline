"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Subjects", href: "/subjects" },
    { name: "Blog & Resources", href: "/blog" },
    { name: "Book a Session", href: "/booking" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#f8f9fa] border-b-2 border-[#191c1d] shadow-[0_3px_0_0_#191c1d]">
      <div className="max-w-[1180px] mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/stitch/logo.png"
            alt="Alinea Online Logo"
            className="h-8 md:h-10 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-['Work_Sans'] font-semibold text-[14.5px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-[#191c1d] border-b-2 border-[#ffd400] font-bold"
                    : "text-[#4d4632] hover:text-[#191c1d]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-4">
          <Link
            href="/booking"
            className="bg-[#ffd400] text-[#191c1d] font-['Work_Sans'] font-extrabold text-[15px] px-6 py-3 rounded-full border-[1.5px] border-[#191c1d] neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-[#191c1d] bg-[#edeeef] text-[#191c1d]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-[#191c1d] bg-[#f8f9fa] px-6 py-6 flex flex-col gap-4 font-['Work_Sans'] font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg text-lg ${
                  isActive
                    ? "bg-[#ffd400] text-[#191c1d] font-bold"
                    : "text-[#191c1d] hover:bg-[#edeeef]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center bg-[#ffd400] text-[#191c1d] font-['Work_Sans'] font-extrabold text-[15px] px-6 py-3 rounded-full border-[1.5px] border-[#191c1d] neo-brutalist-shadow"
          >
            Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}
