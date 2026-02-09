/**
 * lib/finance.test.ts
 * Tests unitarios para la lógica de amortización francesa.
 * Caso de referencia: 100.000€ al 3.5% a 20 años ≈ 579.96€/mes
 */

import { describe, test, expect } from "vitest";
import Decimal from "decimal.js";
import { calculateMonthlyPayment, getAmortizationTable, calculateSavingsScenario } from "./finance";

describe("Amortización Francesa", () => {
  test("100.000€ al 3.5% a 20 años da una cuota mensual de ~579.96€", () => {
    const principal = 100_000;
    const annualRate = 3.5;
    const termYears = 20;
    const termMonths = termYears * 12;

    const monthlyPayment = calculateMonthlyPayment(principal, annualRate, termMonths);

    // Comparación con Decimal para precisión (tolerancia 0.10€)
    const expected = new Decimal(579.96);
    const actual = new Decimal(monthlyPayment);
    const tolerance = new Decimal(0.1);
    expect(actual.minus(expected).abs().lessThanOrEqualTo(tolerance)).toBe(true);
  });

  test("la tabla de amortización devuelve 240 filas para 20 años", () => {
    const result = getAmortizationTable(100_000, 3.5, 20 * 12);
    expect(result.table).toHaveLength(240);
    expect(result.monthlyPayment).toBeCloseTo(579.96, 1);
  });

  test("el balance final de la tabla es 0", () => {
    const result = getAmortizationTable(100_000, 3.5, 20 * 12);
    const lastRow = result.table[result.table.length - 1];
    expect(lastRow.balance).toBe(0);
  });

  test("calculateSavingsScenario devuelve estructura correcta", () => {
    const result = calculateSavingsScenario({
      debt: 150_000,
      annualRate: 3.5,
      termMonths: 20 * 12,
      savings: 10_000,
      investmentReturnRate: 4,
    });
    expect(result.scenarioA.newMonthlyPayment).toBeGreaterThan(0);
    expect(result.scenarioB.newTermMonths).toBeLessThanOrEqual(240);
    expect(["reduce_payment", "reduce_term", "invest"]).toContain(result.recommendation);
  });
});
