import type { Metadata } from "next";
import { Suspense } from "react";
import MortgageCalculator from "@/components/MortgageCalculator";
import ConsultationCTA from "@/components/ui/ConsultationCTA";
import LegalNotice from "@/components/ui/LegalNotice";

export const metadata: Metadata = {
  title: "Simulador de Estrategia Hipotecaria | VANTOS",
  description:
    "Calculadora avanzada para decidir si amortizar hipoteca o invertir. Simula escenarios de ahorro y estrategia con datos claros.",
};

export default function HipotecaToolPage() {
  return (
    <div className="flex-1 bg-vantos-dark pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-[1600px] mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4 leading-tight">
          Simulador de Estrategia Hipotecaria
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Analiza el impacto de tus amortizaciones con precisión matemática.
        </p>
        <div className="bg-slate-900/50 rounded-3xl shadow-2xl overflow-hidden border border-white/10 p-6 md:p-8">
          <section aria-label="Simulador hipotecario">
            <Suspense
              fallback={
                <div className="w-full h-[600px] rounded-3xl bg-white/5 flex items-center justify-center">
                  <span className="text-slate-400 animate-pulse">Cargando simulador...</span>
                </div>
              }
            >
              <MortgageCalculator />
            </Suspense>
          </section>
        </div>
        <ConsultationCTA />
        <LegalNotice />
      </div>
    </div>
  );
}

