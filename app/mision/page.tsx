import Link from "next/link";

export default function MisionPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <h1 className="font-serif text-4xl lg:text-5xl text-white mb-6 leading-tight">
            La Banca juega con la opacidad. Nosotros jugamos con la claridad.
          </h1>
          <p className="text-slate-400 text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed">
            Vantos no es un banco. Es la herramienta que ojalá hubiera tenido antes de firmar mi hipoteca.
          </p>
        </section>

        {/* La Historia */}
        <section className="mb-16">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 shadow-xl">
            <h2 className="font-serif text-2xl text-vantos-gold mb-6 text-center">La Historia</h2>
            <p className="text-slate-300 text-center leading-relaxed max-w-2xl mx-auto">
              Nació de la frustración. Los simuladores del banco solo me decían la cuota mensual, pero escondían el coste
              real a 30 años y el coste de oportunidad de no invertir. Como programador, decidí construir mi propia
              calculadora. Lo que empezó como un Excel personal, ahora es una suite gratuita para todos.
            </p>
          </div>
        </section>

        {/* Los 3 Pilares */}
        <section className="mb-16">
          <h2 className="font-serif text-2xl text-vantos-gold mb-6 text-center">Los 3 Pilares</h2>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-white text-lg mb-3">Privacidad Radical</h3>
              <p className="text-slate-300 leading-relaxed">
                Sin base de datos. Tus ahorros y deudas se calculan en tu navegador y desaparecen al cerrar la pestaña.
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-white text-lg mb-3">Matemática Pura</h3>
              <p className="text-slate-300 leading-relaxed">
                Sin comisiones ocultas ni productos propios. Solo fórmulas financieras estándar (Método Francés).
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
              <h3 className="font-bold text-white text-lg mb-3">Independencia</h3>
              <p className="text-slate-300 leading-relaxed">
                No vendemos hipotecas. Te damos los datos para que tú negocies mejor.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="text-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-vantos-gold text-vantos-dark font-semibold hover:bg-vantos-gold/90 transition-all shadow-lg hover:shadow-xl"
          >
            Volver a las Herramientas
          </Link>
        </section>
      </div>
    </div>
  );
}
