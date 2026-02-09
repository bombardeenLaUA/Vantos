# Flujo de Aplicación (App Flow)

### 1. User Journey
1.  **Landing:** Usuario llega por SEO ("amortizar o invertir calculadora").
2.  **Input:** Formulario limpio y validado en tiempo real.
    * *Validación Zod:* No permite intereses negativos ni deudas = 0.
3.  **Cálculo:** Al modificar cualquier input, los resultados se recalculan instantáneamente (Reactive).
4.  **Resultados:**
    * Panel superior: Resumen ejecutivo ("Ahorras 4.500€ reduciendo plazo").
    * Gráficos: `Recharts` mostrando la curva de amortización vs crecimiento de inversión.
5.  **Conversión (Affiliate):**
    * Tarjeta debajo del resultado: "Recomendación del Algoritmo".
    * Clic en enlace externo (afiliado) -> Abre en nueva pestaña.
6.  **Share:** Usuario copia la URL para guardarla.

### 2. Gestión de Estado (URL)
El estado de la aplicación se sincroniza bidireccionalmente con los `searchParams` de la URL.
* Estructura: `/?debt=150000&rate=3.5&term=20&savings=10000`
* Esto permite compartir escenarios específicos por WhatsApp/Email sin necesidad de base de datos.