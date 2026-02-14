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
  {
    question: "¿Qué pasa con la inflación?",
    answer:
      "La inflación devalúa tu deuda, pero también tus ahorros. Nuestros modelos te ayudan a visualizar el crecimiento bruto.",
  },
  {
    question: "¿Tengo que pagar impuestos por invertir?",
    answer:
      "Sí, la rentabilidad financiera tributa en la base del ahorro. Tenlo en cuenta al comparar con la amortización, que es un ahorro neto.",
  },
];

const pilares = [
  {
    titulo: "Coste de Oportunidad",
    texto: "¿Pagar deuda al 3% o ganar un 7% invirtiendo? Te enseñamos a calcular la diferencia real en euros.",
  },
  {
    titulo: "Interés Compuesto",
    texto: "La octava maravilla del mundo. Visualiza cómo el tiempo multiplica tus ahorros exponencialmente.",
  },
  {
    titulo: "Amortización Inteligente",
    texto: "No todas las amortizaciones son iguales. Descubre cuándo reducir plazo y cuándo reducir cuota.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl lg:text-5xl text-white mb-6 text-center">
          Domina la Matemática de tu Patrimonio
        </h1>
        <p className="text-slate-400 text-lg text-center leading-relaxed mb-16 max-w-2xl mx-auto">
          La banca tradicional juega con la opacidad. Vantos juega con la claridad. Entiende las reglas del juego antes de mover tu dinero.
        </p>

        {/* Sección 1: Los 3 Pilares */}
        <section className="mb-16">
          <div className="grid sm:grid-cols-3 gap-6">
            {pilares.map((pilar, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-6"
              >
                <h3 className="font-serif text-xl text-vantos-gold mb-3">{pilar.titulo}</h3>
                <p className="text-slate-300 leading-relaxed">{pilar.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Sección 2: FAQ */}
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
      </div>
    </div>
  );
}
