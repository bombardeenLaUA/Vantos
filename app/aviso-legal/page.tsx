import Link from "next/link";

export default function AvisoLegalPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-white mb-10">Aviso Legal</h1>

        <div className="text-slate-300 leading-relaxed space-y-8">
          <section>
            <h2 className="font-serif text-xl text-white mb-3">Propiedad</h2>
            <p>
              VantosHQ es un proyecto educativo. Este sitio web y sus herramientas son de titularidad de VantosHQ, proyecto orientado a la divulgación y educación financiera.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Uso de la Herramienta</h2>
            <p>
              Las simulaciones mostradas en este sitio son estimaciones matemáticas basadas exclusivamente en los datos introducidos por el usuario. No constituyen una oferta vinculante ni asesoramiento financiero regulado. Los resultados tienen carácter meramente orientativo e informativo.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Propiedad Intelectual</h2>
            <p>
              El diseño gráfico, la estructura, los contenidos, el código fuente y cuantos elementos conforman este sitio web son titularidad de VantosHQ. Queda prohibida su reproducción, distribución o utilización sin autorización expresa.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Exención de Responsabilidad</h2>
            <p>
              VantosHQ no se hace responsable de las decisiones financieras adoptadas por los usuarios en base a los cálculos realizados por estas herramientas. Recomendamos encarecidamente consultar con un asesor financiero certificado antes de firmar productos bancarios o tomar decisiones que afecten a su patrimonio.
            </p>
          </section>
        </div>

        <Link
          href="/"
          className="mt-12 inline-block border border-white/20 text-white px-6 py-3 rounded-xl font-bold hover:bg-white/5 transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
