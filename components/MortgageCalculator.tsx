"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  TrendingUp, 
  Sparkles, 
  DollarSign, 
  Calendar, 
  PieChart,
  Table as TableIcon
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const formSchema = z.object({
  principal: z.number().min(1000, "La deuda mínima es 1.000€"),
  rate: z.number().min(0).max(15, "El interés máximo es 15%"),
  years: z.number().min(1).max(40, "El plazo máximo son 40 años"),
});

type FormValues = z.infer<typeof formSchema>;

export default function MortgageCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<{
    monthlyPayment: number;
    totalInterest: number;
    totalPayment: number;
    schedule: any[];
    yearlyTable: any[];
  } | null>(null);

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      principal: Number(searchParams.get("debt")) || 200000,
      rate: Number(searchParams.get("rate")) || 3.5,
      years: Number(searchParams.get("years")) || 25,
    },
  });

  const calculate = (values: FormValues) => {
    try {
      // 1. CÁLCULO MANUAL (Sistema Francés) para asegurar que tenemos todos los datos
      const principal = values.principal;
      const annualRate = values.rate / 100;
      const monthlyRate = annualRate / 12;
      const totalMonths = values.years * 12;

      // Fórmula de cuota mensual
      const monthlyPayment = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);

      let currentBalance = principal;
      let totalInterest = 0;
      
      const schedule = []; // Para el gráfico
      const yearlyTable = []; // Para la tabla

      let yearInterest = 0;
      let yearPrincipal = 0;
      let currentYear = new Date().getFullYear();

      for (let month = 1; month <= totalMonths; month++) {
        const interestPayment = currentBalance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        
        currentBalance -= principalPayment;
        if (currentBalance < 0) currentBalance = 0; // Evitar decimales negativos finales

        totalInterest += interestPayment;
        yearInterest += interestPayment;
        yearPrincipal += principalPayment;

        // Guardar datos para GRÁFICO (Solo cada año o el último mes)
        if (month % 12 === 0 || month === totalMonths) {
          schedule.push({
            year: Math.round(month / 12),
            balance: Math.round(currentBalance),
          });

          // Guardar datos para TABLA ANUAL
          yearlyTable.push({
             year: currentYear,
             interest: yearInterest,
             principal: yearPrincipal,
             balance: currentBalance,
             rowNum: Math.ceil(month / 12)
          });
          
          // Resetear contadores anuales
          currentYear++;
          yearInterest = 0;
          yearPrincipal = 0;
        }
      }

      setData({
        monthlyPayment: monthlyPayment,
        totalInterest: totalInterest,
        totalPayment: monthlyPayment * totalMonths,
        schedule: schedule,
        yearlyTable: yearlyTable
      });

      // Actualizar URL
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

  const formatMoney = (val: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

  return (
    <div className="w-full max-w-[1600px] mx-auto">
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* --- LEFT SIDEBAR: CONTROLS --- */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 sticky top-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <span className="bg-indigo-100 p-2 rounded-lg text-indigo-600"><DollarSign className="w-5 h-5"/></span>
              Configuración
            </h2>
            
            <div className="space-y-8">
              {/* Input: Deuda */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Deuda Pendiente</label>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      {...form.register("principal", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0 w-full"
                    />
                    <span className="text-slate-400 font-medium">€</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("principal")]}
                  min={10000}
                  max={800000}
                  step={1000}
                  onValueChange={(val) => form.setValue("principal", val[0])}
                  className="[&_.bg-primary]:bg-indigo-600"
                />
              </div>

              {/* Input: Interés */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Interés Anual</label>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      step="0.01"
                      {...form.register("rate", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0 w-full"
                    />
                    <span className="text-slate-400 font-medium">%</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("rate")]}
                  min={0.1}
                  max={12}
                  step={0.1}
                  onValueChange={(val) => form.setValue("rate", val[0])}
                  className="[&_.bg-primary]:bg-indigo-600"
                />
              </div>

              {/* Input: Años */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Plazo Restante</label>
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 focus-within:ring-2 ring-indigo-500/20 transition-all">
                  <div className="flex items-center justify-between">
                    <Input
                      type="number"
                      {...form.register("years", { valueAsNumber: true })}
                      className="bg-transparent border-none text-2xl font-bold p-0 h-auto focus-visible:ring-0 w-full"
                    />
                    <span className="text-slate-400 font-medium">años</span>
                  </div>
                </div>
                <Slider
                  value={[form.watch("years")]}
                  min={1}
                  max={40}
                  step={1}
                  onValueChange={(val) => form.setValue("years", val[0])}
                  className="[&_.bg-primary]:bg-indigo-600"
                />
              </div>

              <Button 
                onClick={() => calculate(form.getValues())}
                className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium shadow-lg shadow-slate-900/20"
              >
                Recalcular Escenario
              </Button>
            </div>
          </div>
          
          {/* Card Oportunidad */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-6 border border-amber-100/50">
            <div className="flex items-start gap-3">
              <div className="bg-white p-2 rounded-full shadow-sm text-amber-500">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm">Oportunidad VIP</h4>
                <p className="text-xs text-amber-800/80 mt-1 leading-relaxed">
                  Con un interés del {form.watch("rate")}%, podrías ganar <strong>+{formatMoney(2400)}</strong> invirtiendo en lugar de amortizar.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- RIGHT DASHBOARD: RESULTS --- */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* KPI GRID */}
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Card 1 */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
              <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <DollarSign className="w-16 h-16 text-indigo-600" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cuota Mensual</p>
              <div className="text-3xl font-bold text-slate-900">
                {data ? data.monthlyPayment.toFixed(2) : "..."}
                <span className="text-lg text-slate-400 font-medium">€</span>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <PieChart className="w-16 h-16 text-rose-600" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total Intereses</p>
              <div className="text-3xl font-bold text-rose-600">
                {data ? formatMoney(data.totalInterest) : "..."}
              </div>
            </div>

             {/* Card 3 */}
             <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
               <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <Calendar className="w-16 h-16 text-emerald-600" />
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Total a Pagar</p>
              <div className="text-3xl font-bold text-slate-900">
                {data ? formatMoney(data.totalPayment) : "..."}
              </div>
            </div>
          </div>

          {/* GRAPH SECTION */}
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-500"/>
                Proyección de Deuda
              </h3>
              <div className="flex gap-2">
                 <span className="text-xs font-medium px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full">Visualización Anual</span>
              </div>
            </div>
            
            <div className="h-[350px] w-full">
              {data && (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data.schedule} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="year" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(val) => `Año ${val}`}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fill: '#94a3b8', fontSize: 12 }}
                      tickFormatter={(val) => `${val / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
                      formatter={(value: any) => [formatMoney(value), "Capital Pendiente"]}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#6366f1"
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorBalance)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* TABLE SECTION (NUEVO) */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-50 bg-slate-50/50 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <TableIcon className="w-5 h-5 text-slate-500"/>
                Tabla de Amortización (Resumen Anual)
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 font-semibold">
                  <tr>
                    <th className="px-6 py-4">Año</th>
                    <th className="px-6 py-4">Cuota Anual</th>
                    <th className="px-6 py-4 text-indigo-600">Intereses Pagados</th>
                    <th className="px-6 py-4 text-emerald-600">Capital Amortizado</th>
                    <th className="px-6 py-4 text-right">Deuda Restante</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data && data.yearlyTable.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-medium text-slate-900">Año {row.rowNum} ({row.year})</td>
                      <td className="px-6 py-4 text-slate-600">{formatMoney(row.interest + row.principal)}</td>
                      <td className="px-6 py-4 text-indigo-600 font-medium">{formatMoney(row.interest)}</td>
                      <td className="px-6 py-4 text-emerald-600 font-medium">{formatMoney(row.principal)}</td>
                      <td className="px-6 py-4 text-right font-bold text-slate-900">{formatMoney(row.balance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="p-4 bg-slate-50 text-center">
               <p className="text-xs text-slate-400">
                 Mostrando resumen anual. Los cálculos son estimaciones basadas en el sistema de amortización francés.
               </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}