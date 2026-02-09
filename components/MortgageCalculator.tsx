"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TrendingUp, Sparkles, ArrowRight, Info } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
// CORRECCIÓN 1: Importamos la función que SÍ existe en tu proyecto actual
import { getAmortizationTable } from "@/lib/finance";

const formSchema = z.object({
  principal: z.number().min(1000, "La deuda mínima es 1.000€"),
  rate: z.number().min(0).max(15, "El interés máximo es 15%"),
  years: z.number().min(1).max(40, "El plazo máximo son 40 años"),
  extraPayment: z.number().min(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function MortgageCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [results, setResults] = useState<{
    monthlyPayment: string;
    totalInterest: string;
    schedule: any[];
  } | null>(null);

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      principal: Number(searchParams.get("debt")) || 200000,
      rate: Number(searchParams.get("rate")) || 3.5,
      years: Number(searchParams.get("years")) || 25,
      extraPayment: 0,
    },
  });

  const calculate = (values: FormValues) => {
    try {
      // CORRECCIÓN 2: Usamos getAmortizationTable con números simples
      const termMonths = values.years * 12;
      const data = getAmortizationTable(values.principal, values.rate, termMonths);

      // Preparamos los datos para el gráfico (muestreo anual)
      // CORRECCIÓN 3: Tipado explícito para evitar errores de compilación con "_" e "i"
      const chartData = data.table
        .filter((row: any) => row.month % 12 === 0 || row.month === termMonths)
        .map((row: any) => ({
           year: Math.round(row.month / 12),
           balance: row.balance
        }));

      setResults({
        monthlyPayment: data.monthlyPayment.toFixed(2),
        totalInterest: data.totalInterest.toFixed(2),
        schedule: chartData,
      });

      const params = new URLSearchParams();
      params.set("debt", values.principal.toString());
      params.set("rate", values.rate.toString());
      params.set("years", values.years.toString());
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

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] items-start">
      {/* COLUMNA IZQUIERDA: INPUTS "WISE STYLE" (BLOQUES SÓLIDOS) */}
      <div className="space-y-6">
        
        {/* Input Block: Deuda */}
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <div className="px-5 pt-4">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Deuda Pendiente</label>
            <div className="flex items-center">
              <Input
                type="number"
                {...form.register("principal", { valueAsNumber: true })}
                className="block w-full border-0 p-0 text-3xl font-bold text-slate-900 placeholder:text-slate-300 focus-visible:ring-0 bg-transparent h-12"
              />
              <span className="text-xl text-slate-400 font-medium ml-2">€</span>
            </div>
          </div>
          <div className="px-4 pb-4 mt-2">
            <Slider
              value={[form.watch("principal")]}
              min={10000}
              max={800000}
              step={1000}
              onValueChange={(val) => form.setValue("principal", val[0])}
              className="[&_.bg-primary]:bg-slate-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Input Block: Interés */}
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <div className="px-5 pt-4">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Interés Anual (TIN)</label>
            <div className="flex items-center">
              <Input
                type="number"
                step="0.01"
                {...form.register("rate", { valueAsNumber: true })}
                className="block w-full border-0 p-0 text-3xl font-bold text-slate-900 placeholder:text-slate-300 focus-visible:ring-0 bg-transparent h-12"
              />
              <span className="text-xl text-slate-400 font-medium ml-2">%</span>
            </div>
          </div>
          <div className="px-4 pb-4 mt-2">
            <Slider
              value={[form.watch("rate")]}
              min={0.1}
              max={12}
              step={0.05}
              onValueChange={(val) => form.setValue("rate", val[0])}
              className="[&_.bg-primary]:bg-slate-900 cursor-pointer"
            />
          </div>
        </div>

        {/* Input Block: Plazo */}
        <div className="bg-white p-1 rounded-2xl border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500/20 focus-within:border-indigo-500 transition-all">
          <div className="px-5 pt-4">
            <label className="text-[11px] uppercase tracking-wider font-bold text-slate-400">Plazo Restante</label>
            <div className="flex items-center">
              <Input
                type="number"
                {...form.register("years", { valueAsNumber: true })}
                className="block w-full border-0 p-0 text-3xl font-bold text-slate-900 placeholder:text-slate-300 focus-visible:ring-0 bg-transparent h-12"
              />
              <span className="text-xl text-slate-400 font-medium ml-2">años</span>
            </div>
          </div>
          <div className="px-4 pb-4 mt-2">
            <Slider
              value={[form.watch("years")]}
              min={1}
              max={40}
              step={1}
              onValueChange={(val) => form.setValue("years", val[0])}
              className="[&_.bg-primary]:bg-slate-900 cursor-pointer"
            />
          </div>
        </div>

        <Button 
          className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/20 rounded-xl text-lg font-semibold tracking-wide transition-all active:scale-[0.98]"
          onClick={() => calculate(form.getValues())}
        >
          Simular mi hipoteca
        </Button>

      </div>

      {/* COLUMNA DERECHA: RESULTADOS VISUALES */}
      <div className="space-y-8 sticky top-24">
        {results ? (
          <>
            {/* KPI CARD SIN BORDES */}
            <div className="relative overflow-hidden">
               <div className="space-y-2">
                  <span className="text-sm font-semibold uppercase tracking-wide text-slate-400 flex items-center gap-2">
                    Tu Cuota Mensual
                    <Info className="w-4 h-4 text-slate-300" />
                  </span>
                  <div className="flex items-baseline space-x-1">
                    <span className="text-6xl font-bold tracking-tighter text-slate-900">
                      {results.monthlyPayment.split('.')[0]}
                    </span>
                    <span className="text-3xl font-bold text-slate-400">
                      ,{results.monthlyPayment.split('.')[1]} €
                    </span>
                  </div>
                  <p className="text-sm text-rose-500 font-medium bg-rose-50 inline-block px-3 py-1 rounded-full">
                    Pagarás {results.totalInterest}€ en intereses
                  </p>
               </div>
            </div>

            {/* GRÁFICO SUPER LIMPIO (Estilo Robinhood) */}
            <div className="h-[280px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={results.schedule}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* Sin Grid ni ejes molestos - TEXTOS CORREGIDOS */}
                  <XAxis 
                    dataKey="year" 
                    tickFormatter={(value) => `${value}º`} 
                    stroke="#cbd5e1" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    dy={10}
                  />
                  <YAxis hide domain={['dataMin', 'dataMax']} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                    itemStyle={{ color: '#1e293b', fontWeight: 600 }}
                    formatter={(value: any) => [`${new Intl.NumberFormat('es-ES').format(value)} €`, 'Pendiente']}
                    labelFormatter={(label) => `Año ${label}`}
                  />
                  <Area
                    type="monotone"
                    dataKey="balance"
                    stroke="#4f46e5"
                    strokeWidth={4}
                    fillOpacity={1}
                    fill="url(#colorBalance)"
                    animationDuration={1500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* OPORTUNIDAD DE MERCADO (Ticket Dorado VIP) */}
            <div className="group relative cursor-pointer mt-4">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-amber-300 to-yellow-200 opacity-40 blur transition duration-200 group-hover:opacity-70"></div>
              <div className="relative flex items-center justify-between rounded-xl bg-gradient-to-br from-white to-amber-50/50 p-6 shadow-sm ring-1 ring-amber-100">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Oportunidad detectada</h3>
                    <p className="mt-1 text-sm text-slate-600 leading-relaxed max-w-xs">
                      Tu dinero rentaría más en una cuenta al 4% que amortizando ahora.
                    </p>
                  </div>
                </div>
                <div className="hidden sm:block">
                  <ArrowRight className="h-5 w-5 text-amber-600 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-8 opacity-50">
            <TrendingUp className="w-12 h-12 text-slate-300 mb-4" />
            <p className="text-slate-400">Introduce tus datos para simular</p>
          </div>
        )}
      </div>
    </div>
  );
}