# Product Requirements Document (PRD)
## Proyecto: Simulador de Estrategia Hipotecaria (MVP)

### 1. Visión General
Una herramienta financiera de alto rendimiento, *stateless* (sin base de datos) y ejecutada en el cliente, diseñada para resolver una duda crítica del usuario español: **"¿Tengo 10.000€ ahorrados, amortizo hipoteca (cuota o plazo) o lo invierto?"**.

### 2. Objetivos Principales
1.  **Claridad Matemática:** Mostrar la diferencia exacta en euros entre reducir cuota, reducir plazo o invertir el capital.
2.  **Monetización Contextual:** Si la rentabilidad de una inversión segura (ej: 4%) supera el interés de la hipoteca (ej: 3%), recomendar activamente productos de afiliación (Cuentas Remuneradas / Fondos).
3.  **Viralidad:** Permitir compartir escenarios mediante URL (State in URL).

### 3. Funcionalidades Core (MVP)
* **Inputs:**
    * Deuda Pendiente (€).
    * Tipo de Interés Actual (%).
    * Plazo Restante (Años/Meses).
    * Capital Disponible para Amortizar (€).
    * Rentabilidad Esperada de Inversión Alternativa (%) (Default: 3.5%).
* **Outputs (Comparativa):**
    * Escenario A: Amortizar reduciendo Cuota (Nuevo flujo de caja mensual).
    * Escenario B: Amortizar reduciendo Plazo (Ahorro total de intereses).
    * Escenario C: Invertir el capital (Retorno total vs Coste de oportunidad).
* **Feature "Smart Recommendation":**
    * Lógica condicional que sugiere la opción matemáticamente ganadora.
    * Integración visual de tarjeta de afiliado ("Tu dinero rinde más aquí").

### 4. Restricciones Técnicas
* **Cero Backend:** Toda la lógica de cálculo reside en el navegador.
* **Precisión:** Uso obligatorio de librería decimal para evitar errores de coma flotante.
* **SEO:** Carga instantánea (< 100ms TBT), HTML semántico.