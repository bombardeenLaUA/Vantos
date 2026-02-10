import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-vantos-dark/95 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/vantos.png"
            alt="Vantos"
            width={120}
            height={32}
            className="h-8 w-auto object-contain brightness-0 invert"
          />
        </div>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/herramientas/hipoteca"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
          >
            Herramientas
          </Link>
          <Link
            href="#"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
          >
            Estrategia
          </Link>
        </nav>
      </div>
    </header>
  );
}

