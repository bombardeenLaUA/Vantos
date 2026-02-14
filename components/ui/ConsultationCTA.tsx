import Link from "next/link";
import { BookOpen } from "lucide-react";

export default function ConsultationCTA() {
  return (
    <div className="w-full max-w-4xl mx-auto mt-12 p-8 rounded-2xl border border-vantos-gold/30 bg-gradient-to-b from-white/5 to-transparent backdrop-blur-sm">
      <BookOpen className="w-12 h-12 text-vantos-gold mb-4" />
      <h2 className="font-serif text-2xl text-white mb-2">
        ¿Dudas con los resultados?
      </h2>
      <p className="text-slate-400 mb-6 max-w-lg">
        Entiende la matemática detrás de tu estrategia y cómo maximizar tu ahorro.
      </p>
      <Link
        href="/como-funciona"
        className="inline-block bg-vantos-gold text-vantos-dark font-bold px-8 py-3 rounded-full hover:bg-white transition-colors"
      >
        Ver Guía y Preguntas Frecuentes
      </Link>
    </div>
  );
}
