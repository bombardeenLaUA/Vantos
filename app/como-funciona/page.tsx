import Link from "next/link";

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-32 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="font-serif text-5xl text-vantos-gold mb-4">
          Próximamente
        </h1>
        <p className="text-gray-400 text-lg">
          Estamos construyendo esta herramienta.
        </p>
        <Link
          href="/"
          className="mt-8 inline-block bg-vantos-gold text-vantos-dark px-6 py-3 rounded-xl font-bold hover:bg-amber-200 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
