/**
 * lib/finance.ts
 * Lógica pura de matemáticas financieras para el Simulador Hipotecario Vantos.
 * Usa Decimal.js OBLIGATORIAMENTE para evitar errores de coma flotante en cálculos monetarios.
 *
 * Amortización Francesa (Sistema de Cuota Constante):
 * - La cuota mensual se mantiene constante durante todo el plazo.
 * - En las primeras cuotas predomina el interés; en las finales, el capital.
 * - Fórmula cuota: C = P * [r(1+r)^n] / [(1+r)^n - 1]
 *   Donde: P=principal, r=tasa mensual, n=número de cuotas
 */

import Decimal from "decimal.js";

// --- Interfaces públicas ---

export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface AmortizationResult {
  monthlyPayment: number;
  totalInterest: number;
  table: AmortizationRow[];
}

export interface SavingsScenarioInput {
  debt: number;
  annualRate: number;
  termMonths: number;
  savings: number;
  investmentReturnRate?: number;
}

export interface ScenarioComparison {
  scenarioA: { newMonthlyPayment: number; totalInterestPaid: number };
  scenarioB: { newTermMonths: number; totalInterestPaid: number; savedInterest: number };
  scenarioC: { totalReturn: number; netVsAmortize: number };
  recommendation: "reduce_payment" | "reduce_term" | "invest";
}

/** Input para el simulador estratégico (comparar amortizar vs invertir). */
export interface StrategicComparisonInput {
  debt: number;
  annualRate: number;
  termMonths: number;
  lumpSumPayment: number;
  investmentRate: number;
  amortizationType: "reduce_payment" | "reduce_term";
}

/** Resultado de la comparación estratégica: base, amortizar e invertir. */
export interface StrategicComparisonResult {
  base: { monthlyPayment: number; totalInterest: number };
  amortize: {
    totalInterestPaid: number;
    interestSaved: number;
    newMonthlyPayment?: number;
    newTermMonths?: number;
  };
  invest: { totalReturn: number };
  /** Diferencia neta en €: positivo = gana invertir, negativo = gana amortizar. */
  netDifference: number;
  winner: "amortize" | "invest";
}

/**
 * Calcula la cuota mensual de una hipoteca con amortización francesa.
 * @param principal - Capital pendiente (€)
 * @param annualRatePercent - Tasa de interés anual (ej: 3.5 para 3.5%)
 * @param termMonths - Plazo restante en meses
 * @returns Cuota mensual en euros
 */
export function calculateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): number {
  if (principal <= 0 || termMonths <= 0) return 0;
  if (annualRatePercent === 0) {
    return new Decimal(principal).div(termMonths).toNumber();
  }

  const P = new Decimal(principal);
  const r = new Decimal(annualRatePercent).div(100).div(12); // Tasa mensual
  const n = new Decimal(termMonths);

  // (1+r)^n
  const onePlusR = new Decimal(1).add(r);
  const onePlusRPowN = onePlusR.pow(n.toNumber());

  // Cuota = P * [r(1+r)^n] / [(1+r)^n - 1]
  const numerator = r.mul(onePlusRPowN);
  const denominator = onePlusRPowN.minus(1);
  const payment = P.mul(numerator).div(denominator);

  return payment.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
}

/**
 * Genera la tabla de amortización completa (amortización francesa).
 */
export function getAmortizationTable(
  principal: number,
  annualRatePercent: number,
  termMonths: number
): AmortizationResult {
  const monthlyPayment = calculateMonthlyPayment(principal, annualRatePercent, termMonths);
  const table: AmortizationRow[] = [];
  const monthlyRate = new Decimal(annualRatePercent).div(100).div(12);

  let balance = new Decimal(principal);
  const payment = new Decimal(monthlyPayment);
  let totalInterest = new Decimal(0);

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance.mul(monthlyRate).toDecimalPlaces(2, Decimal.ROUND_HALF_UP);
    let principalPaid: Decimal;
    let finalBalance: number;

    if (month === termMonths) {
      principalPaid = balance; // Última cuota: amortizamos el saldo exacto
      finalBalance = 0;
    } else {
      principalPaid = payment.minus(interest);
      finalBalance = Math.max(0, balance.minus(principalPaid).toNumber());
    }

    const finalPrincipal = principalPaid.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
    const finalInterest = interest.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
    const rowPayment = month === termMonths ? finalPrincipal + finalInterest : monthlyPayment;

    totalInterest = totalInterest.add(finalInterest);
    table.push({
      month,
      payment: rowPayment,
      principal: finalPrincipal,
      interest: finalInterest,
      balance: finalBalance,
    });
    balance = new Decimal(finalBalance);
  }

  return {
    monthlyPayment,
    totalInterest: totalInterest.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber(),
    table,
  };
}

