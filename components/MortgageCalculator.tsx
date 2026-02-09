'use client';

import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Home, TrendingUp, Sparkles } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Slider } from "@/components/ui/slider";
import type { AmortizationResult } from "@/lib/finance";
import { getAmortizationTable } from "@/lib/finance";

const formSchema = z.object({
  debt: z
    .coerce
    .number()
    .min(1_000, "La deuda debe ser al menos 1.000â‚¬"),
  rate: z
    .coerce
    .number()
    .min(0, "El interÃ©s no puede ser negativo")
    .max(15, "El interÃ©s mÃ¡ximo para el simulador es 15%"),
  termYears: z
    .coerce
    .number()
    .min(5, "El plazo mÃ­nimo es de 5 aÃ±os")
    .max(40, "El plazo mÃ¡ximo es de 40 aÃ±os"),
  extraMonthly: z
    .coerce
    .number()
    .min(0, "El ahorro mensual extra no puede ser negativo")
    .default(0),
});

type FormValues = z.infer<typeof formSchema>;

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 0,
});

type BalancePoint = {
  label: string;
  balance: number;
};

function buildDefaultValues(searchParams: URLSearchParams): FormValues {
  const debtParam = searchParams.get("debt");
  const rateParam = searchParams.get("rate");
  const termYearsParam = searchParams.get("termYears");
  const extraMonthlyParam = searchParams.get("extraMonthly");

  return {
    debt: debtParam ? Number(debtParam) || 200_000 : 200_000,
    rate: rateParam ? Number(rateParam) || 3.5 : 3.5,
    termYears: termYearsParam ? Number(termYearsParam) || 25 : 25,
    extraMonthly: extraMonthlyParam ? Number(extraMonthlyParam) || 0 : 0,
  };
}

function updateSearchParams(router: ReturnType<typeof useRouter>, searchParams: URLSearchParams, values: FormValues) {
  const params = new URLSearchParams(searchParams.toString());
  params.set("debt", String(values.debt));
  params.set("rate", String(values.rate));
  params.set("termYears", String(values.termYears));

  if (values.extraMonthly && values.extraMonthly > 0) {
    params.set("extraMonthly", String(values.extraMonthly));
  } else {
    params.delete("extraMonthly");
  }

  router.replace(`?${params.toString()}`, { scroll: false });
}

function buildBalanceChartData(result: AmortizationResult | null): BalancePoint[] {
  if (!result) return [];

  // Muestreamos el saldo pendiente una vez por aÃ±o para un grÃ¡fico mÃ¡s legible.
  const data: BalancePoint[] = [];
  for (const row of result.table) {
    if (row.month % 12 === 0 || row.month === result.table.length) {
      const year = row.month / 12;
      data.push({
        label: `${year.toFixed(0)}Âº aÃ±o`,
        balance: row.balance,
      });
    }
  }
  return data;
}

