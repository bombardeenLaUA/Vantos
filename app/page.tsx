import MortgageCalculator from "@/components/MortgageCalculator";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="container mx-auto max-w-6xl px-4 py-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.5fr] items-start">
          <header className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              Simulador de Estrategia Hipotecaria Vantos
            </h1>
            <p className="max-w-xl text-sm text-slate-500 sm:text-base">
              Una única pantalla, toda la claridad que necesitas para decidir si amortizar, reducir
              plazo o invertir tu capital.
            </p>
          </header>

          <section aria-label="Simulador hipotecario">
            <MortgageCalculator />
          </section>
        </div>
      </div>
    </main>
  );
}
