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
    { name: "Our Faculty", href: "/faculty" },
    { name: "Subjects", href: "/subjects" },
    { name: "Blog & Resources", href: "/blog" },
    { name: "Contact", href: "/contact" },
    { name: "Become a Teacher", href: "/careers" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background border-b-2 border-on-background shadow-[0_3px_0_0_var(--color-on-background)]">
      <div className="max-w-container-max mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Alinea Online Logo"
            className="h-10 md:h-15 w-auto object-contain"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 font-['Work_Sans'] font-semibold text-3.625">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isExternal =
              link.href.startsWith("http") || link.href.startsWith("mailto");
            return (
              <Link
                key={link.href}
                href={link.href}
                target={
                  isExternal && link.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  isExternal && link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`transition-colors py-1 ${
                  isActive
                    ? "text-on-background border-b-2 border-primary-container font-bold"
                    : "text-on-surface-variant hover:text-on-background"
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
            className="bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-3.75 px-6 py-3 rounded-full border-1.5 border-on-background neo-brutalist-shadow transition-transform duration-200 hover:-translate-y-0.5"
          >
            Book a Session
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg border border-on-background bg-surface-container text-on-background"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t-2 border-on-background bg-background px-6 py-6 flex flex-col gap-4 font-['Work_Sans'] font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isExternal =
              link.href.startsWith("http") || link.href.startsWith("mailto");
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                target={
                  isExternal && link.href.startsWith("http")
                    ? "_blank"
                    : undefined
                }
                rel={
                  isExternal && link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className={`py-2 px-3 rounded-lg text-lg ${
                  isActive
                    ? "bg-primary-container text-on-background font-bold"
                    : "text-on-background hover:bg-surface-container"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            href="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-2 text-center bg-primary-container text-on-background font-['Work_Sans'] font-extrabold text-3.75 px-6 py-3 rounded-full border-1.5 border-on-background neo-brutalist-shadow"
          >
            Book a Session
          </Link>
        </div>
      )}
    </header>
  );
}