/**
 * Escenario A: Amortizar reduciendo CUOTA.
 * El capital disponible reduce el principal; se recalcula la cuota manteniendo el plazo.
 */
function scenarioAReducePayment(
  debt: number,
  annualRate: number,
  termMonths: number,
  savings: number
) {
  const newPrincipal = Math.max(0, debt - savings);
  if (newPrincipal === 0) {
    return { newMonthlyPayment: 0, totalInterestPaid: 0 };
  }
  const result = getAmortizationTable(newPrincipal, annualRate, termMonths);
  return {
    newMonthlyPayment: result.monthlyPayment,
    totalInterestPaid: result.totalInterest,
  };
}

/**
 * Escenario B: Amortizar reduciendo PLAZO.
 * El capital disponible reduce el principal; se mantiene la cuota y se calcula el nuevo plazo.
 */
function scenarioBReduceTerm(
  debt: number,
  annualRate: number,
  termMonths: number,
  savings: number
) {
  const newPrincipal = Math.max(0, debt - savings);
  if (newPrincipal <= 0) {
    return { newTermMonths: 0, totalInterestPaid: 0, savedInterest: 0 };
  }
  const originalResult = getAmortizationTable(debt, annualRate, termMonths);
  const monthlyPayment = originalResult.monthlyPayment;
  const monthlyRate = new Decimal(annualRate).div(100).div(12);
  const P = new Decimal(newPrincipal);
  const PMT = new Decimal(monthlyPayment);

  // Calcular n: n = -ln(1 - Pr/PMT) / ln(1+r)
  if (annualRate === 0) {
    const n = P.div(PMT).ceil().toNumber();
    const result = getAmortizationTable(newPrincipal, annualRate, n);
    const savedInterest = originalResult.totalInterest - result.totalInterest;
    return { newTermMonths: n, totalInterestPaid: result.totalInterest, savedInterest };
  }

  const inner = new Decimal(1).minus(P.mul(monthlyRate).div(PMT));
  if (inner.lte(0)) {
    return { newTermMonths: termMonths, totalInterestPaid: originalResult.totalInterest, savedInterest: 0 };
  }
  const n = inner.ln().neg().div(new Decimal(1).add(monthlyRate).ln()).ceil().toNumber();
  const result = getAmortizationTable(newPrincipal, annualRate, Math.max(1, n));
  const savedInterest = new Decimal(originalResult.totalInterest).minus(result.totalInterest).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
  return {
    newTermMonths: Math.max(1, n),
    totalInterestPaid: result.totalInterest,
    savedInterest: Math.max(0, savedInterest),
  };
}

/**
 * Escenario C: Invertir el capital.
 * Retorno compuesto mensual durante el plazo de la hipoteca.
 */
function scenarioCInvest(
  savings: number,
  annualReturnPercent: number,
  termMonths: number
) {
  if (savings <= 0 || termMonths <= 0) return { totalReturn: 0, netVsAmortize: 0 };
  const monthlyRate = new Decimal(annualReturnPercent).div(100).div(12);
  const futureValue = new Decimal(savings).mul(
    new Decimal(1).add(monthlyRate).pow(termMonths)
  );
  const totalReturn = futureValue.minus(savings).toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
  return { totalReturn, netVsAmortize: totalReturn };
}

/**
 * Compara los tres escenarios: A (reducir cuota), B (reducir plazo), C (invertir).
 * Devuelve la recomendación matemáticamente óptima.
 */
