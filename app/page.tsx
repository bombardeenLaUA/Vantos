import Link from "next/link";
import { Home as HomeIcon, Banknote, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        {/* Hero */}
        <section className="mb-10">
          <h1 className="font-serif text-slate-900 text-4xl md:text-5xl font-semibold tracking-tight">
            Tu Patrimonio, Optimizado
          </h1>
          <p className="mt-3 text-slate-500 font-sans text-base md:text-lg max-w-2xl">
            Centraliza tus decisiones financieras en una sola suite: simuladores claros, datos fiables y foco en el ahorro real.
          </p>
        </section>

        {/* Bento grid de herramientas */}
        <section aria-label="Herramientas financieras" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tarjeta 1: Simulador Hipotecario */}
          <Link
            href="/herramientas/hipoteca"
            className="group rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow border border-slate-100 p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white">
                <HomeIcon className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-emerald-600">
                Activo
              </span>
            </div>
            <div>
              <h2 className="font-sans text-lg font-semibold text-slate-900 mb-1">
                Simulador Hipotecario
              </h2>
              <p className="text-sm text-slate-500">
                Decide si amortizar, reducir plazo o invertir tu capital con una vista estratégica clara.
              </p>
            </div>
            <p className="mt-4 text-sm font-medium text-slate-900 group-hover:text-slate-700">
              Abrir herramienta →
            </p>
          </Link>

          {/* Tarjeta 2: Sueldo Neto (Próximamente) */}
          <div className="rounded-2xl bg-white/70 border border-dashed border-slate-200 p-6 flex flex-col justify-between opacity-80">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <Banknote className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">
                Próximamente
              </span>
            </div>
            <div>
              <h2 className="font-sans text-lg font-semibold text-slate-700 mb-1">
                Sueldo Neto
              </h2>
              <p className="text-sm text-slate-400">
                Calcula tu sueldo neto real tras impuestos y cotizaciones para planificar mejor tu ahorro.
              </p>
            </div>
          </div>

          {/* Tarjeta 3: Interés Compuesto (Próximamente) */}
          <div className="rounded-2xl bg-white/70 border border-dashed border-slate-200 p-6 flex flex-col justify-between opacity-80">
            <div className="flex items-center justify-between mb-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                <TrendingUp className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-slate-400 border border-slate-200 rounded-full px-2 py-0.5">
                Próximamente
              </span>
            </div>
            <div>
              <h2 className="font-sans text-lg font-semibold text-slate-700 mb-1">
                Interés Compuesto
              </h2>
              <p className="text-sm text-slate-400">
                Proyecta el crecimiento de tus inversiones a largo plazo con simulaciones de interés compuesto.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
