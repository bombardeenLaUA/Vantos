import Link from "next/link";
import Image from "next/image";

export default function Header() {
  return (
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
            href="/estrategia"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
          >
            Estrategia
          </Link>
          <Link
            href="/como-funciona"
            className="text-sm font-medium tracking-wide text-white/80 hover:text-vantos-gold transition-colors"
          >
            Cómo funciona
          </Link>
        </nav>
      </div>
    </header>
  );
}

