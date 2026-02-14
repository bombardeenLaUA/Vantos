"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  TrendingUp,
  DollarSign,
  Table as TableIcon,
  ArrowDownCircle,
  ArrowUpCircle,
  ChevronDown,
} from "lucide-react";
import LuxuryAreaChart from "@/components/ui/LuxuryAreaChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  getAmortizationTable,
  getStrategicComparison,
  getMortgageChartData,
  type StrategicComparisonResult,
} from "@/lib/finance";

const formSchema = z.object({
  principal: z.number().min(1000, "La deuda mínima es 1.000€"),
  rate: z.number().min(0).max(15, "El interés máximo es 15%"),
  years: z.number().min(1).max(40, "El plazo máximo son 40 años"),
  lumpSumPayment: z.number().min(0, "Debe ser ≥ 0").default(0),
  investmentRate: z.number().min(0).max(20).default(3.5),
  amortizationType: z.enum(["reduce_payment", "reduce_term"]).default("reduce_term"),
});

type FormValues = z.infer<typeof formSchema>;

const SAFE_RATE = 3.0; // Rentabilidad segura del mercado (ej. cuentas remuneradas)

export default function MortgageCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    schedule: { year: number; balance: number }[];
    yearlyTable: { year: number; interest: number; principal: number; balance: number; rowNum: number }[];
  } | null>(null);
  const [strategic, setStrategic] = useState<StrategicComparisonResult | null>(null);
  const [chartData, setChartData] = useState<{ year: number; saldoBanco: number; saldoEstrategia: number }[]>([]);

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      principal: Number(searchParams.get("debt")) || 200000,
      rate: Number(searchParams.get("rate")) || 3.5,
      years: Number(searchParams.get("years")) || 25,
      lumpSumPayment: Number(searchParams.get("lumpSum")) || 0,
      investmentRate: Number(searchParams.get("investmentRate")) || 3.5,
      amortizationType: (searchParams.get("amortizationType") as "reduce_payment" | "reduce_term") || "reduce_term",
    },
  });

  const calculate = (values: FormValues) => {
    try {
      const principal = values.principal;
      const rate = values.rate;
      const years = values.years;
      const termMonths = years * 12;

      const amort = getAmortizationTable(principal, rate, termMonths);
      const schedule: { year: number; balance: number }[] = [];
      const yearlyTable: { year: number; interest: number; principal: number; balance: number; rowNum: number }[] = [];
      let currentYear = new Date().getFullYear();
      let yearInterest = 0;
      let yearPrincipal = 0;

      for (let i = 0; i < amort.table.length; i++) {
        const row = amort.table[i];
        yearInterest += row.interest;
        yearPrincipal += row.principal;
        if (row.month % 12 === 0 || row.month === amort.table.length) {
          schedule.push({ year: Math.round(row.month / 12), balance: row.balance });
          yearlyTable.push({
            year: currentYear,
            interest: yearInterest,
            principal: yearPrincipal,
            balance: row.balance,
            rowNum: Math.ceil(row.month / 12),
          });
          currentYear++;
          yearInterest = 0;
          yearPrincipal = 0;
        }
      }

      setData({
        monthlyPayment: amort.monthlyPayment,
        totalInterest: amort.totalInterest,
        totalPayment: amort.monthlyPayment * termMonths,
        schedule,
        yearlyTable,
      });

      const comparison = getStrategicComparison({
        debt: principal,
        annualRate: rate,
        termMonths,
        lumpSumPayment: values.lumpSumPayment,
        investmentRate: values.investmentRate,
        amortizationType: values.amortizationType,
      });
      setStrategic(comparison);

      const cd = getMortgageChartData(
        values.principal,
        values.rate,
        termMonths,
        values.lumpSumPayment,
        values.amortizationType
      );
      setChartData(cd);

      const params = new URLSearchParams();
      params.set("debt", values.principal.toString());
      params.set("rate", values.rate.toString());
      params.set("years", values.years.toString());
      if (values.lumpSumPayment > 0) params.set("lumpSum", values.lumpSumPayment.toString());
      if (values.investmentRate !== 3.5) params.set("investmentRate", values.investmentRate.toString());
      params.set("amortizationType", values.amortizationType);
      router.replace(`?${params.toString()}`, { scroll: false });
    } catch (error) {
      console.error("Error de cálculo", error);
    }
  };

  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.principal && value.rate && value.years) {
        calculate(value as FormValues);
      }
    });
    return () => subscription.unsubscribe();
  }, [form.watch]);

  useEffect(() => {
    calculate(form.getValues());
  }, []);

  const formatMoney = (val: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full">
      <div className="grid grid-cols-12 gap-6 lg:gap-8 items-start">
        {/* COLUMNA 1: Configuración (lg:col-span-3) - alineada al inicio con la columna de resultados */}
        <div className="col-span-12 lg:col-span-3 space-y-6 lg:self-start">
          <div className="bg-white/5 rounded-3xl p-6 shadow-sm lg:sticky lg:top-8 border border-white/10">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 font-sans tracking-wide">
              <span className="bg-black/20 p-2 rounded-lg text-vantos-gold"><DollarSign className="w-5 h-5"/></span>
              Configuración
            </h2>
            <p className="text-xs text-gray-400 mb-4 font-sans">Ajusta tus parámetros actuales.</p>

            <div className="space-y-6">
              {/* Input: Deuda */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Deuda Pendiente (Capital Vivo)</label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      {...form.register("principal", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold text-white p-0 h-auto focus-visible:ring-0 w-full font-sans placeholder:text-slate-500"
                    />
                    <span className="text-gray-400 font-medium">€</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("principal")]}
                  min={10000}
                  max={800000}
                  step={1000}
                  onValueChange={(val) => form.setValue("principal", val[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              {/* Input: Interés */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Interés Anual (TIN)</label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      step="0.01"
                      {...form.register("rate", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold text-white p-0 h-auto focus-visible:ring-0 w-full placeholder:text-slate-500"
                    />
                    <span className="text-gray-400 font-medium">%</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("rate")]}
                  min={0.1}
                  max={12}
                  step={0.1}
                  onValueChange={(val) => form.setValue("rate", val[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              {/* Input: Años */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Plazo Restante (Años)</label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      {...form.register("years", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold text-white p-0 h-auto focus-visible:ring-0 w-full placeholder:text-slate-500"
                    />
                    <span className="text-gray-400 font-medium">años</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("years")]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(val) => form.setValue("years", val[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              {/* Cantidad extra puntual */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Cantidad extra puntual (ej. 10.000€)
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      {...form.register("lumpSumPayment", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold text-white p-0 h-auto focus-visible:ring-0 w-full placeholder:text-slate-500"
                    />
                    <span className="text-gray-400 font-medium">€</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("lumpSumPayment")]}
                  min={0}
                  max={100000}
                  step={1000}
                  onValueChange={(val) => form.setValue("lumpSumPayment", val[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              {/* Rentabilidad inversión */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Rentabilidad anual inversión segura
                </label>
                <div className="bg-black/20 border border-white/20 p-4 rounded-2xl focus-within:ring-2 focus-within:ring-vantos-gold/50 focus-within:border-vantos-gold/50 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      step="0.1"
                      {...form.register("investmentRate", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold text-white p-0 h-auto focus-visible:ring-0 w-full placeholder:text-slate-500"
                    />
                    <span className="text-gray-400 font-medium">%</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("investmentRate")]}
                  min={0}
                  max={10}
                  step={0.25}
                  onValueChange={(val) => form.setValue("investmentRate", val[0])}
                  className="[&_.bg-primary]:bg-vantos-gold"
                />
              </div>

              {/* Tipo de amortización */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Si amortizas, prefieres
                </label>
                <div className="relative">
                  <select
                    {...form.register("amortizationType")}
                    className="block w-full rounded-xl border border-white/20 bg-black/20 py-3 pl-4 pr-12 text-white shadow-sm focus:ring-2 focus:ring-vantos-gold/50 focus:border-vantos-gold/50 sm:text-sm sm:leading-6 outline-none appearance-none font-sans"
                  >
                    <option value="reduce_term" className="bg-slate-900 text-white py-2">Reducir plazo (menos años)</option>
                    <option value="reduce_payment" className="bg-slate-900 text-white py-2">Reducir cuota mensual</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Tarjeta Oportunidad VIP (lógica: hipoteca vs rentabilidad segura) */}
          {form.watch("rate") < SAFE_RATE ? (
            <div className="bg-amber-500/10 rounded-3xl p-6 border border-amber-500/30 shadow-sm">
              <h4 className="font-bold text-amber-400 text-sm">Oportunidad VIP</h4>
              <p className="text-xs text-amber-200/90 mt-1 leading-relaxed">
                Tu hipoteca es barata (<strong>{form.watch("rate")}%</strong>). Ganas dinero manteniendo tu liquidez en una cuenta al <strong>{SAFE_RATE}%</strong> en vez de amortizar.
              </p>
            </div>
          ) : (
            <div className="bg-indigo-500/10 rounded-3xl p-6 border border-indigo-500/30 shadow-sm">
              <h4 className="font-bold text-indigo-400 text-sm">Prioridad: Amortizar</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Tu interés (<strong>{form.watch("rate")}%</strong>) es superior a la rentabilidad segura del mercado. Lo más rentable hoy es reducir deuda.
              </p>
            </div>
          )}
        </div>

        {/* COLUMNA 2: Visualización (lg:col-span-5) */}
        <div className="col-span-12 lg:col-span-5 space-y-6">
          {/* Panel comparativo: Amortizar vs Invertir */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div
              className={`rounded-3xl p-5 shadow-sm relative overflow-hidden border border-white/10 ${
                strategic?.winner === "amortize"
                  ? "bg-emerald-500/20 ring-2 ring-emerald-400/50"
                  : "bg-white/5"
              }`}
            >
              {strategic?.winner === "amortize" && (
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                    Ganadora
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <ArrowDownCircle className="w-5 h-5 text-indigo-400" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Estrategia Amortizar
                </p>
              </div>
              {strategic ? (
                <>
                  <p className="text-2xl font-bold text-slate-100">
                    Ahorras {formatMoney(strategic.amortize.interestSaved)} en intereses
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    {strategic.amortize.newMonthlyPayment != null &&
                      `Nueva cuota: ${strategic.amortize.newMonthlyPayment.toFixed(2)} €/mes`}
                    {strategic.amortize.newTermMonths != null &&
                      ` · Plazo: ${Math.round(strategic.amortize.newTermMonths / 12)} años`}
                  </p>
                </>
              ) : (
                <p className="text-gray-400">Introduce datos y cantidad extra para comparar.</p>
              )}
            </div>

            <div
              className={`rounded-3xl p-5 relative overflow-hidden border border-white/10 ${
                strategic?.winner === "invest"
                  ? "bg-emerald-500/20 shadow-lg ring-2 ring-emerald-500/50"
                  : "bg-white/5 shadow-sm"
              }`}
            >
              {strategic?.winner === "invest" && (
                <div className="absolute top-3 right-3">
                  <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-bold text-white uppercase tracking-wide">
                    Máximo beneficio
                  </span>
                </div>
              )}
              <div className="flex items-center gap-2 mb-3">
                <ArrowUpCircle className="w-5 h-5 text-emerald-400" />
                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Estrategia Invertir
                </p>
              </div>
              {strategic ? (
                <>
                  <p className="text-2xl font-bold text-slate-100">
                    Ganas {formatMoney(strategic.invest.totalReturn)} invirtiendo
                  </p>
                  <p className="text-sm text-gray-400 mt-1">
                    Rentabilidad {form.watch("investmentRate")}% a largo del plazo de la hipoteca.
                  </p>
                  {strategic?.winner === "invest" && form.watch("lumpSumPayment") > 0 && (
                    <a
                      href="https://example.com/afiliado"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block w-full sm:w-auto"
                    >
                      <Button
                        className="w-full sm:w-auto bg-vantos-gold hover:bg-vantos-gold/90 text-vantos-dark font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
                        size="sm"
                      >
                        Ver Cuenta Remunerada al {form.watch("investmentRate")}%
                      </Button>
                    </a>
                  )}
                </>
              ) : (
                <p className="text-gray-400">Introduce datos y cantidad extra para comparar.</p>
              )}
            </div>
          </div>

          {strategic && form.watch("lumpSumPayment") > 0 && (
            <div className="bg-white/5 border border-white/10 p-4 rounded-3xl shadow-sm flex items-center justify-between flex-wrap gap-2">
              <span className="text-sm font-medium text-gray-300">Diferencia neta (Invertir vs Amortizar)</span>
              <span
                className={`text-xl font-bold ${
                  strategic.netDifference >= 0 ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {strategic.netDifference >= 0 ? "+" : ""}
                {formatMoney(strategic.netDifference)}
              </span>
            </div>
          )}

          {/* KPI principal: Cuota Mensual (tarjeta oscura grande) */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-lg">
            <p className="text-gray-400 text-sm font-sans font-medium uppercase tracking-wider mb-1">
              Cuota Mensual
            </p>
            <p className="text-4xl lg:text-5xl font-bold text-vantos-gold tracking-tight font-sans">
              {data ? formatMoney(data.monthlyPayment) : "—"}
            </p>
            <p className="text-xs text-gray-500 mt-1 font-sans">Basado en sistema de amortización francés</p>
          </div>

          {/* Dos tarjetas: Total Intereses y Total a Pagar */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
              <p className="text-gray-400 text-xs font-sans font-bold uppercase tracking-wider mb-1">
                Total Intereses
              </p>
              <p className="text-[10px] text-gray-500 font-normal tracking-normal leading-tight mb-1">
                Estimación total del préstamo
              </p>
              <p className="text-2xl font-bold text-slate-100 font-sans">
                {data ? formatMoney(data.totalInterest) : "—"}
              </p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
              <p className="text-gray-400 text-xs font-sans font-bold uppercase tracking-wider mb-1">
                Total a Pagar
              </p>
              <p className="text-[10px] text-gray-500 font-normal tracking-normal leading-tight mb-1">
                Estimación total del préstamo
              </p>
              <p className="text-2xl font-bold text-slate-100 font-sans">
                {data ? formatMoney(data.totalPayment) : "—"}
              </p>
            </div>
          </div>

          {/* Gráfico de área (alto y limpio) */}
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-vantos-gold"/>
                Proyección de Deuda
              </h3>
              <span className="text-xs font-medium px-3 py-1 bg-vantos-gold/20 text-vantos-gold rounded-full">
                Visualización Anual
              </span>
            </div>
            <div className="h-[400px] w-full">
              {chartData.length > 0 && (
                <LuxuryAreaChart
                  data={chartData}
                  primaryKey="saldoBanco"
                  secondaryKey={form.watch("lumpSumPayment") > 0 ? "saldoEstrategia" : undefined}
                  formatValue={(v) => formatMoney(v)}
                />
              )}
            </div>
          </div>
        </div>

        {/* COLUMNA 3: Datos Detallados (lg:col-span-4) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-white/5 border border-white/10 rounded-3xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-white/10 bg-white/5">
              <h3 className="font-bold text-slate-100 flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-gray-400"/>
                Tabla de Amortización (Resumen Anual)
              </h3>
            </div>
            <div className="max-h-[800px] overflow-y-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-white/5 text-gray-400 font-semibold sticky top-0 z-10 shadow-sm">
                  <tr>
                    <th className="px-3 py-4 bg-white/5">Año</th>
                    <th className="px-3 py-4 bg-white/5">Cuota Anual</th>
                    <th className="px-3 py-4 bg-white/5 text-indigo-400">Intereses</th>
                    <th className="px-3 py-4 bg-white/5 text-emerald-400">Capital</th>
                    <th className="px-3 py-4 bg-white/5 text-right">Deuda Restante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10">
                  {data && data.yearlyTable.map((row, i) => (
                    <tr key={i} className="hover:bg-white/5 transition-colors">
                      <td className="px-3 py-3 font-medium text-slate-100">Año {row.rowNum} ({row.year})</td>
                      <td className="px-3 py-3 text-gray-400">{formatMoney(row.interest + row.principal)}</td>
                      <td className="px-3 py-3 text-indigo-400 font-medium">{formatMoney(row.interest)}</td>
                      <td className="px-3 py-3 text-emerald-400 font-medium">{formatMoney(row.principal)}</td>
                      <td className="px-3 py-3 text-right font-bold text-slate-100">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-3 bg-white/5 text-center border-t border-white/10">
              <p className="text-[10px] text-gray-500 leading-tight">
                Cálculos basados en el sistema de amortización francés (cuotas constantes). Los resultados son orientativos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}