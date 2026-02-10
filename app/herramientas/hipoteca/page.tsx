import type { Metadata } from "next";
import { Suspense } from "react";
import MortgageCalculator from "@/components/MortgageCalculator";

export const metadata: Metadata = {
  title: "Simulador de Estrategia Hipotecaria | VANTOS",
  description:
    "Calculadora avanzada para decidir si amortizar hipoteca o invertir. Simula escenarios de ahorro y estrategia con datos claros.",
};

export default function HipotecaToolPage() {
  return (
    <div className="max-w-[1600px] mx-auto my-12 px-4 sm:px-6">
      <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12">
        <h1 className="font-serif text-slate-900 text-4xl md:text-5xl font-semibold tracking-tight mb-2">
          Simulador de Estrategia Hipotecaria
        </h1>
        <p className="text-slate-500 font-sans text-base md:text-lg mb-1">
          Compara amortizar, reducir plazo o invertir tu capital con datos claros en una sola pantalla.
        </p>
        <p className="text-slate-400 font-sans text-sm mb-8">
          Introduce los datos actuales de tu préstamo para simular escenarios de ahorro.
        </p>
        <section aria-label="Simulador hipotecario">
          <Suspense
            fallback={
              <div className="w-full h-[600px] rounded-3xl bg-slate-50 flex items-center justify-center">
                <span className="text-slate-400 animate-pulse">Cargando simulador...</span>
              </div>
            }
          >
            <MortgageCalculator />
          </Suspense>
        </section>
      </div>
    </div>
  );
}

