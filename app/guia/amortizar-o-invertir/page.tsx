import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Amortizar Hipoteca o Invertir: Guía y Coste de Oportunidad | VantosHQ",
  description:
    "Descubre matemáticamente si te conviene más adelantar capital de tu hipoteca o invertir tus ahorros. Análisis del sistema francés y coste de oportunidad.",
};

export default function AmortizarOInvertirPage() {
  return (
    <div className="bg-vantos-dark pt-24 pb-24 px-4 sm:px-6">
      <article className="max-w-4xl mx-auto">
        <header className="mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white mb-6 leading-tight">
            ¿Amortizar Hipoteca o Invertir? La Guía Matemática Definitiva (2026)
          </h1>
          <p className="text-slate-300 text-lg leading-relaxed">
            El eterno dilema financiero. Tienes unos ahorros extra y te haces la gran pregunta: &apos;¿Me quito años de
            hipoteca para dormir tranquilo o lo meto en bolsa/cuentas remuneradas para sacar rentabilidad?&apos; Los
            bancos suelen darte una visión sesgada, enfocada solo en la deuda. Aquí vamos a analizarlo con pura
            matemática financiera, sin trampas.
          </p>
        </header>

        <section className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl text-white font-semibold">
            1. El engaño visual del Sistema de Amortización Francés
          </h2>
          <p className="text-slate-300 leading-relaxed">
            En España, casi todas las hipotecas usan el Sistema Francés. Esto significa que la cuota es constante,
            pero la composición cambia: los primeros años pagas muchísimos intereses y amortizas muy poco capital.
          </p>
          <div className="bg-white/5 border border-white/10 rounded-xl p-6">
            <p className="text-slate-200 leading-relaxed">
              <span className="font-semibold text-vantos-gold">Regla clave:</span> Adelantar capital (amortizar) en los
              primeros 5-10 años de la hipoteca tiene un impacto brutal en el ahorro de intereses. Hacerlo en los
              últimos 5 años apenas tiene efecto financiero, porque la deuda ya está casi pagada.
            </p>
          </div>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl text-white font-semibold">
            2. El Coste de Oportunidad: Lo que el banco no te cuenta
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Cuando decides darle 10.000€ al banco para reducir tu deuda, estás &apos;comprando&apos; un ahorro equivalente
            al interés de tu hipoteca (TIN). Pero, ¿qué pasa con el dinero que dejas de ganar? Eso es el coste de
            oportunidad. Si en vez de dárselo al banco, inviertes esos 10.000€ aplicando el interés compuesto durante 20
            años, la curva exponencial generada suele destrozar al ahorro de la hipoteca.
          </p>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl text-white font-semibold">
            3. La Regla de Oro (TIN vs Rentabilidad Esperada)
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Olvídate de emociones, la matemática es binaria. Solo tienes que enfrentar dos porcentajes:
          </p>
          <ul className="space-y-3 text-slate-300 leading-relaxed list-none">
            <li className="flex gap-2">
              <span className="text-vantos-gold font-medium shrink-0">Gana Amortizar si:</span>
              <span>
                El interés de tu hipoteca (TIN) es mayor que la rentabilidad neta y segura que puedes conseguir en el
                mercado. (Ej: Tienes una hipoteca variable al 4.5% y la cuenta remunerada más segura te da un 3%).
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-vantos-gold font-medium shrink-0">Gana Invertir si:</span>
              <span>
                Tu hipoteca es barata (ej: fija al 1.5%) y puedes invertir tu dinero a un 3.5% o superior. Tu dinero
                trabaja más rápido que tu deuda.
              </span>
            </li>
          </ul>
        </section>

        <section className="space-y-6 mb-12">
          <h2 className="font-serif text-2xl text-white font-semibold">
            4. El &quot;Truco&quot; Maestro: Reinvertir el Flujo de Caja
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Muchos calculan mal al comparar porque olvidan un detalle vital. Si amortizas y te quitas 5 años de
            hipoteca, ¿qué harás con esos 800€/mes que ya no le pagas al banco durante esos 5 años? Si ese flujo de caja
            liberado lo inviertes sistemáticamente, el beneficio real de amortizar se dispara. Por eso necesitas un
            simulador avanzado que calcule ambas líneas temporales hasta el final.
          </p>
        </section>

        <section className="space-y-6 mb-12">
          <h3 className="font-serif text-xl text-white font-semibold">Pasa de la teoría a la práctica</h3>
          <p className="text-slate-300 leading-relaxed">
            No te fíes de los artículos genéricos, fíjate en tus números. Hemos programado una calculadora privada que
            hace todo este cálculo pesado (incluyendo la reinversión de cuotas) en milisegundos y directamente en tu
            navegador.
          </p>
          <div className="pt-4">
            <Link
              href="/herramientas/hipoteca"
              className="inline-flex items-center justify-center rounded-xl bg-white/5 border border-white/20 px-6 py-4 text-sm font-medium text-white hover:bg-vantos-gold hover:text-vantos-dark hover:border-vantos-gold transition-all duration-300"
            >
              Abrir el Simulador de Estrategia Hipotecaria
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
