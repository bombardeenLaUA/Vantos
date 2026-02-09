## Vantos Elite Design System

Sistema visual base para todas las experiencias de Vantos. Prioriza claridad financiera, calma visual y sensación de producto bancario premium.

---

### 1. Identidad & Principios

- **Personalidad**: Fintech de alta confianza, precisa, sin ruido. Nada parece improvisado.
- **Tono visual**: Silencioso, seguro, metódico. Los números son protagonistas.
- **Regla de oro**: Si un elemento no ayuda a tomar una decisión financiera mejor, se elimina.

---

### 2. Tipografía

- **Familia principal**: `Geist Sans` (fallback: `Inter`, `system-ui`).
- **Escala tipográfica (desktop)**:
  - Display: `text-5xl` / `font-semibold` — usos muy puntuales (hero principal).
  - H1: `text-4xl` / `font-semibold`.
  - H2: `text-3xl` / `font-semibold`.
  - H3: `text-2xl` / `font-semibold`.
  - H4: `text-xl` / `font-semibold`.
  - Body base: `text-sm` / `leading-relaxed`.
  - Meta / Ayuda: `text-xs` / `leading-snug`.
- **Pesos permitidos**:
  - 400 (normal) — texto de lectura.
  - 500 (medium) — labels y elementos interactivos.
  - 600 (semibold) — títulos y cifras clave.
- **Reglas**:
  - Máximo 3 tamaños distintos de texto por vista principal.
  - Evitar mayúsculas salvo en chips/labels (`text-xs uppercase tracking-wide`).

---

### 3. Paleta de Color

#### 3.1 Neutrales (Slate)

Base para fondos, bordes y tipografía.

- Background global: `bg-slate-50`.
- Cards: `bg-white` con `border-slate-100`.
- Texto:
  - Primario: `text-slate-900`.
  - Secundario: `text-slate-500`.
  - Terciario / meta: `text-slate-400`.
- Bordes: `border-slate-100` / `border-slate-200`.

#### 3.2 Emerald Financial (Ahorro / Éxito)

Para indicar ahorro, rentabilidad o estados positivos.

- Primario: `emerald-600`.
- Hover / énfasis: `emerald-700`.
- Fondos suaves:
  - `bg-emerald-50`, `bg-emerald-100`.
- Texto:
  - `text-emerald-600`, `text-emerald-700`.

#### 3.3 Indigo Action (Acción principal)

Para CTAs y elementos interactivos clave.

- Botón primario: `bg-indigo-600 hover:bg-indigo-700`.
- Bordes / líneas activas: `border-indigo-200`.
- Gradientes: `from-emerald-600 to-indigo-600`.

#### 3.4 Estado de riesgo / coste

- Intereses / coste: `text-rose-600`, `bg-rose-50` para resaltar “dinero perdido”.

#### 3.5 Dorado Premium (Afiliación)

- Fondos: `bg-gradient-to-r from-amber-50 to-yellow-50`.
- Bordes: `border-amber-200`.
- Texto: `text-amber-800`, `text-amber-900`.

---

### 4. Espaciado & Layout

Sistema de espaciado basado en múltiplos de 4.

- **Tokens de espaciado**:
  - `space-1` → 4px.
  - `space-2` → 8px.
  - `space-3` → 12px.
  - `space-4` → 16px.
  - `space-5` → 20px.
  - `space-6` → 24px.
  - `space-8` → 32px.
  - `space-10` → 40px.
  - `space-12` → 48px.
- **Reglas**:
  - Separación entre secciones principales: mínimo `space-8`.
  - Separación entre elementos relacionados: `space-3` o `space-4`.
  - Nunca mezclar unidades arbitrarias (ej. 13px, 22px). Mantener el grid de 4px.

#### 4.1 Grid

- **Desktop**:
  - Contenedor máximo: `max-w-6xl` (o 7xl en vistas muy amplias).
  - Layout principal en 2 columnas:
    - Columna izquierda (inputs): ~1/3 (`md:grid-cols-[1.15fr_1.85fr]` o similar).
    - Columna derecha (resultados / gráficos): ~2/3.
- **Mobile**:
  - Columnas apiladas.
  - Padding lateral: mínimo `px-4`.
  - Espaciado vertical entre bloques: `space-6` o superior.

---

### 5. Componentes Base (Tokens de estilo)

#### 5.1 Cards

- Fondo: `bg-white`.
- Borde: `border border-slate-100`.
- Sombra:
  - Default: `shadow-sm`.
  - Principal (sección clave): `shadow-xl shadow-slate-900/5`.
- Radio:
  - General: `rounded-2xl`.
  - Subcards internas: `rounded-xl`.

#### 5.2 Botones

- Primario:
  - Fondo: `bg-indigo-600 hover:bg-indigo-700`.
  - Texto: `text-white`.
  - Radio: `rounded-xl`.
  - Tamaño: `h-10 text-sm font-semibold`.
- Secundario:
  - Fondo: `bg-white`.
  - Borde: `border-slate-200`.
  - Texto: `text-slate-700`.

#### 5.3 Inputs & Sliders

- Inputs:
  - Altura: `h-9` o `h-10`.
  - Borde: `border-slate-200 focus-visible:ring-indigo-500/30`.
  - Radio: `rounded-lg`.
- Sliders:
  - Pista: tonos `slate-200`.
  - Rango activo: `bg-indigo-500`.
  - Pulgar: círculo sutil, `border-slate-100`, sombra ligera.

---

### 6. Iconografía

- Librería: `lucide-react`.
- Tamaños:
  - En títulos de sección: `h-4 w-4`.
  - En hero / elementos destacados: hasta `h-6 w-6`.
- Color:
  - Financiero / ahorro: `text-emerald-600`.
  - Acción / navegación: `text-indigo-600`.
  - Afiliación premium: `text-amber-700`.

---

### 7. Estados & Feedback

- Errores:
  - Texto: `text-red-600`.
  - Mensajes: `text-xs`, concisos, debajo del campo.
- Vacíos / placeholders:
  - Usar texto `text-slate-400` explicando claramente qué ocurrirá.
- Loading (futuro):
  - Skeletons con `bg-slate-100` / `bg-slate-200`, sin animaciones agresivas.

---

### 8. Movimiento (Futuro)

- Transiciones:
  - Duración base: 150–200ms.
  - Curva: `ease-out` suave.
- Reglas:
  - Nunca animar texto grande de forma distractora.
  - Animaciones al servicio de la comprensión (ej. aparición suave de KPIs tras cálculo).

