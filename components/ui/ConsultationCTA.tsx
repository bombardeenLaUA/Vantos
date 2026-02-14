import { ShieldCheck } from "lucide-react";

export default function ConsultationCTA() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-8 rounded-2xl border border-vantos-gold/30 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <ShieldCheck className="w-12 h-12 text-vantos-gold mb-4" />
      <h2 className="font-serif text-2xl text-white mb-2">
        ¿Necesitas una estrategia a medida?
      </h2>
      <p className="text-slate-400 mb-6 max-w-lg">
        Los simuladores son el primer paso. Si quieres optimizar tu patrimonio con un experto, revisamos tu caso gratis.
      </p>
      <a
        href="mailto:info@vantoshq.com"
        className="bg-vantos-gold text-vantos-dark font-bold px-8 py-3 rounded-full hover:bg-white transition-colors w-full sm:w-auto text-center block sm:inline-block"
      >
        Solicitar consulta gratuita
      </a>
    </div>
  );
}
