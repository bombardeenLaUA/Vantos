"use client";

import { useState, useEffect } from "react";
import LuxuryAreaChart from "@/components/ui/LuxuryAreaChart";
import ConsultationCTA from "@/components/ui/ConsultationCTA";
import LegalNotice from "@/components/ui/LegalNotice";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

export default function InversionToolPage() {
  const [initial, setInitial] = useState(10000);
  const [monthly, setMonthly] = useState(500);
  const [years, setYears] = useState(20);
  const [returnRate, setReturnRate] = useState(6);
  const [chartData, setChartData] = useState<{ year: number; value: number }[]>([]);
  const [capitalFinal, setCapitalFinal] = useState(0);
  const [totalIntereses, setTotalIntereses] = useState(0);

  useEffect(() => {
    const monthlyRate = returnRate / 100 / 12;
    const totalMonths = years * 12;
    const data: { year: number; value: number }[] = [];
    let capital = initial;

    for (let month = 1; month <= totalMonths; month++) {
      capital = capital * (1 + monthlyRate) + monthly;
      if (month % 12 === 0) {
        data.push({ year: month / 12, value: Math.round(capital * 100) / 100 });
      }
    }

    setChartData(data);
    const totalAportado = initial + monthly * totalMonths;
    setCapitalFinal(Math.round(capital * 100) / 100);
    setTotalIntereses(Math.round((capital - totalAportado) * 100) / 100);
  }, [initial, monthly, years, returnRate]);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="flex-1 bg-vantos-dark pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-[1200px] mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4 leading-tight">
          Proyección de Inversión
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Simula el crecimiento de tu capital con interés compuesto y aportaciones periódicas.
        </p>

        <div className="bg-slate-900/50 rounded-3xl shadow-2xl overflow-hidden border border-white/10 p-6 md:p-8">
          <div className="grid lg:grid-cols-12 gap-8 items-stretch">
            {/* Configuración - Card encapsulada como en Hipoteca */}
            <div className="lg:col-span-4 h-full">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl h-full flex flex-col">
                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-100 font-sans tracking-wide mb-4">Configuración</h2>
                  <p className="text-xs text-gray-400 -mt-2 font-sans">Ajusta tus parámetros.</p>
                </div>
                <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Inversión Inicial (€)
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50">
                  <Input
                    type="number"
                    value={initial}
                    onChange={(e) => setInitial(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-xl font-bold text-white p-0 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                  />
                </div>
                <Slider
                  value={[initial]}
                  min={0}
                  max={200000}
                  step={1000}
                  onValueChange={(v) => setInitial(v[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Aportación Mensual (€)
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50">
                  <Input
                    type="number"
                    value={monthly}
                    onChange={(e) => setMonthly(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-xl font-bold text-white p-0 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                  />
                </div>
                <Slider
                  value={[monthly]}
                  min={0}
                  max={5000}
                  step={50}
                  onValueChange={(v) => setMonthly(v[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Años
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50">
                  <Input
                    type="number"
                    value={years}
                    onChange={(e) => setYears(Math.min(40, Math.max(1, Number(e.target.value) || 1)))}
                    className="bg-transparent border-none text-xl font-bold text-white p-0 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                  />
                </div>
                <Slider
                  value={[years]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(v) => setYears(v[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rentabilidad Anual (%)
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50">
                  <Input
                    type="number"
                    step={0.5}
                    value={returnRate}
                    onChange={(e) => setReturnRate(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-xl font-bold text-white p-0 h-auto focus-visible:ring-0 placeholder:text-slate-500"
                  />
                </div>
                <Slider
                  value={[returnRate]}
                  min={0}
                  max={15}
                  step={0.5}
                  onValueChange={(v) => setReturnRate(v[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>
                </div>
              </div>
            </div>

            {/* Visualización */}
            <div className="lg:col-span-8 space-y-6">
              {/* KPIs */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Capital Final
                  </p>
                  <p className="text-3xl lg:text-4xl font-bold text-vantos-gold">
                    {formatMoney(capitalFinal)}
                  </p>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                  <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">
                    Total Intereses Generados
                  </p>
                  <p className="text-3xl lg:text-4xl font-bold text-slate-100">
                    {formatMoney(totalIntereses)}
                  </p>
                </div>
              </div>

              <a
                href="https://traderepublic.com/es-es"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl border border-yellow-500/50 text-yellow-500 hover:bg-yellow-500 hover:text-black transition-all font-medium text-sm inline-flex items-center justify-center"
              >
                🚀 Empieza a generar este interés compuesto hoy
              </a>

              {/* Gráfico */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
                <h3 className="font-bold text-slate-100 mb-4">Evolución del Capital</h3>
                {chartData.length > 0 && (
                  <LuxuryAreaChart
                    data={chartData}
                    primaryKey="value"
                    formatValue={(v) => formatMoney(v)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <ConsultationCTA />
        <LegalNotice />
      </div>
    </div>
  );
}
