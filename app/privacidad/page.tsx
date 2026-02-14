import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-32 px-6 pb-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-white mb-6">Política de Privacidad</h1>
        <div className="text-slate-400 text-lg leading-relaxed space-y-4">
          <p>
            Este es un texto placeholder para la Política de Privacidad. La información sobre el tratamiento de datos personales se incorporará próximamente.
          </p>
          <p>
            Vantos Financial Tech se compromete a proteger la privacidad de sus usuarios conforme a la normativa vigente.
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