export function calculateSavingsScenario(input: SavingsScenarioInput): ScenarioComparison {
  const {
    debt,
    annualRate,
    termMonths,
    savings,
    investmentReturnRate = 3.5,
  } = input;

  const scenarioA = scenarioAReducePayment(debt, annualRate, termMonths, savings);
  const scenarioB = scenarioBReduceTerm(debt, annualRate, termMonths, savings);
  const scenarioC = scenarioCInvest(savings, investmentReturnRate, termMonths);

  // Recomendación: comparar ahorro de intereses vs retorno de inversión
  const originalResult = getAmortizationTable(debt, annualRate, termMonths);
  const interestSavedByB = new Decimal(originalResult.totalInterest).minus(scenarioB.totalInterestPaid).toNumber();
  const interestSavedByA = new Decimal(originalResult.totalInterest).minus(scenarioA.totalInterestPaid).toNumber();

  // Si invertir da más que el ahorro de intereses de B, recomendar invertir
  if (scenarioC.totalReturn > interestSavedByB && investmentReturnRate > annualRate) {
    return {
      scenarioA,
      scenarioB,
      scenarioC,
      recommendation: "invest",
    };
  }
  // Si reducir plazo ahorra más que reducir cuota, recomendar B
  if (interestSavedByB >= interestSavedByA && savings > 0) {
    return {
      scenarioA,
      scenarioB,
      scenarioC,
      recommendation: "reduce_term",
    };
  }
  return {
    scenarioA,
    scenarioB,
    scenarioC,
    recommendation: "reduce_payment",
  };
}

/**
 * Calcula el interés compuesto generado por invertir una cuota mensual durante N meses.
 * Simula aportaciones mensuales con capitalización mensual.
 */
function calculateCompoundInterestFromMonthlyPayments(
  monthlyPayment: number,
  months: number,
  annualReturnPercent: number
): number {
  if (monthlyPayment <= 0 || months <= 0) return 0;
  
  const monthlyRate = new Decimal(annualReturnPercent).div(100).div(12);
  const PMT = new Decimal(monthlyPayment);
  let totalValue = new Decimal(0);

  // Valor futuro de una anualidad: FV = PMT * [((1+r)^n - 1) / r]
  // Para cada mes, la cuota se capitaliza durante los meses restantes
  for (let month = 1; month <= months; month++) {
    const monthsRemaining = months - month + 1;
    const futureValue = PMT.mul(
      new Decimal(1).add(monthlyRate).pow(monthsRemaining)
    );
    totalValue = totalValue.add(futureValue);
  }

  const totalInvested = PMT.mul(months);
  const interestEarned = totalValue.minus(totalInvested);
  return interestEarned.toDecimalPlaces(2, Decimal.ROUND_HALF_UP).toNumber();
}

/**
 * Comparación estratégica: escenario base, amortizar con lump sum o invertir ese capital.
 * Devuelve totales y la diferencia neta para destacar la opción ganadora.
 * 
 * REGLA DEL GANADOR: Basada únicamente en comparación de porcentajes.
 * - Si investmentRate > annualRate -> Gana INVERTIR
 * - Si annualRate >= investmentRate -> Gana AMORTIZAR
 * 
 * DIFERENCIA NETA: Compara beneficios al final del plazo original de la hipoteca.
 * - Beneficio Invertir: Intereses generados durante todo el plazo original
 * - Beneficio Amortizar: Intereses ahorrados + Intereses compuestos de cuotas liberadas
 */
