import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-0 flex items-center bg-vantos-dark overflow-hidden">
      {/* Luces ambientales (blur extremo, baja opacidad) */}
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full blur-3xl opacity-[0.12] bg-indigo-500 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl opacity-[0.08] bg-slate-400 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute top-1/2 right-1/4 w-[300px] h-[300px] rounded-full blur-3xl opacity-[0.06] bg-vantos-gold pointer-events-none"
        aria-hidden
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Columna izquierda: texto */}
          <div className="space-y-4">
            <p className="text-xs font-sans font-medium tracking-[0.25em] text-vantos-gold uppercase">
              Suite Financiera Integral
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
              Domina tu Patrimonio, Diseña tu{" "}
              <span className="bg-gradient-to-r from-vantos-gold via-amber-200 to-vantos-gold bg-clip-text text-transparent">
                Libertad
              </span>
            </h1>
            <p className="text-slate-400 font-sans text-base lg:text-lg max-w-xl leading-relaxed">
              Simula hipotecas, proyecta inversiones y planifica ahorros en segundos. Sin fórmulas ocultas: números claros y decisiones basadas en datos.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
              <Link
                href="/herramientas/hipoteca"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-vantos-gold hover:text-vantos-dark hover:border-vantos-gold transition-all duration-300"
              >
                Simular Hipoteca
              </Link>
              <Link
                href="/herramientas/inversion"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-vantos-gold hover:text-vantos-dark hover:border-vantos-gold transition-all duration-300"
              >
                Calculadora Inversión
              </Link>
              <Link
                href="/herramientas/ahorro"
                className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-vantos-gold hover:text-vantos-dark hover:border-vantos-gold transition-all duration-300"
              >
                Planificar Ahorro
              </Link>
            </div>
            <Link
              href="/como-funciona"
              className="block mt-8 text-lg text-white/60 hover:text-vantos-gold hover:underline underline-offset-8 transition-colors"
            >
              ¿Cómo funciona el método Vantos?
            </Link>
          </div>

          {/* Columna derecha: beneficios con iconos Check */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
              <ul className="space-y-6">
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vantos-gold/20">
                    <svg className="h-5 w-5 text-vantos-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-200 font-medium">Amortización Inteligente</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vantos-gold/20">
                    <svg className="h-5 w-5 text-vantos-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-200 font-medium">Interés Compuesto</span>
                </li>
                <li className="flex items-center gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vantos-gold/20">
                    <svg className="h-5 w-5 text-vantos-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  <span className="text-slate-200 font-medium">Proyección a 30 años</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
