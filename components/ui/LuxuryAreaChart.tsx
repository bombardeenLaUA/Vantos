"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  TooltipProps,
} from "recharts";

export interface ChartDataPoint {
  year: number;
  [key: string]: number | undefined;
}

interface LuxuryAreaChartProps {
  data: ChartDataPoint[];
  /** Primary series key (e.g. "value", "saldoBanco", "balance") */
  primaryKey: string;
  /** Optional secondary series (e.g. "saldoEstrategia") - area between curves = Ahorro */
  secondaryKey?: string;
  /** Format function for values */
  formatValue?: (val: number) => string;
  height?: number;
}

function CustomTooltip({
  active,
  payload,
  label,
  primaryKey,
  secondaryKey,
  formatValue = (v) => v.toLocaleString("es-ES") + "€",
}: TooltipProps<number, string> & {
  primaryKey: string;
  secondaryKey?: string;
  formatValue?: (v: number) => string;
}) {
  if (!active || !payload?.length || !label) return null;

  const p = payload[0]?.payload;
  const primaryVal = p?.[primaryKey] ?? 0;
  const secondaryVal = secondaryKey ? (p?.[secondaryKey] ?? 0) : undefined;
  const ahorro = secondaryVal != null ? (primaryVal as number) - (secondaryVal as number) : undefined;

  return (
    <div className="bg-[#0B0F19]/95 backdrop-blur-md border border-vantos-gold/30 rounded-xl px-4 py-3 shadow-2xl">
      <p className="text-vantos-gold text-xs font-semibold uppercase tracking-wider mb-2">
        Año {label}
      </p>
      <p className="text-white font-medium">{formatValue(primaryVal as number)}</p>
      {secondaryKey && secondaryVal != null && (
        <>
          <p className="text-white/80 text-sm mt-1">
            Estrategia: {formatValue(secondaryVal as number)}
          </p>
          {ahorro !== undefined && ahorro > 0 && (
            <p className="text-vantos-gold font-bold mt-2">
              Ahorro: {formatValue(ahorro)}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function LuxuryAreaChart({
  data,
  primaryKey,
  secondaryKey,
  formatValue = (v) =>
    v >= 1000 ? `${(v / 1000).toFixed(0)}k€` : v.toLocaleString("es-ES") + "€",
  height = 400,
}: LuxuryAreaChartProps) {
  return (
    <div className="h-[400px] w-full" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#C6A87C" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#C6A87C" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorSlate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#94a3b8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="rgba(148,163,184,0.2)"
          />
          <XAxis
            dataKey="year"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#94a3b8", fontSize: 12 }}
            tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(0)}k` : String(v))}
          />
          <Tooltip
            content={
              <CustomTooltip
                primaryKey={primaryKey}
                secondaryKey={secondaryKey}
                formatValue={
                  formatValue ??
                  ((v) =>
                    v.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "EUR",
                      maximumFractionDigits: 0,
                    }))
                }
              />
            }
            wrapperStyle={{ outline: "none" }}
          />
          {secondaryKey && (
            <Area
              type="monotone"
              dataKey={secondaryKey}
              stroke="#94a3b8"
              strokeWidth={2}
              fill="url(#colorSlate)"
              fillOpacity={1}
              activeDot={{ r: 5, strokeWidth: 0 }}
            />
          )}
          <Area
            type="monotone"
            dataKey={primaryKey}
            stroke="#C6A87C"
            strokeWidth={3}
            fill="url(#colorGold)"
            fillOpacity={1}
            activeDot={{ r: 6, strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
