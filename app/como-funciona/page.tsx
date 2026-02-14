import Link from "next/link";

const faqs = [
  {
    question: "¿Cómo se calculan los intereses?",
    answer:
      "Utilizamos el sistema de amortización francés estándar, el más común en España. La cuota mensual se mantiene constante y en las primeras cuotas predomina el pago de intereses, mientras que al final predomina el capital.",
  },
  {
    question: "¿Es mejor reducir cuota o plazo?",
    answer:
      "Matemáticamente, reducir plazo ahorra más intereses porque liquidas la deuda antes. Reducir cuota da mayor seguridad mensual al bajar tu compromiso, pero pagarás más intereses a largo plazo. La mejor opción depende de tu prioridad: ahorro máximo o liquidez.",
  },
  {
    question: "¿Guardan mis datos?",
    answer:
      "No. Todo ocurre en tu navegador. No enviamos ni almacenamos tus números en ningún servidor. Privacidad total.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-12 text-center">
          Guía de Estrategia Financiera
        </h1>

        {/* Sección 1: El Método */}
        <section className="mb-12">
          <h2 className="font-serif text-2xl text-vantos-gold mb-4">El Método Vantos</h2>
          <p className="text-slate-300 leading-relaxed">
            Vantos compara el coste de oportunidad entre dos caminos: amortizar tu hipoteca o invertir ese capital. 
            Si tu hipoteca tiene un interés más alto que la rentabilidad que podrías obtener invirtiendo, suele compensar amortizar. 
            Si la rentabilidad de mercado supera tu tipo de interés hipotecario, puede ser más rentable invertir. 
            Nuestras herramientas te dan los números claros para que decidas con criterio.
          </p>
        </section>

        {/* Sección 2: FAQ (acordeón con details/summary) */}
        <section>
          <h2 className="font-serif text-2xl text-vantos-gold mb-6">Preguntas Frecuentes</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-4 text-left font-medium text-slate-100 hover:bg-white/5 transition-colors [&::-webkit-details-marker]:hidden">
                  <span>{faq.question}</span>
                  <svg
                    className="h-5 w-5 shrink-0 text-vantos-gold transition-transform group-open:rotate-180"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-4 pt-0 text-slate-300 leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-12 text-center">
          <Link
            href="/herramientas/hipoteca"
            className="inline-block border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
          >
            Ir a Herramientas
          </Link>
        </div>
      </div>
    </div>
  );
}
