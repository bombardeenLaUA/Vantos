# Plan de Implementación (MVP)

### Fase 1: Cimientos (Día 1)
1.  Inicializar proyecto Next.js 14 + TS + Tailwind.
2.  Instalar Shadcn UI (`button`, `input`, `card`, `slider`, `tabs`).
3.  Instalar dependencias: `decimal.js`, `zod`, `recharts`, `lucide-react`.

### Fase 2: El Núcleo Matemático (Critical Path)
1.  Crear `lib/finance.ts`.
2.  Implementar función `calculateMortgage(principal, rate, years)`.
3.  Implementar función `calculateAmortizationScenario(currentMortgage, extraPayment, strategy)`.
4.  **TEST:** Crear `lib/finance.test.ts` y verificar cálculos contra una calculadora bancaria real.

### Fase 3: Interfaz de Usuario
1.  Crear componente `MortgageForm.tsx` con validación Zod.
2.  Crear componente `ResultsDisplay.tsx` para mostrar los KPI.
3.  Implementar sincronización con URL (`useSearchParams`).

### Fase 4: Visualización y Monetización
1.  Integrar `Recharts` para mostrar la reducción de intereses visualmente.
2.  Desarrollar `AffiliateRecommendation.tsx` con lógica condicional (Si rentabilidad > interés -> mostrar).

### Fase 5: Pulido y SEO
1.  Metadatos dinámicos.
2.  Ajustes de accesibilidad y contrastes.