"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import ConsultationCTA from "@/components/ui/ConsultationCTA";
import LegalNotice from "@/components/ui/LegalNotice";
import { Slider } from "@/components/ui/slider";

export default function AhorroToolPage() {
  const [objetivo, setObjetivo] = useState(50000);
  const [actual, setActual] = useState(10000);
  const [mensual, setMensual] = useState(500);
  const [tiempoRestante, setTiempoRestante] = useState<{ años: number; meses: number } | null>(null);
  const [porcentaje, setPorcentaje] = useState(0);

  useEffect(() => {
    if (mensual <= 0 || objetivo <= 0) {
      setTiempoRestante(null);
      setPorcentaje(Math.min(100, (actual / objetivo) * 100));
      return;
    }
    const restante = objetivo - actual;
    if (restante <= 0) {
      setTiempoRestante({ años: 0, meses: 0 });
      setPorcentaje(100);
      return;
    }
    const mesesRestantes = Math.ceil(restante / mensual);
    setTiempoRestante({
      años: Math.floor(mesesRestantes / 12),
      meses: mesesRestantes % 12,
    });
    setPorcentaje(Math.min(100, (actual / objetivo) * 100));
  }, [objetivo, actual, mensual]);

  const formatMoney = (val: number) =>
    new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "EUR",
      maximumFractionDigits: 0,
    }).format(val);

  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-12 px-4 sm:px-6">
      <div className="max-w-[800px] mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-4 leading-tight">
          Objetivo de Ahorro
        </h1>
        <p className="text-gray-400 text-lg mb-8">
          Calcula cuánto tiempo te queda para alcanzar tu meta de ahorro.
        </p>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-white/10 p-6 md:p-8">
          <div className="space-y-8">
            {/* Inputs */}
            <div className="grid sm:grid-cols-1 gap-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Objetivo (Meta en €)
                </label>
                <div className="bg-slate-50 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50">
                  <Input
                    type="number"
                    value={objetivo}
                    onChange={(e) => setObjetivo(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <Slider
                  value={[objetivo]}
                  min={1000}
                  max={500000}
                  step={1000}
                  onValueChange={(v) => setObjetivo(v[0])}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ahorro Actual (€)
                </label>
                <div className="bg-slate-50 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50">
                  <Input
                    type="number"
                    value={actual}
                    onChange={(e) => setActual(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <Slider
                  value={[actual]}
                  min={0}
                  max={objetivo}
                  step={500}
                  onValueChange={(v) => setActual(v[0])}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Ahorro Mensual (€)
                </label>
                <div className="bg-slate-50 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50">
                  <Input
                    type="number"
                    value={mensual}
                    onChange={(e) => setMensual(Number(e.target.value) || 0)}
                    className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0"
                  />
                </div>
                <Slider
                  value={[mensual]}
                  min={0}
                  max={5000}
                  step={50}
                  onValueChange={(v) => setMensual(v[0])}
                />
              </div>
            </div>

            {/* Barra de Progreso Premium */}
            <div className="space-y-4">
              <div
                className="h-8 rounded-full bg-slate-100 overflow-hidden"
                role="progressbar"
                aria-valuenow={porcentaje}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-vantos-gold transition-all duration-700 ease-out"
                  style={{ width: `${Math.min(100, porcentaje)}%` }}
                />
              </div>
              <p className="text-slate-600 text-center font-medium">
                Has completado el{" "}
                <span className="font-bold text-vantos-gold">
                  {porcentaje.toFixed(1)}%
                </span>{" "}
                de tu objetivo.
              </p>
            </div>

            {/* Resultado: Tiempo restante */}
            {tiempoRestante !== null && (
              <div className="bg-vantos-dark rounded-2xl p-6 text-center">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider mb-2">
                  Tiempo restante estimado
                </p>
                <p className="text-3xl font-bold text-vantos-gold">
                  {tiempoRestante.años > 0 && `${tiempoRestante.años} año${tiempoRestante.años !== 1 ? "s" : ""} `}
                  {tiempoRestante.meses > 0 && `${tiempoRestante.meses} mes${tiempoRestante.meses !== 1 ? "es" : ""}`}
                  {tiempoRestante.años === 0 && tiempoRestante.meses === 0 && "¡Objetivo alcanzado!"}
                </p>
                <p className="text-slate-500 text-sm mt-2">
                  Con {formatMoney(mensual)}/mes hacia tu meta de {formatMoney(objetivo)}
                </p>
              </div>
            )}
          </div>
        </div>
        <ConsultationCTA />
        <LegalNotice />
      </div>
    </div>
  );
}
