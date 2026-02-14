import Link from "next/link";

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-vantos-dark pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="font-serif text-4xl text-white mb-10">Política de Privacidad</h1>

        <div className="text-slate-300 leading-relaxed space-y-8">
          <section>
            <h2 className="font-serif text-xl text-white mb-3">Privacidad Local</h2>
            <p>
              Vantos está comprometido con la privacidad de sus usuarios. Esta política describe cómo tratamos la información en nuestro sitio web.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Sin Base de Datos</h2>
            <p>
              Vantos <strong className="text-white">no almacena</strong> los datos financieros que introduces (sueldo, deuda pendiente, ahorros, hipoteca u otros parámetros) en ningún servidor. Todo el cálculo se realiza íntegramente en el navegador del usuario (procesamiento Client-Side). Tus números nunca abandonan tu dispositivo.
            </p>
            <p>
              Las simulaciones y proyecciones se generan localmente en tu ordenador o móvil. No existe registro ni copia de tus datos financieros personales en nuestros sistemas.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Cookies</h2>
            <p>
              Utilizamos únicamente cookies técnicas necesarias para el correcto funcionamiento del sitio y cookies de análisis anónimo (Google Analytics) para mejorar la experiencia de uso. Estas cookies no identifican personalmente al usuario ni recopilan datos sensibles. Puedes configurar tu navegador para limitar o bloquear el uso de cookies.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl text-white mb-3">Contacto</h2>
            <p>
              Para ejercer tus derechos de rectificación, acceso o cualquier duda relacionada con el tratamiento de datos, puedes contactarnos en{" "}
              <a
                href="mailto:info@vantoshq.com"
                className="text-vantos-gold hover:underline"
              >
                info@vantoshq.com
              </a>
              .
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