export function getStrategicComparison(input: StrategicComparisonInput): StrategicComparisonResult {
  const {
    debt,
    annualRate,
    termMonths,
    lumpSumPayment,
    investmentRate,
    amortizationType,
  } = input;

  const base = getAmortizationTable(debt, annualRate, termMonths);

  // REGLA 1: Determinar ganador basado SOLO en porcentajes
  const winner: "amortize" | "invest" = investmentRate > annualRate ? "invest" : "amortize";

  if (lumpSumPayment <= 0) {
    const investZero = scenarioCInvest(0, investmentRate, termMonths);
    return {
      base: { monthlyPayment: base.monthlyPayment, totalInterest: base.totalInterest },
      amortize: {
        totalInterestPaid: base.totalInterest,
        interestSaved: 0,
        newMonthlyPayment: base.monthlyPayment,
        newTermMonths: termMonths,
      },
      invest: { totalReturn: investZero.totalReturn },
      netDifference: 0,
      winner,
    };
  }

  const scenarioA = scenarioAReducePayment(debt, annualRate, termMonths, lumpSumPayment);
  const scenarioB = scenarioBReduceTerm(debt, annualRate, termMonths, lumpSumPayment);
  
  // Beneficio de Invertir: Intereses generados durante TODO el plazo original
  const invest = scenarioCInvest(lumpSumPayment, investmentRate, termMonths);
  const benefitInvest = invest.totalReturn;

  // Beneficio de Amortizar: Depende del tipo
  let benefitAmortize: number;
  let amortizeResult;

  if (amortizationType === "reduce_payment") {
    // Reducir cuota: No hay meses ahorrados, solo intereses ahorrados
    const interestSaved = new Decimal(base.totalInterest).minus(scenarioA.totalInterestPaid).toNumber();
    benefitAmortize = interestSaved;
    amortizeResult = {
      totalInterestPaid: scenarioA.totalInterestPaid,
      interestSaved,
      newMonthlyPayment: scenarioA.newMonthlyPayment,
      newTermMonths: termMonths,
    };
  } else {
    // Reducir plazo: Intereses ahorrados + Intereses compuestos de cuotas liberadas
    const interestSaved = scenarioB.savedInterest;
    const monthsSaved = termMonths - scenarioB.newTermMonths;
    
    // Calcular intereses compuestos de las cuotas liberadas durante los meses ahorrados
    const compoundFromPayments = calculateCompoundInterestFromMonthlyPayments(
      base.monthlyPayment,
      monthsSaved,
      investmentRate
    );
    
    benefitAmortize = interestSaved + compoundFromPayments;
    amortizeResult = {
      totalInterestPaid: scenarioB.totalInterestPaid,
      interestSaved,
      newMonthlyPayment: base.monthlyPayment,
      newTermMonths: scenarioB.newTermMonths,
    };
  }

  // Diferencia neta: Beneficio Invertir - Beneficio Amortizar
  const netDifference = new Decimal(benefitInvest)
    .minus(benefitAmortize)
    .toDecimalPlaces(2, Decimal.ROUND_HALF_UP)
    .toNumber();

  return {
    base: { monthlyPayment: base.monthlyPayment, totalInterest: base.totalInterest },
    amortize: amortizeResult,
    invest: { totalReturn: invest.totalReturn },
    netDifference,
    winner,
  };
}

/** Genera el schedule anual para la curva estándar (saldoBanco) y la acelerada (saldoEstrategia). */
export function getMortgageChartData(
  debt: number,
  annualRate: number,
  termMonths: number,
  lumpSumPayment: number,
  amortizationType: "reduce_payment" | "reduce_term"
): { year: number; saldoBanco: number; saldoEstrategia: number }[] {
  const base = getAmortizationTable(debt, annualRate, termMonths);
  const scheduleBase: { year: number; saldoBanco: number; saldoEstrategia: number }[] = [];

  for (let i = 0; i < base.table.length; i++) {
    const row = base.table[i];
    if (row.month % 12 === 0 || row.month === base.table.length) {
      scheduleBase.push({
        year: Math.round(row.month / 12),
        saldoBanco: row.balance,
        saldoEstrategia: row.balance,
      });
    }
  }

  if (lumpSumPayment <= 0) {
    return scheduleBase;
  }

  const newPrincipal = Math.max(0, debt - lumpSumPayment);
  if (newPrincipal <= 0) return scheduleBase;

  let amortStrategy: AmortizationResult;
  if (amortizationType === "reduce_payment") {
    amortStrategy = getAmortizationTable(newPrincipal, annualRate, termMonths);
  } else {
    const comparison = getStrategicComparison({
      debt,
      annualRate,
      termMonths,
      lumpSumPayment,
      investmentRate: 0,
      amortizationType: "reduce_term",
    });
    const newTerm = comparison.amortize.newTermMonths ?? termMonths;
    amortStrategy = getAmortizationTable(newPrincipal, annualRate, newTerm);
  }

  const strategyByYear = new Map<number, number>();
  for (let i = 0; i < amortStrategy.table.length; i++) {
    const row = amortStrategy.table[i];
    if (row.month % 12 === 0 || row.month === amortStrategy.table.length) {
      strategyByYear.set(Math.round(row.month / 12), row.balance);
    }
  }

  const maxStrategyYear = strategyByYear.size > 0 ? Math.max(...Array.from(strategyByYear.keys())) : 0;
  return scheduleBase.map((row) => ({
    ...row,
    saldoEstrategia: row.year <= maxStrategyYear ? (strategyByYear.get(row.year) ?? 0) : 0,
  }));
}
