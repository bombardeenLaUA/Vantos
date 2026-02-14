import Link from "next/link";

export default function EstrategiaPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-32 px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-4xl text-white mb-6">
          El Método Vantos
        </h1>
        <p className="text-slate-400 text-lg leading-relaxed mb-8">
          Estamos preparando una guía detallada para ayudarte a dominar las matemáticas de tu patrimonio. Mientras tanto, usa nuestros simuladores gratuitos.
        </p>
        <Link
          href="/herramientas/hipoteca"
          className="inline-block border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          Ir a Herramientas
        </Link>
      </div>
    </div>
  );
}