function AffiliateCard() {
  return (
    <Card className="mt-8 border border-amber-200 bg-gradient-to-br from-amber-50 to-white shadow-[0_2px_12px_rgba(245,158,11,0.08)]">
      <CardHeader className="flex flex-row items-start justify-between gap-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 shrink-0 text-amber-600" />
            <CardTitle className="text-base font-semibold text-slate-900">
              Oportunidad de mercado
            </CardTitle>
          </div>
          <CardDescription className="text-sm text-slate-600">
            Hemos detectado que tu ahorro rinde mÃ¡s fuera de la hipoteca.
          </CardDescription>
          <Button
            type="button"
            variant="ghost"
            className="h-10 rounded-xl text-amber-700 hover:bg-amber-100 hover:text-amber-800"
          >
            Ver cuenta al 4%
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}

export default function MortgageCalculator() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [amortization, setAmortization] = useState<AmortizationResult | null>(null);

  const form = useForm<FormValues>({
    // Cast necesario para compatibilizar tipos entre zodResolver y react-hook-form
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: buildDefaultValues(searchParams),
    mode: "onChange",
  });

  const chartData = useMemo(() => buildBalanceChartData(amortization), [amortization]);

  function onSubmit(values: FormValues) {
    const termMonths = values.termYears * 12;

    // Nota: de momento ignoramos el ahorro mensual extra en el cÃ¡lculo
    // de la tabla estÃ¡ndar de amortizaciÃ³n francesa. Lo incorporaremos
    // en escenarios avanzados en futuras iteraciones.
    const result = getAmortizationTable(values.debt, values.rate, termMonths);
    setAmortization(result);

    updateSearchParams(router, searchParams, values);
  }

  const monthlyPayment = amortization?.monthlyPayment ?? null;
  const totalInterest = amortization?.totalInterest ?? null;

  return (
    <Card className="border border-slate-100 bg-white shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
            <Home className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold text-slate-900">
              Configura tu hipoteca
            </CardTitle>
            <CardDescription className="text-sm text-slate-500">
              Introduce tus datos y obtÃ©n una visiÃ³n clara de tu cuota y del coste total.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-2">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)]"
          >
            {/* Columna izquierda: inputs, sin ruido */}
            <div className="space-y-5">
              <FormField
                control={form.control}
                name="debt"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Deuda pendiente (â‚¬)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={1000}
                        step={1000}
                        className="h-9 rounded-lg border-transparent bg-slate-50 text-sm focus-visible:ring-2 focus-visible:ring-indigo-100"
                        {...field}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const value = Number(event.target.value);
                          field.onChange(Number.isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <Slider
                      min={50_000}
                      max={600_000}
                      step={5_000}
                      value={[Number(field.value) || 0]}
                      onValueChange={([value]: number[]) => field.onChange(value)}
                      className="mt-1 [&_.grow]:!bg-indigo-100 [&_.absolute.h-full]:!bg-indigo-500 [&_button]:!border-indigo-200 [&_button]:!bg-white"
                    />
                    <FormDescription className="text-[0.7rem] text-slate-500">
                      Importe aproximado que te queda por pagar de tu hipoteca.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Tipo de interÃ©s actual (% TIN)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        max={15}
                        step={0.1}
                        className="h-9 rounded-lg border-transparent bg-slate-50 text-sm focus-visible:ring-2 focus-visible:ring-indigo-100"
                        {...field}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const value = Number(event.target.value);
                          field.onChange(Number.isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <Slider
                      min={0}
                      max={15}
                      step={0.1}
                      value={[Number(field.value) || 0]}
                      onValueChange={([value]: number[]) =>
                        field.onChange(Number(value.toFixed(2)))
                      }
                      className="mt-1 [&_.grow]:!bg-indigo-100 [&_.absolute.h-full]:!bg-indigo-500 [&_button]:!border-indigo-200 [&_button]:!bg-white"
                    />
                    <FormDescription className="text-[0.7rem] text-slate-500">
                      Tipo de interÃ©s nominal anual de tu hipoteca.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="termYears"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Plazo restante (aÃ±os)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="numeric"
                        min={5}
                        max={40}
                        step={1}
                        className="h-9 rounded-lg border-transparent bg-slate-50 text-sm focus-visible:ring-2 focus-visible:ring-indigo-100"
                        {...field}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const value = Number(event.target.value);
                          field.onChange(Number.isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <Slider
                      min={5}
                      max={40}
                      step={1}
                      value={[Number(field.value) || 0]}
                      onValueChange={([value]: number[]) => field.onChange(value)}
                      className="mt-1 [&_.grow]:!bg-indigo-100 [&_.absolute.h-full]:!bg-indigo-500 [&_button]:!border-indigo-200 [&_button]:!bg-white"
                    />
                    <FormDescription className="text-[0.7rem] text-slate-500">
                      AÃ±os que te quedan por pagar segÃºn tu cuadro de amortizaciÃ³n actual.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="extraMonthly"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Ahorro mensual extra (â‚¬) (opcional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={50}
                        className="h-9 rounded-lg border-transparent bg-slate-50 text-sm focus-visible:ring-2 focus-visible:ring-indigo-100"
                        {...field}
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          const value = Number(event.target.value);
                          field.onChange(Number.isNaN(value) ? "" : value);
                        }}
                      />
                    </FormControl>
                    <Slider
                      min={0}
                      max={2_000}
                      step={50}
                      value={[Number(field.value) || 0]}
                      onValueChange={([value]: number[]) => field.onChange(value)}
                      className="mt-1 [&_.grow]:!bg-indigo-100 [&_.absolute.h-full]:!bg-indigo-500 [&_button]:!border-indigo-200 [&_button]:!bg-white"
                    />
                    <FormDescription className="text-[0.7rem] text-slate-500">
                      Cantidad adicional que podrÃ­as destinar cada mes a amortizar o invertir.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-500/20 transition hover:bg-indigo-700"
              >
                Simular mi hipoteca
              </Button>
            </div>

            {/* Columna derecha: big number + grÃ¡fico */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
                {monthlyPayment == null ? (
                  <div className="flex flex-col items-center justify-center py-10 text-center">
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100">
                      <TrendingUp className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="text-sm text-slate-500">
                      Introduce tus datos para ver la magia
                    </p>
                  </div>
                ) : (
                  <>
                    <h3 className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
                      Tu cuota mensual
                    </h3>
                    <p className="mt-2 text-5xl font-semibold tracking-tight text-slate-900">
                      {currencyFormatter.format(monthlyPayment)}
                    </p>
                    <p className="mt-3 text-sm text-slate-500">
                      Coste total en intereses:{" "}
                      <span className="font-semibold text-rose-600">
                        {totalInterest != null
                          ? currencyFormatter.format(totalInterest)
                          : "â€”"}
                      </span>
                    </p>
                  </>
                )}
              </div>

              <div className="h-[300px] rounded-2xl border border-slate-100 bg-slate-50 p-4 shadow-sm sm:h-[340px]">
                {chartData.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100">
                      <TrendingUp className="h-5 w-5 text-slate-400" />
                    </div>
                    <p className="text-xs text-slate-500">
                      Introduce tus datos para ver la magia
                    </p>
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#4f46e5" stopOpacity={0.45} />
                          <stop offset="100%" stopColor="#4f46e5" stopOpacity={0.02} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                      <XAxis
                        dataKey="label"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 10, fill: "#64748b" }}
                        tickFormatter={(value: number) => numberFormatter.format(value)}
                      />
                      <Tooltip
                        formatter={(value: number | undefined) =>
                          value != null ? currencyFormatter.format(value) : ""
                        }
                        labelFormatter={(label) => String(label ?? "")}
                        contentStyle={{
                          borderRadius: 12,
                          borderColor: "#e2e8f0",
                          boxShadow: "0 18px 45px rgba(15,23,42,0.12)",
                          fontSize: 11,
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="balance"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        fill="url(#balanceGradient)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </form>
        </Form>

        <AffiliateCard />
      </CardContent>
    </Card>
  );
}
