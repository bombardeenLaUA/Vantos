import Link from "next/link";

export default function Home() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-vantos-dark overflow-hidden">
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna izquierda: texto */}
          <div className="space-y-6">
            <p className="text-xs font-sans font-medium tracking-[0.25em] text-vantos-gold uppercase">
              Estrategia Hipotecaria
            </p>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-white leading-[1.1]">
              Domina tu Deuda, Diseña tu{" "}
              <span className="bg-gradient-to-r from-vantos-gold via-amber-200 to-vantos-gold bg-clip-text text-transparent">
                Libertad
              </span>
            </h1>
            <p className="text-slate-400 font-sans text-base lg:text-lg max-w-xl leading-relaxed">
              Simula en segundos si te conviene amortizar o invertir. Sin fórmulas ocultas: números claros y una recomendación basada en tu caso.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/herramientas/hipoteca"
                className="inline-flex items-center justify-center rounded-xl bg-vantos-gold px-6 py-3 text-sm font-semibold text-vantos-dark shadow-lg shadow-vantos-gold/20 hover:bg-amber-200 transition-colors"
              >
                Simular Ahorro
              </Link>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white/90 hover:bg-white/5 hover:border-white/30 transition-colors"
              >
                Cómo funciona
              </a>
            </div>
          </div>

          {/* Columna derecha: tarjeta glassmorphism + dato */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl p-8">
              <p className="text-xs font-sans font-medium tracking-wider text-slate-400 uppercase mb-1">
                Ahorro Proyectado
              </p>
              <p className="font-serif text-5xl font-semibold text-white tracking-tight mb-6">
                47.200 €
              </p>
              <p className="text-sm text-slate-400 font-sans mb-6">
                Ejemplo en 25 años con una amortización puntual
              </p>
              {/* Gráfico decorativo simple (barras CSS) */}
              <div className="flex items-end gap-2 h-24" aria-hidden>
                <div
                  className="flex-1 rounded-t bg-white/20 min-h-[20%]"
                  style={{ height: "30%" }}
                />
                <div
                  className="flex-1 rounded-t bg-white/25 min-h-[20%]"
                  style={{ height: "50%" }}
                />
                <div
                  className="flex-1 rounded-t bg-white/30 min-h-[20%]"
                  style={{ height: "75%" }}
                />
                <div
                  className="flex-1 rounded-t bg-vantos-gold/60 min-h-[20%]"
                  style={{ height: "100%" }}
                />
                <div
                  className="flex-1 rounded-t bg-white/20 min-h-[20%]"
                  style={{ height: "45%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
