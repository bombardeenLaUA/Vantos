export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-vantos-dark text-slate-400 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-serif text-sm text-white">Vantos</p>
          <p className="text-[11px]">
            Tu patrimonio, optimizado.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-1">
          <div className="flex gap-4">
            <a href="#" className="hover:text-vantos-gold transition-colors">
              Aviso Legal
            </a>
            <a href="#" className="hover:text-vantos-gold transition-colors">
              Privacidad
            </a>
          </div>
          <p className="text-[11px] mt-1">
            © {year} Vantos Financial Tech.
          </p>
        </div>
      </div>
    </footer>
  );
}

