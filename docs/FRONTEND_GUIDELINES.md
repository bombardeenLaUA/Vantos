## Vantos Frontend Guidelines

Guías de implementación frontend para mantener una experiencia consistente en Next.js 14 con el Design System "Vantos Elite".

---

### 1. Stack y Arquitectura

- **Framework**: Next.js 14 (App Router).
  - Usar Server Components por defecto.
  - Marcar explícitamente los Client Components con `'use client'` solo cuando haya:
    - Estado local.
    - Efectos (hooks de navegador).
    - Interactividad (formularios, sliders, gráficos).
- **Lenguaje**: TypeScript, sin `any`.
- **Estilos**: Tailwind CSS + tokens definidos en `DESIGN_SYSTEM.md`.
- **UI Library**: Shadcn UI (components en `@/components/ui/*`).
- **Formularios**: `react-hook-form` + `zod`.
- **Gráficos**: `recharts`.
- **Iconos**: `lucide-react`.

---

### 2. Organización de Carpetas

- `app/`
  - Rutas y layouts. Mínima lógica de presentación.
  - Cada página debe ser muy delgada: orquesta componentes, no lógica de negocio.
- `components/`
  - Componentes de dominio como `MortgageCalculator`, `AffiliateCard`, etc.
  - Componentes reusables de bajo nivel viven en `components/ui/`.
- `lib/`
  - Lógica pura (ej: `finance.ts`), sin dependencias de React ni del navegador.
- `docs/`
  - Documentación viva: PRD, APP_FLOW, DESIGN_SYSTEM, FRONTEND_GUIDELINES.

---

### 3. Layout & Responsividad

- Usar el contenedor principal:
  - `container mx-auto max-w-6xl px-4 py-10 lg:py-14`.
- Layout de 2 columnas tipo dashboard:
  - `md:grid-cols-[minmax(0,1.15fr)_minmax(0,1.85fr)]` para simulador principal.
  - Inputs a la izquierda, resultados/gráficos a la derecha.
- Mobile first:
  - En `sm:` y por debajo, las columnas se apilan.
  - Mantener espacios generosos: `space-y-6` o superior entre bloques.

---

### 4. Tipografía & Jerarquía

- Tipografía heredada del layout (`Geist Sans` / `Inter`).
- Usar tamaños coherentes:
  - Título de página: `text-3xl sm:text-4xl lg:text-5xl font-semibold`.
  - Títulos de sección: `text-xl`–`text-2xl font-semibold`.
  - Descripciones: `text-sm text-slate-500`.
  - Meta / ayudas: `text-xs text-slate-400`.
- Evitar usar más de 3 tamaños en una misma vista.
- Usar `uppercase tracking-wide text-xs` solo para labels / chips.

---

### 5. Color & Tematización

- Fondo global de app: `bg-slate-50`.
- Cards:
  - `bg-white border border-slate-100 shadow-sm` (por defecto).
  - `shadow-xl` solo para tarjetas realmente protagonistas.
- CTAs:
  - Botón primario: `bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl`.
- Estados financieros:
  - Ahorro / positivo: `text-emerald-600`, `bg-emerald-50`.
  - Coste / intereses: `text-rose-600`, `bg-rose-50`.
- Afiliación:
  - `bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200`.

---

### 6. Formularios & Validación

- Todos los formularios deben:
  - Usar `react-hook-form` + `zodResolver`.
  - Tener mensajes de error claros con `FormMessage`.
  - Usar `Form`, `FormField`, `FormItem`, `FormLabel`, `FormControl`, `FormDescription`.
- Convenciones:
  - Inputs numéricos con `inputMode="decimal"` o `numeric` según el caso.
  - Sliders sincronizados bidireccionalmente con el valor del formulario.
  - Mensajes de ayuda cortos, explicando el impacto financiero del campo.

---

### 7. Componentes de Dominio (Vantos)

- `MortgageCalculator`:
  - Es el núcleo visual. Debe:
    - Mantener layout en 2 columnas.
    - Mostrar siempre KPIs claros (cuota, intereses, etc.).
    - No mezclar lógica de negocio: delegar a `lib/finance.ts`.
- `AffiliateCard`:
  - Debe sentirse nativa, no como un banner externo.
  - Usar el estilo "Oportunidad dorada" definido en el Design System.

---

### 8. Accesibilidad & Microdetalles

- Botones y elementos interactivos:
  - `cursor-pointer`, `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/40`.
- Contraste suficiente para texto secundario y labels.
- No abusar de animaciones; si se usan, que sean suaves y con intención (ej. hover en botones, aparición suave de resultados).

---

### 9. Revisión de Diseño

- Antes de mergear cambios visuales:
  - Revisar contra `DESIGN_SYSTEM.md` (colores, espaciado, tipografía).
  - Revisar contra `FRONTEND_GUIDELINES.md` (layout, estructura, patrones).
  - Preguntarse: ¿un usuario entiende la pantalla en menos de 2 segundos?

# Guías de Frontend y UI/UX

### Filosofía de Diseño: "Confianza Financiera"
* **Estética:** Limpia, "Business", mucho espacio en blanco (whitespace). Evitar desorden.
* **Tipografía:** `Inter` o `Geist Sans`. Legibilidad máxima en números.

### Paleta de Colores (Semántica)
* **Neutral:** Slate/Gray para textos (Shadcn default).
* **Acción:** Indigo/Blue para botones primarios.
* **Positivo (Ahorro/Ganancia):** Emerald Green (`text-emerald-600`, `bg-emerald-50`).
* **Negativo (Deuda/Interés):** Rose Red (`text-rose-600`).
* **Premium (Afiliación):** Amber/Gold sutil (para bordes de tarjetas recomendadas).

### Componentes Críticos
1.  **Affiliate Card:**
    * Debe parecer una recomendación nativa, no un banner publicitario intrusivo.
    * Uso de `Badge` "Recomendado" o "Mejor Opción".
    * Borde sutil `border-amber-400`.
2.  **Result Cards:**
    * Diseño tipo "Dashboard". Números grandes. Comparativa clara "Antes vs Ahora".

### Responsividad
* **Mobile-First:** Todos los gráficos y tablas deben ser legibles en pantallas de 375px.
* En móvil, los gráficos complejos se simplifican o se apilan verticalmente.