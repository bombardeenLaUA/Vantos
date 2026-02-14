"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/herramientas/hipoteca", label: "Hipoteca" },
  { href: "/herramientas/inversion", label: "Inversión" },
  { href: "/herramientas/ahorro", label: "Ahorro" },
  { href: "/estrategia", label: "Estrategia" },
  { href: "/como-funciona", label: "Cómo funciona" },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-vantos-dark/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Image
                src="/images/vantos.png"
                alt="Vantos"
                width={120}
                height={32}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
          </div>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-4 sm:gap-6 flex-wrap">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden p-2 text-white/80 hover:text-vantos-gold transition-colors"
            aria-label="Abrir menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-vantos-dark/98 backdrop-blur-xl md:hidden"
          aria-modal="true"
          role="dialog"
        >
          <div className="flex flex-col h-full">
            <div className="flex justify-end p-4">
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="p-2 text-white/80 hover:text-vantos-gold transition-colors"
                aria-label="Cerrar menú"
              >
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-8 font-serif text-3xl text-white">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-white hover:text-vantos-gold transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
