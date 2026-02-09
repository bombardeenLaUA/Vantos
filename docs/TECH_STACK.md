# Tech Stack & Librerías

### Core
* **Framework:** Next.js 14 (App Router).
* **Lenguaje:** TypeScript (Strict Mode).
* **Estilos:** Tailwind CSS.
* **Componentes:** Shadcn UI (Radix UI bajo el capó).
* **Iconos:** Lucide React.

### Lógica Financiera & Estado
* **Matemáticas:** `decimal.js` o `big.js` (OBLIGATORIO).
    * *Prohibido:* Usar `number` nativo de JS para cálculos monetarios.
* **Validación:** `zod` + `react-hook-form`.
* **Query/State:** `nuqs` (Type-safe search params state manager) o hooks nativos de Next.js.

### Visualización
* **Gráficos:** `recharts` (Gráficos de áreas y barras simples, responsive).

### Testing
* **Unitario:** `vitest` (Para asegurar que la lógica de amortización francesa es perfecta).