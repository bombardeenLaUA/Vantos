import { Suspense } from 'react';
import Image from "next/image";
import MortgageCalculator from "@/components/MortgageCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-[1800px] px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col xl:flex-row xl:gap-12 gap-10 items-stretch">

          {/* Sidebar de marca (sticky en desktop) */}
          <aside className="xl:w-[300px] xl:flex-shrink-0 xl:sticky xl:top-8 flex flex-col">
            <header className="mb-6">
            <Image
              src="/nombre-de-tu-imagen.png"
              alt="Logo Vantos"
              width={550}
              height={138}
              className="w-full h-auto object-contain rounded-lg"
            />
            </header>
            <h1 className="font-serif text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
              Simulador de Estrategia Hipotecaria
            </h1>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed">
              Compara amortizar, reducir plazo o invertir tu capital con datos claros en una sola pantalla.
            </p>
          </aside>

          {/* Área principal: calculadora */}
          <section
            aria-label="Simulador hipotecario"
            className="flex-1 min-w-0"
          >
            <Suspense fallback={
              <div className="w-full h-[600px] bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center">
                <span className="text-slate-400 animate-pulse">Cargando simulador...</span>
              </div>
            }>
              <MortgageCalculator />
            </Suspense>
          </section>

        </div>
      </div>
    </main>
  );
}
