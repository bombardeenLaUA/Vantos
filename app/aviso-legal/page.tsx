import Link from "next/link";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-32 px-6 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-white mb-6">Aviso Legal</h1>
        <div className="text-slate-400 text-lg leading-relaxed space-y-4">
          <p>
            Este es un texto placeholder para el Aviso Legal. La información legal completa se incorporará próximamente.
          </p>
          <p>
            Vantos Financial Tech se reserva el derecho de actualizar este aviso según la normativa aplicable.
          </p>
        </div>
        <Link
          href="/"
          className="mt-8 inline-block border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
